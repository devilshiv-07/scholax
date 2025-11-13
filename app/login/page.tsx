'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to send OTP');
        return;
      }

      // Redirect to OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">ScholaX</h1>
          <p className="text-purple-100">College Management System</p>
        </div>

        {/* Login Card */}
        <Card>
          <h2 className="text-2xl font-bold text-primary-900 mb-6 text-center">
            Sign In
          </h2>
          
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error}
            />

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>An OTP will be sent to your email</p>
            <p className="mt-2 text-xs">
              Students must use @iiitranchi.ac.in email
            </p>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white font-medium text-sm">Admin</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white font-medium text-sm">Teacher</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white font-medium text-sm">Student</p>
          </div>
        </div>
      </div>
    </div>
  );
}

