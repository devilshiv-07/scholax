'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const studentNavItems = [
  { label: 'Dashboard', href: '/student/dashboard' },
  { label: 'Attendance Details', href: '/student/attendance' },
];

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent';
}

export default function AttendanceDetailsPage() {
  const [filterSubject, setFilterSubject] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [studentName, setStudentName] = useState('Student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filterSubject, filterMonth]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch student info
      const meResponse = await fetch('/api/auth/me');
      const meData = await meResponse.json();
      if (meData.success && meData.user.name) {
        setStudentName(meData.user.name);
      }

      // Build query params
      const params = new URLSearchParams();
      if (filterSubject) params.append('subject', filterSubject);
      if (filterMonth) params.append('month', filterMonth);

      // Fetch attendance details
      const attendanceResponse = await fetch(
        `/api/student/attendance/details?${params.toString()}`
      );
      const attendanceData = await attendanceResponse.json();

      if (attendanceData.success) {
        setAttendanceRecords(attendanceData.records || []);
        
        // Extract unique subjects
        const uniqueSubjects = Array.from(
          new Set(attendanceData.records.map((r: AttendanceRecord) => r.subject))
        );
        setSubjects(uniqueSubjects as string[]);
      }
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group by date
  const groupedRecords = attendanceRecords.reduce((acc, record) => {
    if (!acc[record.date]) {
      acc[record.date] = [];
    }
    acc[record.date].push(record);
    return acc;
  }, {} as Record<string, AttendanceRecord[]>);

  const sortedDates = Object.keys(groupedRecords).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <DashboardLayout
      title="Attendance Details"
      userRole="student"
      userName={studentName}
      navItems={studentNavItems}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-primary-900">
            Attendance History
          </h2>
          <p className="text-gray-600 mt-2">View your detailed attendance records</p>
        </div>

        {/* Filters */}
        <Card title="Filters">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Month"
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            />
          </div>
        </Card>

        {loading ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          </Card>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gray-50">
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {attendanceRecords.length}
                </p>
              </Card>
              <Card className="bg-green-50">
                <p className="text-sm text-green-700">Present</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {attendanceRecords.filter(r => r.status === 'present').length}
                </p>
              </Card>
              <Card className="bg-red-50">
                <p className="text-sm text-red-700">Absent</p>
                <p className="text-2xl font-bold text-red-900 mt-1">
                  {attendanceRecords.filter(r => r.status === 'absent').length}
                </p>
              </Card>
            </div>

            {/* Attendance Records */}
            {sortedDates.length > 0 ? (
              <div className="space-y-4">
                {sortedDates.map((date) => (
                  <Card key={date}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h3 className="font-semibold text-gray-900">
                          {new Date(date).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </h3>
                        <span className="text-sm text-gray-600">
                          {groupedRecords[date].length} classes
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {groupedRecords[date].map((record) => (
                          <div
                            key={record.id}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              record.status === 'present'
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-red-50 border border-red-200'
                            }`}
                          >
                            <span className="font-medium text-gray-900">
                              {record.subject}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                record.status === 'present'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {record.status === 'present' ? '✓ Present' : '✗ Absent'}
                            </span>
                          </div>
                        ))}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No attendance records found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {filterSubject || filterMonth
                      ? 'Try adjusting your filters'
                      : 'Your attendance will appear here once marked by teachers'}
                  </p>
                </div>
              </Card>
            )}

            {/* Summary */}
            <div className="text-center text-sm text-gray-600">
              Showing {attendanceRecords.length} records
              {(filterSubject || filterMonth) && ' (filtered)'}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
