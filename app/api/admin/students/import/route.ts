import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import connectDB from '@/lib/db/connection';
import { User, Student } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';

interface CSVRow {
  Name: string;
  'Registration No.': string;
  Branch: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const batch = formData.get('batch') as string;
    const section = formData.get('section') as string;

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'CSV file is required' },
        { status: 400 }
      );
    }

    if (!batch || !section) {
      return NextResponse.json(
        { success: false, error: 'Batch and section are required' },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    // Validate file type
    if (!['csv', 'xlsx', 'xls'].includes(fileExt || '')) {
      return NextResponse.json(
        { success: false, error: 'File must be CSV, XLSX, or XLS' },
        { status: 400 }
      );
    }

    let rows: CSVRow[] = [];

    // Parse based on file type
    if (fileExt === 'csv') {
      // Parse CSV
      const fileContent = await file.text();
      const parseResult = Papa.parse<CSVRow>(fileContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });

      if (parseResult.errors.length > 0) {
        return NextResponse.json(
          { success: false, error: 'Failed to parse CSV file', details: parseResult.errors },
          { status: 400 }
        );
      }

      rows = parseResult.data;
    } else {
      // Parse Excel
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json<CSVRow>(worksheet, {
          raw: false, // Get formatted strings
          defval: '', // Default value for empty cells
        });

        rows = jsonData;
      } catch (excelError: any) {
        return NextResponse.json(
          { success: false, error: 'Failed to parse Excel file', message: excelError.message },
          { status: 400 }
        );
      }
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'CSV file is empty' },
        { status: 400 }
      );
    }

    // Validate CSV structure
    const requiredColumns = ['Name', 'Registration No.', 'Branch'];
    const firstRow = rows[0];
    const missingColumns = requiredColumns.filter(col => !(col in firstRow));

    if (missingColumns.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required columns: ${missingColumns.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Validate all rows first
    const validRows: Array<{ name: string; registrationNo: string; branch: string; email: string; rowIndex: number }> = [];
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const name = row.Name?.trim();
      const registrationNo = row['Registration No.']?.trim();
      const branch = row.Branch?.trim().toUpperCase();

      // Validate row data
      if (!name || !registrationNo || !branch) {
        results.failed++;
        results.errors.push(`Row ${i + 2}: Missing required data`);
        continue;
      }

      const firstName = name.split(' ')[0].toLowerCase();
      const email = `${firstName}.${registrationNo}@iiitranchi.ac.in`.toLowerCase();
      validRows.push({
        name,
        registrationNo: registrationNo.toUpperCase(),
        branch,
        email,
        rowIndex: i,
      });
    }

    if (validRows.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No valid rows to import',
        results,
      });
    }

    // Bulk check for existing students (single query)
    const registrationNos = validRows.map(r => r.registrationNo);
    const existingStudents = await Student.find({
      registrationNo: { $in: registrationNos }
    });
    const existingRegNos = new Set(existingStudents.map(s => s.registrationNo));

    // Bulk check for existing users (single query)
    const emails = validRows.map(r => r.email);
    const existingUsers = await User.find({
      email: { $in: emails }
    });
    const existingUserMap = new Map(existingUsers.map(u => [u.email, u]));

    // Prepare data for bulk insert
    const usersToCreate: Array<{ email: string; role: string; isVerified: boolean }> = [];
    const studentsToCreate: Array<any> = [];
    const emailToRowIndex = new Map<string, number>();

    for (const row of validRows) {
      const rowNum = row.rowIndex + 2;

      // Skip if student already exists
      if (existingRegNos.has(row.registrationNo)) {
        results.failed++;
        results.errors.push(`Row ${rowNum}: Student ${row.registrationNo} already exists`);
        continue;
      }

      const existingUser = existingUserMap.get(row.email);

      // Validate existing user's role
      if (existingUser && existingUser.role !== 'student') {
        results.failed++;
        results.errors.push(`Row ${rowNum}: Email ${row.email} already exists with role '${existingUser.role}'`);
        continue;
      }

      // Prepare user for creation if doesn't exist
      if (!existingUser) {
        usersToCreate.push({
          email: row.email,
          role: 'student',
          isVerified: false,
        });
        emailToRowIndex.set(row.email, row.rowIndex);
      }

      // Prepare student data (userId will be set after user creation)
      studentsToCreate.push({
        userId: existingUser?._id || null,
        name: row.name,
        registrationNo: row.registrationNo,
        branch: row.branch,
        batch,
        section: section.toUpperCase(),
        email: row.email,
      });
    }

    try {
      // Bulk create users (single query)
      let newUsers: any[] = [];
      if (usersToCreate.length > 0) {
        newUsers = await User.insertMany(usersToCreate, { ordered: true });
      }

      // Map new user IDs to students
      const newUserMap = new Map(newUsers.map(u => [u.email, u._id]));
      
      for (const student of studentsToCreate) {
        if (!student.userId) {
          student.userId = newUserMap.get(student.email);
        }
      }

      // Bulk create students (single query)
      if (studentsToCreate.length > 0) {
        await Student.insertMany(studentsToCreate, { ordered: false });
        results.success = studentsToCreate.length;
      }
    } catch (error: any) {
      // Handle bulk insert errors
      if (error.writeErrors) {
        for (const err of error.writeErrors) {
          results.failed++;
          results.errors.push(`Bulk insert error: ${err.errmsg}`);
        }
        results.success = studentsToCreate.length - error.writeErrors.length;
      } else {
        results.failed = studentsToCreate.length;
        results.errors.push(`Bulk insert failed: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed: ${results.success} students added, ${results.failed} failed`,
      results,
    });
  } catch (error: any) {
    console.error('Import students error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

