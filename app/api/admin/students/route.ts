import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Student } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const batch = searchParams.get('batch');
    const section = searchParams.get('section');
    const branch = searchParams.get('branch');
    const search = searchParams.get('search');

    // Connect to database
    await connectDB();

    // Build query
    const query: any = {};

    if (batch) {
      query.batch = batch;
    }

    if (section) {
      query.section = section.toUpperCase();
    }

    if (branch) {
      query.branch = branch.toUpperCase();
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { registrationNo: { $regex: search, $options: 'i' } },
      ];
    }

    // Get students
    const students = await Student.find(query).sort({ registrationNo: 1 });

    return NextResponse.json({
      success: true,
      students: students.map(s => ({
        id: s._id,
        name: s.name,
        registrationNo: s.registrationNo,
        branch: s.branch,
        batch: s.batch,
        section: s.section,
        email: s.email,
      })),
      total: students.length,
    });
  } catch (error: any) {
    console.error('Get students error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

