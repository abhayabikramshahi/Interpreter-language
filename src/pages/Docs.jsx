import React from 'react';

function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 flex justify-center">
      <div className="max-w-3xl w-full bg-white/80 rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Abhaya Language Documentation</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome to the official documentation for the Abhaya programming language. Here you will find syntax, examples, and usage guidelines.</p>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Basic Syntax</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">// comment</span> — Single-line comment</li>
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">from bana =&gt; {'{ ... }'};</span> — Function definition</li>
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">chapde("text")</span> — Print statement</li>
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">phirta "value"</span> — Return statement</li>
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">herda(n) {'{ ... }'};</span> — Loop n times</li>
            <li><span className="font-mono bg-blue-50 px-2 py-1 rounded">garna parxa, natra, ghar ja, rukha</span> — Conditional/keywords (highlighted, not implemented in mock)</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Example</h2>
          <pre className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto text-sm mb-2">
{`// This is a comment
from bana => {
  chapde("Hello world")
  phirta "Success"
};

herda(3) {
  chapde("Looping!")
};`}
          </pre>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">How to Run</h2>
          <ol className="list-decimal pl-6 text-gray-800 space-y-2">
            <li>Go to the <span className="font-semibold text-blue-700">Code Runner</span> page.</li>
            <li>Write your Abhaya code in the editor.</li>
            <li>Click <span className="font-semibold text-blue-700">Run</span> to see the output.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">More Resources</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Visit the <span className="font-semibold text-blue-700">About</span> page to learn more about Abhaya Language.</li>
            <li>Check the <span className="font-semibold text-blue-700">Contact</span> page for support or feedback.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Docs;