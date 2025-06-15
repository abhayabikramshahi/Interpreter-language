import React from "react";

function About() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-3xl space-y-12 text-center">
        <section>
          <h1 className="text-5xl font-extrabold text-blue-500 mb-6 tracking-tight">
            About Abhaya Language
          </h1>
          <p className="text-lg leading-relaxed text-gray-300">
            Abhaya Language is a forward-thinking programming language designed to
            empower developers with simplicity and power. Inspired by clarity and
            innovation, it aims to make coding accessible, enjoyable, and efficient.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-blue-500 mb-4 tracking-wide">
            Why Choose Abhaya?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-400 text-left max-w-xl mx-auto">
            <li>Simple syntax that’s easy to learn and remember.</li>
            <li>Powerful tools and features tailored for modern development.</li>
            <li>Fast compilation and efficient performance.</li>
            <li>Strong community support and rich documentation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-blue-500 mb-4 tracking-wide">
            Get Involved
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 max-w-xl mx-auto mb-4">
            We’re all about building a thriving community. Whether you’re a beginner,
            enthusiast, or pro developer, you’re welcome here!
          </p>
          <p className="max-w-xl mx-auto">
            Check out our{" "}
            <a
              href="/docs"
              className="text-blue-400 underline hover:text-blue-600 transition-colors duration-200"
            >
              documentation
            </a>
            , join discussions, or contribute to making Abhaya Language the next big
            thing in coding.
          </p>
        </section>
      </div>
    </main>
  );
}

export default About;
