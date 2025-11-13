'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const teacherNavItems = [
  { label: 'Dashboard', href: '/teacher/dashboard' },
  { label: 'Mark Attendance', href: '/teacher/attendance' },
];

interface Student {
  id: string;
  name: string;
  registrationNo: string;
  branch?: string;
  status: 'present' | 'absent' | null;
}

export default function MarkAttendancePage() {
  const params = useParams();
  const router = useRouter();
  const batch = params.batch as string;
  const section = params.section as string;
  const subject = params.subject as string;

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [teacherName, setTeacherName] = useState('Teacher');

  useEffect(() => {
    fetchData();
  }, [batch, section, selectedDate]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      // Fetch teacher name
      const meResponse = await fetch('/api/auth/me');
      const meData = await meResponse.json();
      if (meData.success && meData.user.name) {
        setTeacherName(meData.user.name);
      }

      // Fetch students for this batch and section
      const studentsResponse = await fetch(
        `/api/teacher/students?batch=${batch}&section=${section}`
      );
      const studentsData = await studentsResponse.json();

      if (studentsData.success) {
        // Fetch existing attendance for the selected date
        const attendanceResponse = await fetch(
          `/api/teacher/attendance?batch=${batch}&section=${section}&subject=${encodeURIComponent(subject)}&date=${selectedDate}`
        );
        const attendanceData = await attendanceResponse.json();

        // Map existing attendance to students
        const attendanceMap = new Map(
          attendanceData.success
            ? attendanceData.attendance.map((a: any) => [a.studentId, a.status])
            : []
        );

        // Set students with their attendance status
        setStudents(
          studentsData.students.map((s: any) => ({
            id: s.id,
            name: s.name,
            registrationNo: s.registrationNo,
            branch: s.branch,
            status: attendanceMap.get(s.id) || null,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load students. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleToggleStatus = (studentId: string, status: 'present' | 'absent') => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const handleMarkAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' as const })));
  };

  const handleMarkAllAbsent = () => {
    setStudents(students.map(s => ({ ...s, status: 'absent' as const })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all students have status
    const unmarked = students.filter(s => s.status === null);
    if (unmarked.length > 0) {
      alert(`Please mark attendance for all students (${unmarked.length} remaining)`);
      return;
    }

    setLoading(true);
    setSuccess('');

    try {
      const attendanceRecords = students.map(s => ({
        studentId: s.id,
        status: s.status,
      }));

      const response = await fetch('/api/teacher/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendanceRecords,
          date: selectedDate,
          batch,
          section,
          subject,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || 'Failed to mark attendance');
        return;
      }

      setSuccess('Attendance marked successfully!');
      setTimeout(() => {
        router.push('/teacher/dashboard');
      }, 1500);
    } catch (err) {
      alert('Failed to mark attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const unmarkedCount = students.filter(s => s.status === null).length;

  if (fetchLoading) {
    return (
      <DashboardLayout
        title="Mark Attendance"
        userRole="teacher"
        userName={teacherName}
        navItems={teacherNavItems}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Loading students...</p>
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
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-primary-600 hover:text-primary-700 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-primary-900">
            {subject}
          </h2>
          <p className="text-gray-600 mt-1">
            Batch {batch} - Section {section}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selector */}
          <Card title="Select Date">
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
              <div className="text-sm text-gray-600">
                {new Date(selectedDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gray-50">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {students.length}
              </p>
            </Card>
            <Card className="bg-green-50">
              <p className="text-sm text-green-700">Present</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {presentCount}
              </p>
            </Card>
            <Card className="bg-red-50">
              <p className="text-sm text-red-700">Absent</p>
              <p className="text-2xl font-bold text-red-900 mt-1">
                {absentCount}
              </p>
            </Card>
          </div>

          {/* Bulk Actions */}
          <Card title="Quick Actions">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="success"
                onClick={handleMarkAllPresent}
              >
                Mark All Present
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleMarkAllAbsent}
              >
                Mark All Absent
              </Button>
            </div>
          </Card>

          {/* Student List */}
          {students.length > 0 ? (
            <Card title={`Students (${unmarkedCount} unmarked)`}>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      student.status === 'present'
                        ? 'bg-green-50 border-green-300'
                        : student.status === 'absent'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {student.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {student.registrationNo}
                        {student.branch && ` • ${student.branch}`}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(student.id, 'present')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          student.status === 'present'
                            ? 'btn-success'
                            : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(student.id, 'absent')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          student.status === 'absent'
                            ? 'btn-danger'
                            : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">No students found in this section</p>
                <p className="text-sm text-gray-500 mt-2">
                  Please contact the administrator
                </p>
              </div>
            </Card>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-success font-medium">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          {students.length > 0 && (
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg"
              disabled={loading || unmarkedCount > 0}
            >
              {loading
                ? 'Submitting...'
                : unmarkedCount > 0
                ? `Mark Remaining ${unmarkedCount} Students`
                : 'Submit Attendance'}
            </Button>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
