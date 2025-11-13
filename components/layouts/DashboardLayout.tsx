'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Container } from './Container';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole: 'admin' | 'teacher' | 'student';
  userName?: string;
  navItems: NavItem[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  userRole,
  userName,
  navItems,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} userRole={userRole} userName={userName} />
      <div className="flex flex-1">
        <Sidebar items={navItems} />
        <Container>{children}</Container>
      </div>
    </div>
  );
};

