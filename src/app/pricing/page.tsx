import Navigation from '@/components/Navigation';

export default function PricingPage(){
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
        <Navigation/>
            <section className="py-8 sm:py-12" id="pricing">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="mb-4 sm:mb-6">
      <span className="text-4xl sm:text-5xl">💎</span>
    </div>
    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
      Simple, Transparent Pricing
    </h2>
    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-violet-300 max-w-2xl mx-auto drop-shadow-md px-4">
      Choose the plan that fits your needs. Upgrade anytime.
    </p>

    <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Free Plan */}
      <div className="flex flex-col rounded-3xl border-2 border-violet-500/40 bg-gradient-to-br from-violet-900/70 to-indigo-900/70 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 transform hover:scale-105">
        <h3 className="text-xl sm:text-2xl font-bold text-violet-200">Free Trial</h3>
        <p className="mt-3 text-sm text-violet-300">For quick checks and trials</p>
        <p className="mt-4 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">$0 
          <span className="text-base sm:text-lg font-medium text-violet-400">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-violet-300 text-left flex-1">
          <li className="flex items-start gap-3"><span className="text-green-400 text-lg">✓</span> 250 words per check</li>
          <li className="flex items-start gap-3"><span className="text-green-400 text-lg">✓</span> AI Detection only</li>
          <li className="flex items-start gap-3"><span className="text-green-400 text-lg">✓</span> Basic copy option</li>
          <li className="flex items-start gap-3 opacity-50"><span className="text-violet-400 text-lg">✗</span> Humanization</li>
        </ul>
        <a href="/free-trial" className="mt-6 block rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-center text-white text-sm sm:text-base font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 border border-violet-400/30">
          Get Started Free
        </a>
      </div>

      {/* Pro Plan (Most Popular) */}
      <div className="relative flex flex-col rounded-3xl border-4 border-violet-500/60 bg-gradient-to-br from-violet-800/80 to-indigo-800/80 backdrop-blur-lg shadow-3xl p-6 transform sm:scale-105 sm:hover:scale-110 transition-all duration-300">
        {/* Ribbon */}
        <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-lg border border-violet-400 whitespace-nowrap">
          ⭐ Most Popular
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-violet-100">Pro</h3>
        <p className="mt-3 text-sm text-violet-200">Best for professionals</p>
        <p className="mt-4 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">$19 
          <span className="text-base sm:text-lg font-medium text-violet-400">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-violet-200 text-left flex-1">
          <li className="flex items-start gap-3"><span className="text-violet-300 text-lg">✓</span> Unlimited words</li>
          <li className="flex items-start gap-3"><span className="text-violet-300 text-lg">✓</span> AI Detection + Humanization</li>
          <li className="flex items-start gap-3"><span className="text-violet-300 text-lg">✓</span> Copy & Download options</li>
          <li className="flex items-start gap-3"><span className="text-violet-300 text-lg">✓</span> Export reports (PDF)</li>
        </ul>
        <a href="#" className="mt-6 block rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-center text-white text-sm sm:text-base font-bold hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 border border-violet-300/50">
          Upgrade to Pro ✨
        </a>
      </div>

      {/* Enterprise Plan */}
      <div className="flex flex-col rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 transform hover:scale-105">
        <h3 className="text-xl sm:text-2xl font-bold text-indigo-200">Enterprise</h3>
        <p className="mt-3 text-sm text-indigo-300">For teams & organizations</p>
        <p className="mt-4 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">$49 
          <span className="text-base sm:text-lg font-medium text-indigo-400">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-indigo-300 text-left flex-1">
          <li className="flex items-start gap-3"><span className="text-indigo-300 text-lg">✓</span> Everything in Pro</li>
          <li className="flex items-start gap-3"><span className="text-indigo-300 text-lg">✓</span> Team accounts</li>
          <li className="flex items-start gap-3"><span className="text-indigo-300 text-lg">✓</span> API access</li>
          <li className="flex items-start gap-3"><span className="text-indigo-300 text-lg">✓</span> Dedicated support</li>
        </ul>
        <a href="#" className="mt-6 block rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-center text-white text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 border border-indigo-400/30">
    </div>
  );
  }
    


