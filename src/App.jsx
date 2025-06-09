import React from "react";
import { motion } from "framer-motion";
import "./App.css"; 

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 starfield" />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 text-center space-y-8">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Abhaya Language
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          🚧 We’re crafting something insane for devs, dreamers & rebels. Stay tuned. 🚀
        </motion.p>

        <motion.a
          href="https://github.com/abhayabikramshahi/Interpreter-language"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-black text-white rounded-full text-lg shadow-xl transition-all hover:shadow-2xl"
        >
          💻 Contribute on GitHub
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pt-6"
        >
          <p className="text-sm glitch font-mono">Developed by @Abhaya , @Ashish 🛠️</p>
        </motion.div>

        <p className="absolute bottom-4 text-xs text-gray-400">Made with 🧠 + ☕</p>
      </div>
    </div>
  );
};

export default App;
