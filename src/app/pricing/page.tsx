import Navigation from '@/components/Navigation';

export default function PricingPage(){
  return (
    <div className="min-h-screen flex flex-col">
        <Navigation/> { }
            <section className="bg-gray-50 py-20" id="pricing">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Simple, Transparent Pricing
    </h2>
    <p className="mt-4 text-lg text-gray-600">
      Choose the plan that fits your needs. Upgrade anytime.
    </p>

    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Free Plan */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-900">Free</h3>
        <p className="mt-4 text-sm text-gray-600">For quick checks and trials</p>
        <p className="mt-6 text-4xl font-bold text-gray-900">$0 
          <span className="text-lg font-medium text-gray-500">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
          <li>✔ 250 words per check</li>
          <li>✔ AI Detection only</li>
          <li>✔ Basic copy option</li>
          <li className="line-through text-gray-400">❌ Humanization</li>
        </ul>
        <a href="#" className="mt-8 block rounded-xl bg-gray-900 px-6 py-3 text-center text-white font-semibold hover:bg-gray-800 transition">
          Get Started
        </a>
      </div>

      {/* Pro Plan (Most Popular) */}
      <div className="relative flex flex-col rounded-2xl border-2 border-indigo-600 bg-white shadow-lg p-8">
        {/* Ribbon */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Most Popular
        </span>
        <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
        <p className="mt-4 text-sm text-gray-600">Best for professionals</p>
        <p className="mt-6 text-4xl font-bold text-gray-900">$19 
          <span className="text-lg font-medium text-gray-500">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
          <li>✔ Unlimited words</li>
          <li>✔ AI Detection + Humanization</li>
          <li>✔ Copy & Download options</li>
          <li>✔ Export reports (PDF)</li>
        </ul>
        <a href="#" className="mt-8 block rounded-xl bg-indigo-600 px-6 py-3 text-center text-white font-semibold hover:bg-indigo-500 transition">
          Upgrade to Pro
        </a>
      </div>

      {/* Enterprise Plan */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
        <p className="mt-4 text-sm text-gray-600">For teams & organizations</p>
        <p className="mt-6 text-4xl font-bold text-gray-900">$49 
          <span className="text-lg font-medium text-gray-500">/month</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
          <li>✔ Everything in Pro</li>
          <li>✔ Team accounts</li>
          <li>✔ API access</li>
          <li>✔ Dedicated support</li>
        </ul>
        <a href="#" className="mt-8 block rounded-xl bg-gray-900 px-6 py-3 text-center text-white font-semibold hover:bg-gray-800 transition">
          Contact Sales
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  );
  }
    


