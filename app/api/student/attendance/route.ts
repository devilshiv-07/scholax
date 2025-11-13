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

    // Get all attendance records for this student
    const attendanceRecords = await Attendance.find({ studentId: student._id });

    // Group by subject and calculate percentages
    const subjectMap = new Map<string, { present: number; total: number }>();

    attendanceRecords.forEach((record) => {
      const subject = record.subject;
      
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, { present: 0, total: 0 });
      }

      const stats = subjectMap.get(subject)!;
      stats.total++;
      if (record.status === 'present') {
        stats.present++;
      }
    });

    // Convert to array with percentages
    const subjectAttendance = Array.from(subjectMap.entries()).map(([subject, stats]) => ({
      subject,
      present: stats.present,
      total: stats.total,
      percentage: stats.total > 0 ? (stats.present / stats.total) * 100 : 0,
    }));

    // Calculate overall percentage
    const totalClasses = attendanceRecords.length;
    const totalPresent = attendanceRecords.filter(r => r.status === 'present').length;
    const overallPercentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;

    return NextResponse.json({
      success: true,
      attendance: {
        subjects: subjectAttendance,
        overall: {
          present: totalPresent,
          total: totalClasses,
          percentage: overallPercentage,
        },
      },
    });
  } catch (error: any) {
    console.error('Get student attendance error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

