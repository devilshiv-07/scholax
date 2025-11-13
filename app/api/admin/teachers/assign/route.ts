import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Teacher, TeacherAssignment } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { teacherId, batch, section, subject } = body;

    // Validate inputs
    if (!teacherId || !batch || !section || !subject) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID, batch, section, and subject are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Check if assignment already exists
    const existingAssignment = await TeacherAssignment.findOne({
      teacherId,
      batch,
      section: section.toUpperCase(),
      subject,
    });

    if (existingAssignment) {
      return NextResponse.json(
        { success: false, error: 'This assignment already exists' },
        { status: 400 }
      );
    }

    // Create assignment
    const assignment = await TeacherAssignment.create({
      teacherId,
      batch,
      section: section.toUpperCase(),
      subject,
    });

    return NextResponse.json({
      success: true,
      message: 'Teacher assigned successfully',
      assignment: {
        id: assignment._id,
        teacherId: assignment.teacherId,
        batch: assignment.batch,
        section: assignment.section,
        subject: assignment.subject,
      },
    });
  } catch (error: any) {
    console.error('Assign teacher error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

