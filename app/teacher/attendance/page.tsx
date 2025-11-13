'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const teacherNavItems = [
  { label: 'Dashboard', href: '/teacher/dashboard' },
  { label: 'Mark Attendance', href: '/teacher/attendance' },
];

interface Assignment {
  id: string;
  batch: string;
  section: string;
  subject: string;
  studentCount: number;
}

export default function TeacherAttendancePage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [teacherName, setTeacherName] = useState('Teacher');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch teacher info
      const meResponse = await fetch('/api/auth/me');
      const meData = await meResponse.json();
      if (meData.success && meData.user.name) {
        setTeacherName(meData.user.name);
      }

      // Fetch assigned sections
      const sectionsResponse = await fetch('/api/teacher/sections');
      const sectionsData = await sectionsResponse.json();
      
      if (sectionsData.success) {
        setAssignments(sectionsData.sections);
      }
    } catch (error) {
      console.error('Failed to fetch teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const todayDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Group assignments by batch and section
  const groupedAssignments = assignments.reduce((acc, assignment) => {
    const key = `${assignment.batch}-${assignment.section}`;
    if (!acc[key]) {
      acc[key] = {
        batch: assignment.batch,
        section: assignment.section,
        subjects: [],
      };
    }
    acc[key].subjects.push({
      id: assignment.id,
      subject: assignment.subject,
      studentCount: assignment.studentCount,
    });
    return acc;
  }, {} as Record<string, any>);

  if (loading) {
    return (
      <DashboardLayout
        title="Mark Attendance"
        userRole="teacher"
        userName={teacherName}
        navItems={teacherNavItems}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Mark Attendance"
      userRole="teacher"
      userName={teacherName}
      navItems={teacherNavItems}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-primary-900">Select Section to Mark Attendance</h2>
          <p className="text-gray-600 mt-2">{todayDate}</p>
        </div>

        {/* Assigned Sections Grouped */}
        {assignments.length > 0 ? (
          <div className="space-y-6">
            {Object.values(groupedAssignments).map((group: any) => (
              <Card key={`${group.batch}-${group.section}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-900">
                        Batch {group.batch} - Section {group.section}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {group.subjects.length} subject{group.subjects.length !== 1 ? 's' : ''} assigned
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.subjects.map((subj: any) => (
                      <Link
                        key={subj.id}
                        href={`/teacher/attendance/${group.batch}/${group.section}/${subj.subject}`}
                        className="block"
                      >
                        <div className="p-4 border-2 border-primary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-primary-900">
                              {subj.subject}
                            </h4>
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{subj.studentCount} Students</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-600">No sections assigned yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Please contact the administrator to get sections assigned
              </p>
            </div>
          </Card>
        )}

        {/* Quick Info */}
        {assignments.length > 0 && (
          <Card className="bg-primary-50 border-primary-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary-900 mb-1">How to mark attendance:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Click on any subject card to mark attendance</li>
                  <li>• You can mark attendance for today or any previous date</li>
                  <li>• Green button = Present, Red button = Absent</li>
                  <li>• Use "Mark All" buttons for quick marking</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

