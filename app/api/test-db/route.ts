import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { User, Student, Teacher, TeacherAssignment, Attendance } from '@/lib/models';

export async function GET() {
  try {
    // Test database connection
    await connectDB();

    // Get collection stats
    const userCount = await User.countDocuments();
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const assignmentCount = await TeacherAssignment.countDocuments();
    const attendanceCount = await Attendance.countDocuments();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      stats: {
        users: userCount,
        students: studentCount,
        teachers: teacherCount,
        assignments: assignmentCount,
        attendance: attendanceCount,
      },
      models: {
        User: 'Connected',
        Student: 'Connected',
        Teacher: 'Connected',
        TeacherAssignment: 'Connected',
        Attendance: 'Connected',
      },
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

