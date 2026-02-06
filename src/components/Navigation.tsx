// src/components/Navigation.tsx
'use client'; // This must be a client component to use hooks

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center p-6 border-b border-violet-500/40 bg-violet-900/60 backdrop-blur-lg shadow-xl">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-indigo-300 transition-all drop-shadow-lg">
        Phrasit
      </Link>
      <nav className="space-x-6 flex items-center">
        {status === 'loading' ? (
          // Show nothing or a loading skeleton while checking auth state
          <></>
        ) : session ? (
          // User is logged IN - Show Logout
          <>
            <Link href="/free-trial" className="text-violet-300 hover:text-violet-200 font-medium transition-colors">
              Free Trial
            </Link>
            <Link href="/profile" className="text-violet-300 hover:text-violet-200 font-medium transition-colors">
              Profile
            </Link>
            <Link href="/pricing" className="text-violet-300 hover:text-violet-200 font-medium transition-colors">
              Pricing
            </Link>
            <button
              onClick={() => signOut()}
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10"
            >
              Logout
            </button>
          </>
        ) : (
          // User is logged OUT - Show Login/Signup
          <>
            <Link href="/pricing" className="text-violet-300 hover:text-violet-200 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-violet-300 hover:text-violet-200 font-medium transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 border border-white/10">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}