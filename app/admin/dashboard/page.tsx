'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Card } from '@/components/ui/Card';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Import Students', href: '/admin/students/import' },
  { label: 'Manage Teachers', href: '/admin/teachers' },
  { label: 'View Students', href: '/admin/students' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalBatches: 0,
    totalSections: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalStudents: data.stats.totalStudents,
          totalTeachers: data.stats.totalTeachers,
          totalBatches: data.stats.totalBatches,
          totalSections: data.stats.totalSections,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Admin Dashboard"
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
      title="Admin Dashboard"
      userRole="admin"
      userName="Administrator"
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-primary-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-2">Welcome to ScholaX Admin Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-700 font-medium">Total Students</p>
                <p className="text-3xl font-bold text-primary-900 mt-2">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-700 font-medium">Total Teachers</p>
                <p className="text-3xl font-bold text-secondary-900 mt-2">
                  {stats.totalTeachers}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Total Batches</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {stats.totalBatches}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-700 font-medium">Total Sections</p>
                <p className="text-3xl font-bold text-pink-900 mt-2">
                  {stats.totalSections}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/admin/students/import"
              className="p-4 border-2 border-primary-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-900">Import Students</h3>
              <p className="text-sm text-gray-600 mt-1">Upload CSV file</p>
            </a>

            <a
              href="/admin/teachers"
              className="p-4 border-2 border-secondary-200 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 transition-all text-center"
            >
              <div className="w-14 h-14 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900">Manage Teachers</h3>
              <p className="text-sm text-gray-600 mt-1">Add or assign teachers</p>
            </a>

            <a
              href="/admin/students"
              className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-purple-900">View Students</h3>
              <p className="text-sm text-gray-600 mt-1">Browse all students</p>
            </a>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <p className="text-sm text-gray-700">50 students imported to Batch 2024 Section A</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                <p className="text-sm text-gray-700">Teacher assigned to CSE-A Mathematics</p>
              </div>
              <span className="text-xs text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <p className="text-sm text-gray-700">New teacher added: Dr. Sharma</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

