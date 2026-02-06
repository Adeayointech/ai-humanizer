// src/app/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [status, session, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update profile');
      }
    } catch {
      setError('An error occurred');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to change password');
      }
    } catch {
      setError('An error occurred');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center">
        <div className="text-violet-300 text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
      <Navigation />
      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-3">
              Account Settings
            </h1>
            <p className="text-violet-300">Manage your profile and account preferences</p>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/40 rounded-xl backdrop-blur-sm">
              <p className="text-green-200 text-center">{message}</p>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/40 rounded-xl backdrop-blur-sm">
              <p className="text-red-200 text-center">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Info Card */}
            <div className="backdrop-blur-lg bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-3xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-violet-300">Account Info</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  session.user?.isPro 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border border-white/10' 
                    : 'bg-violet-500/30 text-violet-200 border border-violet-400/30'
                }`}>
                  {session.user?.isPro ? '⭐ Pro' : 'Free Trial'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-violet-300 mb-2">Email</label>
                  <div className="w-full rounded-xl border-2 border-white/20 bg-white/5 p-3 text-gray-200">
                    {session.user?.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-violet-300 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
                    />
                  ) : (
                    <div className="w-full rounded-xl border-2 border-white/20 bg-white/5 p-3 text-gray-200">
                      {session.user?.name || 'Not set'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-violet-300 mb-2">Member Since</label>
                  <div className="w-full rounded-xl border-2 border-white/20 bg-white/5 p-3 text-gray-200">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all font-semibold border border-white/10"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(session.user?.name || '');
                      }}
                      className="px-6 py-3 bg-white/10 text-violet-300 rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-6 px-4 py-3 bg-white/10 text-violet-300 rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Change Password Card */}
            <div className="backdrop-blur-lg bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-3xl border border-white/20">
              <h2 className="text-2xl font-bold text-violet-300 mb-6">Change Password</h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-violet-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-violet-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-violet-400 mt-2">Must be at least 6 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all font-semibold border border-white/10"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          {/* Usage Stats Card */}
          <div className="mt-6 backdrop-blur-lg bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-3xl border border-white/20">
            <h2 className="text-2xl font-bold text-violet-300 mb-6">Usage Statistics</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {session.user?.isPro ? '∞' : '250'}
                </div>
                <div className="text-violet-300 text-sm">Words per Check</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {session.user?.isPro ? 'Unlimited' : 'Basic'}
                </div>
                <div className="text-violet-300 text-sm">Features Access</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  Active
                </div>
                <div className="text-violet-300 text-sm">Account Status</div>
              </div>
            </div>

            {!session.user?.isPro && (
              <div className="mt-6 p-4 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-xl border border-violet-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-violet-200 font-semibold">Upgrade to Pro</p>
                    <p className="text-violet-300 text-sm">Unlock unlimited words and advanced features</p>
                  </div>
                  <button
                    onClick={() => router.push('/pricing')}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all font-semibold border border-white/10 whitespace-nowrap"
                  >
                    View Plans
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
