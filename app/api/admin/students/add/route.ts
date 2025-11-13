import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { User, Student } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { name, registrationNo, branch, batch, section } = body;

    // Validate inputs
    if (!name || !registrationNo || !branch || !batch || !section) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    const regNo = registrationNo.trim().toUpperCase();
    const firstName = name.trim().split(' ')[0].toLowerCase();
    const email = `${firstName}.${regNo}@iiitranchi.ac.in`.toLowerCase();

    // Check if student already exists
    const existingStudent = await Student.findOne({ registrationNo: regNo });
    if (existingStudent) {
      return NextResponse.json(
        { success: false, error: `Student with registration number ${regNo} already exists` },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        email,
        role: 'student',
        isVerified: false,
      });
    } else {
      // Validate existing user's role
      if (user.role !== 'student') {
        return NextResponse.json(
          { success: false, error: `Email ${email} already exists with role '${user.role}'` },
          { status: 400 }
        );
      }
    }

    // Create student record
    const student = await Student.create({
      userId: user._id,
      name: name.trim(),
      registrationNo: regNo,
      branch: branch.trim().toUpperCase(),
      batch: batch.trim(),
      section: section.trim().toUpperCase(),
      email,
    });

    return NextResponse.json({
      success: true,
      message: 'Student added successfully',
      student: {
        id: student._id,
        name: student.name,
        registrationNo: student.registrationNo,
        branch: student.branch,
        batch: student.batch,
        section: student.section,
        email: student.email,
      },
    });
  } catch (error: any) {
    console.error('Add student error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

