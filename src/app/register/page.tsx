// app/register/page.tsx
'use client';

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        // Registration successful, redirect to login
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
      <Navigation />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-3xl bg-white/10 backdrop-blur-2xl p-8 shadow-3xl border border-white/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">Create Account</h1>
          <p className="text-violet-200 text-sm">Join Phrasit today</p>
        </div>
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/40 rounded-lg backdrop-blur-sm">
            <p className="text-red-200 text-sm text-center">{error}</p>
          </div>
        )}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-violet-200 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-200 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-200 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-3 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/50 transition-all text-white placeholder-violet-300/60"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-white font-semibold disabled:opacity-50 hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-white/10"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
        <p className="text-center text-violet-300">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
}