// src/components/Navigation.tsx
'use client'; // This must be a client component to use hooks

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-violet-500/40 bg-violet-900/60 backdrop-blur-lg shadow-xl">
      <div className="flex justify-between items-center p-4 md:p-6">
        <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent hover:from-violet-300 hover:to-indigo-300 transition-all drop-shadow-lg">
          Phrasit
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-violet-300 hover:text-violet-200 p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-6 items-center">
          {status === 'loading' ? (
            <></>
          ) : session ? (
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
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-violet-500/40 bg-violet-900/80 backdrop-blur-lg">
          <div className="flex flex-col space-y-2 p-4">
            {status === 'loading' ? (
              <></>
            ) : session ? (
              <>
                <Link
                  href="/free-trial"
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-violet-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Free Trial
                </Link>
                <Link
                  href="/profile"
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-violet-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/pricing"
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-violet-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 font-semibold transition-all shadow-md border border-white/10 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-violet-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className="text-violet-300 hover:text-violet-200 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-violet-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 font-semibold transition-all shadow-md border border-white/10 text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}