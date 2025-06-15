import React from "react";
import { FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Hero / Landing Section */}
      <section className="flex flex-col md:flex-row flex-grow items-center bg-black max-w-7xl mx-auto mt-10 rounded-2xl overflow-hidden border border-gray-900">
        {/* Text content */}
        <div className="md:w-1/2 px-8 md:px-16 py-20 text-center md:text-left">
          <div className="inline-block px-4 py-2 bg-black text-blue-400 rounded-full text-sm font-semibold mb-6 border border-gray-700">
            Welcome to the Future of Nepali Programming
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight break-words">
            Abhaya Language
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
            A revolutionary Nepali programming language designed to make coding accessible and intuitive for everyone.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-blue-400 font-semibold">Simple. Intuitive. Powerful.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-blue-400 font-semibold">Made for Nepali learners and developers</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/runner"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-semibold border border-gray-700 hover:border-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Try Abhaya Language
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto px-3 py-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Coding Hero"
              className="object-cover w-full h-full rounded-2xl border-4 border-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 mt-12 bg-black rounded-2xl">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Why Choose Abhaya Language?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the power of programming in your native language
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-black p-8 rounded-2xl border border-gray-800">
            <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-700">
              <FaCode className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Nepali Syntax</h4>
            <p className="text-gray-300">Write code in familiar Nepali language constructs with modern programming features.</p>
          </div>

          <div className="bg-black p-8 rounded-2xl border border-gray-800">
            <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-700">
              <FaLaptopCode className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Easy to Learn</h4>
            <p className="text-gray-300">Intuitive syntax designed for both beginners and experienced developers.</p>
          </div>

          <div className="bg-black p-8 rounded-2xl border border-gray-800">
            <div className="h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-700">
              <FaRocket className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Modern Features</h4>
            <p className="text-gray-300">Support for modern programming concepts, patterns, and best practices.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
