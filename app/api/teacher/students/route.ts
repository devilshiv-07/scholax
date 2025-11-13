import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Student } from '@/lib/models';
import { requireTeacher } from '@/lib/middleware/auth';

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

    // Validate inputs
    if (!batch || !section) {
      return NextResponse.json(
        { success: false, error: 'Batch and section are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get students for this batch and section
    const students = await Student.find({
      batch,
      section: section.toUpperCase(),
    }).sort({ registrationNo: 1 });

    return NextResponse.json({
      success: true,
      students: students.map(s => ({
        id: s._id,
        name: s.name,
        registrationNo: s.registrationNo,
        branch: s.branch,
      })),
    });
  } catch (error: any) {
    console.error('Get students error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

