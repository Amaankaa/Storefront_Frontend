import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden flex flex-col">
      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-yellow-400 opacity-10 rounded-full filter blur-3xl animate-spin-slow z-0" style={{transform: 'translate(-50%, -50%)'}} />

      {/* Glassmorphism Hero Card */}
      <header className="relative z-10 flex flex-col items-center justify-center flex-1 py-24 px-6 md:px-0">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col items-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg mb-6 leading-tight">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500">Storefront</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 text-center mb-8 max-w-xl">
            Discover the best products, exclusive deals, and a seamless shopping experience. Elevate your lifestyle with our curated collection.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <Link to="/products" className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg text-lg hover:from-yellow-300 hover:to-indigo-400 transition-all text-center">
              Shop Now
            </Link>
            <Link to="/auth" className="w-full md:w-auto px-8 py-4 bg-white/20 border border-white/30 text-white font-bold rounded-xl shadow-lg text-lg hover:bg-white/40 hover:text-indigo-900 transition-all text-center">
              Sign In / Register
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 mt-16 mb-24 px-6 md:px-0 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <svg className="w-14 h-14 mb-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M18.72 5.28l1.06-1.06M7.5 12a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" /></svg>
            <h3 className="text-xl font-bold text-white mb-2">Curated Selection</h3>
            <p className="text-gray-200 text-center">Handpicked products from top brands, ensuring quality and style for every taste.</p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <svg className="w-14 h-14 mb-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 2.25 3 5 3 5s3-2.75 3-5c0-1.657-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" /></svg>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Fast</h3>
            <p className="text-gray-200 text-center">Shop with confidence. Fast checkout, secure payments, and encrypted data protection.</p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center shadow-xl hover:scale-105 transition-transform">
            <svg className="w-14 h-14 mb-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01" /></svg>
            <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-200 text-center">Our team is here for you anytime. Enjoy hassle-free shopping and quick help.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 mb-24 px-6 md:px-0 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10 drop-shadow-lg">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" className="w-16 h-16 rounded-full mb-4 border-4 border-pink-400 shadow-lg" />
            <p className="text-gray-200 text-center mb-2">“Absolutely love the variety and quality. The checkout was a breeze and support is top-notch!”</p>
            <span className="text-pink-300 font-semibold">— Sarah M.</span>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-16 h-16 rounded-full mb-4 border-4 border-indigo-400 shadow-lg" />
            <p className="text-gray-200 text-center mb-2">“Storefront makes shopping fun and easy. I found everything I needed and more!”</p>
            <span className="text-indigo-300 font-semibold">— James L.</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="relative z-10 mb-12 flex flex-col items-center">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl px-8 py-8 flex flex-col items-center max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Ready to elevate your shopping?</h3>
          <Link to="/products" className="px-10 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg text-lg hover:from-yellow-300 hover:to-indigo-400 transition-all">
            Start Shopping
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage; 