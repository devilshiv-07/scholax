'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  userRole?: 'admin' | 'teacher' | 'student';
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, userRole, userName }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">ScholaX</h1>
          <p className="text-sm text-purple-100">{title}</p>
        </div>
        {userName && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-purple-100 capitalize">{userRole}</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

