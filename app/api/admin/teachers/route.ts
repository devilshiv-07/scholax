import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { User, Teacher, TeacherAssignment } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';
import { isValidEmail } from '@/lib/utils/otp';

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { name, email } = body;

    // Validate inputs
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prevent using student email domain for teachers
    if (email.toLowerCase().endsWith('@iiitranchi.ac.in')) {
      return NextResponse.json(
        { success: false, error: 'Teachers cannot use @iiitranchi.ac.in email addresses. These are reserved for students.' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // Validate existing user's role
      if (user.role !== 'teacher') {
        return NextResponse.json(
          { success: false, error: `Email already exists with role '${user.role}'. Cannot create teacher account.` },
          { status: 400 }
        );
      }

      // Check if already a teacher
      const existingTeacher = await Teacher.findOne({ userId: user._id });
      if (existingTeacher) {
        return NextResponse.json(
          { success: false, error: 'Teacher with this email already exists' },
          { status: 400 }
        );
      }
    } else {
      // Create new user
      user = await User.create({
        email: email.toLowerCase(),
        role: 'teacher',
        isVerified: false,
      });
    }

    // Create teacher record
    const teacher = await Teacher.create({
      userId: user._id,
      name,
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      success: true,
      message: 'Teacher added successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
      },
    });
  } catch (error: any) {
    console.error('Add teacher error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Connect to database
    await connectDB();

    // Get all teachers with their assignments
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    const teachersWithAssignments = await Promise.all(
      teachers.map(async (teacher) => {
        const assignments = await TeacherAssignment.find({ teacherId: teacher._id });
        
        return {
          id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          assignments: assignments.map(a => ({
            id: a._id,
            batch: a.batch,
            section: a.section,
            subject: a.subject,
          })),
        };
      })
    );

    return NextResponse.json({
      success: true,
      teachers: teachersWithAssignments,
    });
  } catch (error: any) {
    console.error('Get teachers error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

