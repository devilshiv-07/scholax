import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Teacher, TeacherAssignment, Student } from '@/lib/models';
import { requireTeacher } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check teacher authorization
    const authResult = await requireTeacher(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const user = authResult;

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

    // Get all assignments for this teacher
    const assignments = await TeacherAssignment.find({ teacherId: teacher._id });

    // Get student count for each assignment
    const sectionsWithCounts = await Promise.all(
      assignments.map(async (assignment) => {
        const studentCount = await Student.countDocuments({
          batch: assignment.batch,
          section: assignment.section,
        });

        return {
          id: assignment._id,
          batch: assignment.batch,
          section: assignment.section,
          subject: assignment.subject,
          studentCount,
        };
      })
    );

    return NextResponse.json({
      success: true,
      sections: sectionsWithCounts,
    });
  } catch (error: any) {
    console.error('Get teacher sections error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

