import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import logo from "../assets/logo.png"; // 🖼️ Your logo path

const sidebarLinks = [
  { label: "Introduction", id: "intro" },
  { label: "Basic Syntax", id: "basic-syntax" },
  { label: "Example", id: "example" },
  { label: "How to Run", id: "how-to-run" },
  { label: "More Resources", id: "more-resources" },
];

function Docs() {
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let current = "intro";
      for (const link of sidebarLinks) {
        const elem = document.getElementById(link.id);
        if (elem && elem.offsetTop <= scrollPosition) {
          current = link.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0f1117] border-r border-gray-800 sticky top-[90px] h-[calc(100vh-90px)] p-6 shadow-inner z-10">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl" />
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Abhaya</h2>
            <p className="text-xs text-gray-400 -mt-1">Docs</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Learn the syntax, explore examples, and start building in Abhaya language.
        </p>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                setActiveId(id);
              }}
              className={`relative px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                ${
                  activeId === id
                    ? "bg-blue-600 text-white pl-6 shadow-sm before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-white rounded-l-md"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-16 py-14 max-w-5xl mx-auto overflow-y-auto scroll-smooth">
        {/* Introduction */}
        <section id="intro" className="mb-20 scroll-mt-24">
          <h1 className="text-5xl font-extrabold text-blue-400 mb-5 tracking-tight">
            Abhaya Language Documentation
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Welcome to the official documentation for the Abhaya programming
            language. Here you will find syntax, examples, and usage guidelines.
          </p>
        </section>

        {/* Basic Syntax */}
        <section id="basic-syntax" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-semibold text-blue-400 mb-5 tracking-wide">
            Basic Syntax
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg max-w-3xl">
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">// comment</code> — Single-line comment</li>
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">from bana =&gt; {'{ ... }'};</code> — Function definition</li>
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">chapde("text")</code> — Print statement</li>
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">phirta "value"</code> — Return statement</li>
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">herda(n) {'{ ... }'};</code> — Loop n times</li>
            <li><code className="bg-gray-800 px-3 py-1 rounded font-mono text-blue-300">garna parxa, natra, ghar ja, rukha</code> — Conditionals</li>
          </ul>
        </section>

        {/* Example */}
        <section id="example" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-semibold text-blue-400 mb-5 tracking-wide">Example</h2>
          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-sm overflow-x-auto font-mono leading-relaxed text-green-400 max-w-3xl">
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

        {/* How to Run */}
        <section id="how-to-run" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-semibold text-blue-400 mb-5 tracking-wide">
            How to Run
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300 text-lg max-w-3xl">
            <li>Go to the <span className="text-blue-400 font-semibold">Code Runner</span> page.</li>
            <li>Write your Abhaya code in the editor.</li>
            <li>Click <span className="text-blue-400 font-semibold">Run</span> to see the output.</li>
          </ol>
        </section>

        {/* More Resources */}
        <section id="more-resources" className="scroll-mt-24 max-w-3xl">
          <h2 className="text-4xl font-semibold text-blue-400 mb-5 tracking-wide">
            More Resources
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-300 text-lg">
            <li>Visit the <span className="text-blue-400 font-semibold">About</span> page to learn more about Abhaya Language.</li>
            <li>Check the <span className="text-blue-400 font-semibold">Contact</span> page for support or feedback.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Docs;
