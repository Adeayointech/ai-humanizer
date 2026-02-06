import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 border-b border-violet-500/40 bg-violet-900/60 backdrop-blur-lg shadow-xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">Phrasit</h1>
        <nav className="space-x-6">
          <Link href="/features" className="text-violet-300 hover:text-violet-200 transition-colors">Features</Link>
          <Link href="/pricing" className="text-violet-300 hover:text-violet-200 transition-colors">Pricing</Link>
          <Link href="/login" className="text-violet-300 hover:text-violet-200 transition-colors">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 shadow-lg transition-all">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">Transform AI Text Into Human Excellence</h2>
        <p className="text-violet-300 text-lg mb-6 max-w-2xl leading-relaxed drop-shadow-lg">
          Detect AI-generated content and paraphrase it into natural, authentic writing that resonates with your audience.
        </p>
        <Link href="/free-trial" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-base font-semibold hover:from-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-2xl hover:shadow-3xl border border-violet-500/50">
          🚀 Try Free (250 words)
        </Link>
        <p className="text-sm text-violet-400 mt-3">No credit card required</p>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-violet-500/40 text-center bg-violet-900/60 backdrop-blur-lg">
        <p className="text-violet-300 font-medium">© {new Date().getFullYear()} Phrasit. All rights reserved.</p>
        <p className="text-violet-400 text-sm mt-1">Crafting human excellence with AI</p>
      </footer>
    </div>
  );
}