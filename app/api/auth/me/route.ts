import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Student, Teacher } from '@/lib/models';
import { authenticate } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticate(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get additional user details based on role
    let userData: any = {
      id: user.userId,
      email: user.email,
      role: user.role,
    };

    if (user.role === 'student') {
      const student = await Student.findOne({ userId: user.userId });
      if (student) {
        userData.name = student.name;
        userData.registrationNo = student.registrationNo;
        userData.branch = student.branch;
        userData.batch = student.batch;
        userData.section = student.section;
      }
    } else if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({ userId: user.userId });
      if (teacher) {
        userData.name = teacher.name;
        userData.teacherId = teacher._id;
      }
    } else if (user.role === 'admin') {
      userData.name = 'Administrator';
    }

    return NextResponse.json({
      success: true,
      user: userData,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

