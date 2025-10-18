// src/components/Navigation.tsx
'use client'; // This must be a client component to use hooks

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center p-6 border-b">
      <Link href="/" className="text-xl font-bold">
        AI Humanizer
      </Link>
      <nav className="space-x-6">
        {status === 'loading' ? (
          // Show nothing or a loading skeleton while checking auth state
          <></>
        ) : session ? (
          // User is logged IN - Show Logout
          <>
            <Link href="/free-trial" className="text-gray-600 hover:text-black">
              Free Trial
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-black">
              Pricing
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80"
            >
              Logout
            </button>
          </>
        ) : (
          // User is logged OUT - Show Login/Signup
          <>
            <Link href="/pricing" className="text-gray-600 hover:text-black">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}