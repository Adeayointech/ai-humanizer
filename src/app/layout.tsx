// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// Import the Providers component
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phrasit - AI Text Paraphraser',
  description: 'Detect and paraphrase AI-generated text into natural, human-like content with Phrasit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children with SessionProvider */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}