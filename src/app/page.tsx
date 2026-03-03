import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
      {/* Navbar */}
      <Navigation />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl px-4">
          Transform AI Text Into Human Excellence
        </h2>
        <p className="text-violet-300 text-base sm:text-lg mb-6 max-w-2xl leading-relaxed drop-shadow-lg px-4">
          Detect AI-generated content and paraphrase it into natural, authentic writing that resonates with your audience.
        </p>
        <Link href="/free-trial" className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-2xl hover:shadow-3xl border border-violet-500/50">
          🚀 Try Free (250 words)
        </Link>
        <p className="text-xs sm:text-sm text-violet-400 mt-3">No credit card required</p>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-violet-500/40 text-center bg-violet-900/60 backdrop-blur-lg">
        <p className="text-violet-300 font-medium text-sm sm:text-base">© {new Date().getFullYear()} Phrasit. All rights reserved.</p>
        <p className="text-violet-400 text-xs sm:text-sm mt-1">Crafting human excellence with AI</p>
      </footer>
    </div>
  );
}