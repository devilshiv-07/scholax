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

export default function TeacherDashboard() {
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

  if (loading) {
    return (
      <DashboardLayout
        title="Teacher Dashboard"
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
      title="Teacher Dashboard"
      userRole="teacher"
      userName={teacherName}
      navItems={teacherNavItems}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-primary-900">My Classes</h2>
          <p className="text-gray-600 mt-2">{todayDate}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-700 font-medium">Total Sections</p>
                <p className="text-3xl font-bold text-primary-900 mt-2">
                  {assignments.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-700 font-medium">Total Students</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {assignments.reduce((sum, a) => sum + a.studentCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Subjects</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {new Set(assignments.map(a => a.subject)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Assigned Sections */}
        <div>
          <h3 className="text-2xl font-bold text-primary-900 mb-4">Assigned Sections</h3>
          {assignments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-semibold text-primary-900">
                          {assignment.subject}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Batch {assignment.batch} - Section {assignment.section}
                        </p>
                      </div>
                      <div className="text-3xl">📘</div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>👥</span>
                      <span>{assignment.studentCount} Students</span>
                    </div>

                    <Link
                      href={`/teacher/attendance/${assignment.batch}/${assignment.section}/${assignment.subject}`}
                    >
                      <button className="w-full btn-primary">
                        Mark Attendance
                      </button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-600">No sections assigned yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Please contact the administrator to get sections assigned
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        {assignments.length > 0 && (
          <Card title="Quick Actions">
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/teacher/attendance/${assignments[0].batch}/${assignments[0].section}/${assignments[0].subject}`}
                className="p-4 border-2 border-primary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900">Mark Attendance</h3>
                <p className="text-sm text-gray-600 mt-1">Take attendance for today</p>
              </Link>

              <div className="p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 transition-all text-center cursor-pointer">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-7 h-7 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-secondary-900">View Reports</h3>
                <p className="text-sm text-gray-600 mt-1">Check attendance statistics</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
