'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';

const studentNavItems = [
  { label: 'Dashboard', href: '/student/dashboard' },
  { label: 'Attendance Details', href: '/student/attendance' },
];

interface SubjectAttendance {
  subject: string;
  present: number;
  total: number;
  percentage: number;
}

interface StudentInfo {
  name: string;
  registrationNo: string;
  branch: string;
  batch: string;
  section: string;
}

export default function StudentDashboard() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    registrationNo: '',
    branch: '',
    batch: '',
    section: '',
  });
  const [attendanceData, setAttendanceData] = useState<SubjectAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch student info
      const meResponse = await fetch('/api/auth/me');
      const meData = await meResponse.json();
      
      if (meData.success && meData.user) {
        setStudentInfo({
          name: meData.user.name || '',
          registrationNo: meData.user.registrationNo || '',
          branch: meData.user.branch || '',
          batch: meData.user.batch || '',
          section: meData.user.section || '',
        });
      }

      // Fetch attendance data
      const attendanceResponse = await fetch('/api/student/attendance');
      const attendanceDataRes = await attendanceResponse.json();
      
      if (attendanceDataRes.success) {
        setAttendanceData(attendanceDataRes.attendance.subjects || []);
      }
    } catch (error) {
      console.error('Failed to fetch student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const overallPercentage = attendanceData.length > 0
    ? (
        (attendanceData.reduce((sum, a) => sum + a.present, 0) /
          attendanceData.reduce((sum, a) => sum + a.total, 0)) *
        100
      ).toFixed(2)
    : '0.00';

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'from-green-400 to-green-600';
    if (percentage >= 75) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getPercentageTextColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-700';
    if (percentage >= 75) return 'text-yellow-700';
    return 'text-red-700';
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Student Dashboard"
        userRole="student"
        userName={studentInfo.name}
        navItems={studentNavItems}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Student Dashboard"
      userRole="student"
      userName={studentInfo.name}
      navItems={studentNavItems}
    >
      <div className="space-y-8">
        {/* Student Info */}
        <Card>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-primary-900">
                {studentInfo.name}
              </h2>
              <p className="text-gray-600 mt-2">
                Registration No: {studentInfo.registrationNo}
              </p>
            </div>
            <div className="flex items-center justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Branch</p>
                <p className="font-semibold text-gray-900">{studentInfo.branch}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Batch</p>
                <p className="font-semibold text-gray-900">{studentInfo.batch}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Section</p>
                <p className="font-semibold text-gray-900">{studentInfo.section}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Overall Attendance */}
        <Card className="bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Overall Attendance
            </h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - parseFloat(overallPercentage) / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-900">
                      {overallPercentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              {attendanceData.reduce((sum, a) => sum + a.present, 0)} out of{' '}
              {attendanceData.reduce((sum, a) => sum + a.total, 0)} classes attended
            </p>
          </div>
        </Card>

        {/* Subject-wise Attendance */}
        <div>
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            Subject-wise Attendance
          </h3>
          {attendanceData.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {attendanceData.map((subject, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {subject.subject}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {subject.present} / {subject.total} classes
                        </p>
                      </div>
                      <div className={`text-2xl font-bold ${getPercentageTextColor(subject.percentage)}`}>
                        {subject.percentage.toFixed(1)}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getPercentageColor(subject.percentage)} transition-all duration-500`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          subject.percentage >= 90
                            ? 'bg-green-100 text-green-700'
                            : subject.percentage >= 75
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {subject.percentage >= 90
                          ? 'Excellent'
                          : subject.percentage >= 75
                          ? 'Good'
                          : 'Need Improvement'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {subject.total - subject.present} absent
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-gray-600">No attendance records yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Your attendance will appear here once your teacher marks it
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Attendance Warning */}
        {parseFloat(overallPercentage) < 75 && attendanceData.length > 0 && (
          <Card className="bg-red-50 border-2 border-red-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">
                  Attendance Below Required Threshold
                </h4>
                <p className="text-sm text-red-700">
                  Your overall attendance is below 75%. Please ensure regular attendance
                  to meet the minimum requirement.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Additional Info */}
        <Card title="Important Information">
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Minimum required attendance: <strong>75%</strong></p>
            <p>• Attendance is updated daily after classes</p>
            <p>• For any discrepancies, contact your class teacher</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
