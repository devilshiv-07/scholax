import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Teacher, Attendance } from '@/lib/models';
import { requireTeacher } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Check teacher authorization
    const authResult = await requireTeacher(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = authResult;

    const body = await request.json();
    const { attendanceRecords, date, batch, section, subject } = body;

    // Validate inputs
    if (!attendanceRecords || !Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Attendance records are required' },
        { status: 400 }
      );
    }

    if (!date || !batch || !section || !subject) {
      return NextResponse.json(
        { success: false, error: 'Date, batch, section, and subject are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get teacher record
    const teacher = await Teacher.findOne({ userId: user.userId });
    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher record not found' },
        { status: 404 }
      );
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each attendance record
    for (const record of attendanceRecords) {
      const { studentId, status } = record;

      if (!studentId || !status) {
        results.failed++;
        results.errors.push('Missing student ID or status');
        continue;
      }

      if (status !== 'present' && status !== 'absent') {
        results.failed++;
        results.errors.push(`Invalid status for student ${studentId}`);
        continue;
      }

      try {
        // Check if attendance already exists
        const existingAttendance = await Attendance.findOne({
          studentId,
          subject,
          date: attendanceDate,
        });

        if (existingAttendance) {
          // Update existing attendance
          existingAttendance.status = status;
          existingAttendance.teacherId = teacher._id;
          await existingAttendance.save();
        } else {
          // Create new attendance record
          await Attendance.create({
            studentId,
            teacherId: teacher._id,
            subject,
            date: attendanceDate,
            status,
            batch,
            section: section.toUpperCase(),
          });
        }

        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Failed to save attendance for student ${studentId}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Attendance marked: ${results.success} successful, ${results.failed} failed`,
      results,
    });
  } catch (error: any) {
    console.error('Mark attendance error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check teacher authorization
    const authResult = await requireTeacher(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const batch = searchParams.get('batch');
    const section = searchParams.get('section');
    const subject = searchParams.get('subject');
    const date = searchParams.get('date');

    // Validate inputs
    if (!batch || !section || !subject || !date) {
      return NextResponse.json(
        { success: false, error: 'Batch, section, subject, and date are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Get attendance records for this date
    const attendanceRecords = await Attendance.find({
      batch,
      section: section.toUpperCase(),
      subject,
      date: attendanceDate,
    }).populate('studentId');

    return NextResponse.json({
      success: true,
      attendance: attendanceRecords.map(a => ({
        id: a._id,
        studentId: a.studentId._id,
        status: a.status,
      })),
    });
  } catch (error: any) {
    console.error('Get attendance error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

