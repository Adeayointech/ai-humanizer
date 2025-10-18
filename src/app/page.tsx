import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 border-b">
        <h1 className="text-xl font-bold">AI Humanizer</h1>
        <nav className="space-x-6">
          <Link href="/features" className="text-gray-600 hover:text-black">Features</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-black">Pricing</Link>
          <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center p-12">
        <h2 className="text-4xl font-bold mb-4">Check AI. Humanize AI. Sound Human.</h2>
        <p className="text-gray-600 mb-6 max-w-lg">
          Paste your text and let AI Humanizer detect AI content and transform it into natural, human-like writing.
        </p>
        <Link href="/free-trial" className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:opacity-80">
          Try Free (250 words)
        </Link>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Humanizer. All rights reserved.
      </footer>
    </div>
  );
}