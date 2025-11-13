import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import { Student, Teacher, TeacherAssignment } from '@/lib/models';
import { requireAdmin } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Connect to database
    await connectDB();

    // Get statistics
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    
    // Get unique batches
    const batches = await Student.distinct('batch');
    const totalBatches = batches.length;

    // Get unique sections
    const sections = await Student.distinct('section');
    const totalSections = sections.length;

    // Get students by branch
    const studentsByBranch = await Student.aggregate([
      {
        $group: {
          _id: '$branch',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get students by batch
    const studentsByBatch = await Student.aggregate([
      {
        $group: {
          _id: '$batch',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalStudents,
        totalTeachers,
        totalBatches,
        totalSections,
        studentsByBranch: studentsByBranch.map(b => ({
          branch: b._id,
          count: b.count
        })),
        studentsByBatch: studentsByBatch.map(b => ({
          batch: b._id,
          count: b.count
        })),
      },
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

