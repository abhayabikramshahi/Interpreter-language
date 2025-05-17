import React from "react";
import { FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero / Landing Section */}
      <section className="flex flex-col md:flex-row flex-grow items-center bg-white max-w-7xl mx-auto mt-10 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Text content */}
        <div className="md:w-1/2 px-8 md:px-16 py-20 text-center md:text-left">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
            Welcome to the Future of Nepali Programming
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight break-words">
            AbhayaCDZRUNNER
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl">
            A revolutionary Nepali programming language designed to make coding accessible and intuitive for everyone.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-blue-600 font-semibold">Web Developer at Badimalika</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-blue-600 font-semibold">App Developer at Sagasb</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/runner"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Try Abhaya Language
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#companies"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border border-blue-200 shadow-sm hover:shadow-md"
            >
              Our Companies
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto px-3 py-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Coding Hero"
              className="object-cover w-full h-full rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="max-w-7xl mx-auto px-6 md:px-12 py-20 mt-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Our Companies
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leading the way in technology innovation and digital transformation across Nepal
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Cards */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaCode className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Abhaya Infoys Digital Yak Labs
            </h4>
            <p className="text-gray-600 mb-6">Leading digital innovation and technology solutions</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Owner & Founder</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaLaptopCode className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Abhaya Solutions
            </h4>
            <p className="text-gray-600 mb-6">Custom software development and IT consulting</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Owner & Founder</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaRocket className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Nepal Coding House Private Limited
            </h4>
            <p className="text-gray-600 mb-6">Empowering developers through education and innovation</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Owner & Founder</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaCode className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Create Craters Group of Company
            </h4>
            <p className="text-gray-600 mb-6">Diversified business solutions and enterprise development</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Owner & Founder</span>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center mt-12">
          <a
            href="/companies"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Read More About Our Companies
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 mt-12 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Abhaya Language?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of programming in your native language
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaCode className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Nepali Syntax</h4>
            <p className="text-gray-600">Write code in familiar Nepali language constructs with modern programming features</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaLaptopCode className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Easy to Learn</h4>
            <p className="text-gray-600">Intuitive syntax designed for both beginners and experienced developers</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <FaRocket className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Modern Features</h4>
            <p className="text-gray-600">Support for modern programming concepts, patterns, and best practices</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
