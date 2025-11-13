'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Import Students', href: '/admin/students/import' },
  { label: 'Manage Teachers', href: '/admin/teachers' },
  { label: 'View Students', href: '/admin/students' },
];

interface Student {
  id: string;
  name: string;
  registrationNo: string;
  branch: string;
  batch: string;
  section: string;
  email: string;
}

export default function ViewStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [filterBatch, filterSection, filterBranch, searchTerm]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterBatch) params.append('batch', filterBatch);
      if (filterSection) params.append('section', filterSection);
      if (filterBranch) params.append('branch', filterBranch);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/students?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="View Students"
      userRole="admin"
      userName="Administrator"
      navItems={adminNavItems}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-primary-900">Students</h2>
          <p className="text-gray-600 mt-2">View and manage all students</p>
        </div>

        {/* Filters */}
        <Card title="Filters">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              label="Search"
              type="text"
              placeholder="Name or Reg. No."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              label="Batch"
              type="text"
              placeholder="e.g., 2024"
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
            />
            <Input
              label="Section"
              type="text"
              placeholder="e.g., A"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value.toUpperCase())}
              maxLength={1}
            />
            <Input
              label="Branch"
              type="text"
              placeholder="e.g., CSE"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value.toUpperCase())}
            />
          </div>
        </Card>

        {/* Students Table */}
        <Card>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Reg. No.
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Branch
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Batch
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Section
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-primary-50">
                        <td className="py-3 px-4 text-sm font-medium text-primary-700">
                          {student.registrationNo}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded">
                            {student.branch}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {student.batch}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {student.section}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {student.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {students.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No students found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try adjusting your filters or import new students
                  </p>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Summary */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>Showing {students.length} students</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
