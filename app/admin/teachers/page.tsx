'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Import Students', href: '/admin/students/import' },
  { label: 'Manage Teachers', href: '/admin/teachers' },
  { label: 'View Students', href: '/admin/students' },
];

interface Assignment {
  id: string;
  batch: string;
  section: string;
  subject: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  assignments: Assignment[];
}

export default function ManageTeachersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  
  // Add Teacher Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Assignment Form
  const [batch, setBatch] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/admin/teachers');
      const data = await response.json();
      
      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh teachers list
        await fetchTeachers();
        setName('');
        setEmail('');
        setShowAddForm(false);
      } else {
        alert(data.error || 'Failed to add teacher');
      }
    } catch (err) {
      console.error('Failed to add teacher:', err);
      alert('Failed to add teacher');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/teachers/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          batch,
          section,
          subject,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh teachers list
        await fetchTeachers();
        setBatch('');
        setSection('');
        setSubject('');
        setShowAssignForm(false);
        setSelectedTeacher(null);
      } else {
        alert(data.error || 'Failed to assign teacher');
      }
    } catch (err) {
      console.error('Failed to assign teacher:', err);
      alert('Failed to assign teacher');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <DashboardLayout
        title="Manage Teachers"
        userRole="admin"
        userName="Administrator"
        navItems={adminNavItems}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Manage Teachers"
      userRole="admin"
      userName="Administrator"
      navItems={adminNavItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary-900">Teachers</h2>
            <p className="text-gray-600 mt-2">Add teachers and assign them to sections</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Teacher'}
          </Button>
        </div>

        {/* Add Teacher Form */}
        {showAddForm && (
          <Card title="Add New Teacher">
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <Input
                label="Teacher Name"
                type="text"
                placeholder="Enter teacher name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Teacher'}
              </Button>
            </form>
          </Card>
        )}

        {/* Assignment Form */}
        {showAssignForm && selectedTeacher && (
          <Card title="Assign Teacher to Section">
            <form onSubmit={handleAssignTeacher} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="Batch"
                  type="text"
                  placeholder="e.g., 2024"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  required
                />
                <Input
                  label="Section"
                  type="text"
                  placeholder="e.g., A"
                  value={section}
                  onChange={(e) => setSection(e.target.value.toUpperCase())}
                  maxLength={1}
                  required
                />
                <Input
                  label="Subject"
                  type="text"
                  placeholder="e.g., Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? 'Assigning...' : 'Assign Teacher'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowAssignForm(false);
                    setSelectedTeacher(null);
                    setBatch('');
                    setSection('');
                    setSubject('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Teachers List */}
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <Card key={teacher.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary-900">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{teacher.email}</p>
                  
                  {teacher.assignments.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Assigned Sections:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.assignments.map((assignment, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {assignment.batch}-{assignment.section}-{assignment.subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedTeacher(teacher.id);
                    setShowAssignForm(true);
                    setShowAddForm(false);
                  }}
                >
                  Assign Section
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {teachers.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600">No teachers added yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click the "Add Teacher" button to get started
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
