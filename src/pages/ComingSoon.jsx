import React from 'react';

const ComingSoon = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-blue-400 px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Abhaya Lang</h1>
            <p className="text-lg md:text-2xl mb-6 max-w-2xl text-blue-200">
                A modern, blazing-fast programming language designed for clarity, concurrency, and creativity.
            </p>

            <div className="bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl p-6 max-w-2xl w-full mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-300">Why Abhay Lang?</h2>
                <ul className="text-left text-blue-400/90 space-y-2">
                    <li>⚡ Lightning-fast compiler with built-in AI optimizations</li>
                    <li>🔒 Safe by design — no nulls, no race conditions</li>
                    <li>🧠 Smart syntax that feels intuitive and expressive</li>
                    <li>🌐 Cross-platform runtime powered by Python</li>
                    <li>🔁 Native support for reactive and async-first paradigms</li>
                </ul>
            </div>

            <div className="relative w-48 h-1 bg-blue-900/30 overflow-hidden rounded-full mb-6">
                <div className="absolute h-full w-1/2 bg-blue-600 animate-pulse left-0"></div>
            </div>

            <p className="text-sm md:text-base text-blue-300/70 mb-6">
                Launching Q3 2025. Open-source. Backed by the community.
            </p>

            <button className="px-6 py-2 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition">
                Notify Me
            </button>
        </div>
    );
};

export default ComingSoon;
