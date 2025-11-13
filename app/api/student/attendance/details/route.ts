import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Student, Attendance } from '@/lib/models';
import { requireStudent } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check student authorization
    const authResult = await requireStudent(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = authResult;

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const month = searchParams.get('month');

    // Connect to database
    await connectDB();

    // Get student record
    const student = await Student.findOne({ userId: user.userId });
    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student record not found' },
        { status: 404 }
      );
    }

    // Build query
    const query: any = { studentId: student._id };

    if (subject) {
      query.subject = subject;
    }

    if (month) {
      // Month format: YYYY-MM
      const [year, monthNum] = month.split('-').map(Number);
      const startDate = new Date(year, monthNum - 1, 1);
      const endDate = new Date(year, monthNum, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }

    // Get attendance records
    const attendanceRecords = await Attendance.find(query).sort({ date: -1 });

    // Format records
    const formattedRecords = attendanceRecords.map(record => ({
      id: record._id,
      subject: record.subject,
      date: record.date,
      status: record.status,
    }));

    return NextResponse.json({
      success: true,
      records: formattedRecords,
    });
  } catch (error: any) {
    console.error('Get student attendance details error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

