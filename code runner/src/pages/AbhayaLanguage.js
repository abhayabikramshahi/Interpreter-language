// AbhayaLanguage.js - Core functionality for the Abhaya language interpreter

// Variables available in the Abhaya language environment
const variables = {
  fruits: ["स्याउ", "आँप", "केरा", "लिची"],
  numbers: [1, 2, 3, 4, 5],
  greetings: ["नमस्ते", "नमस्कार", "प्रणाम"]
};

// Custom syntax highlighting for Abhaya language
export const abhayaHighlightLanguage = {
  comment: /(^\/\/.*)$/m,
  string: /"(?:\\.|[^"\\])*"/,
  keyword: /\b(from bana|phirta|garna parxa|natra|ghar ja|chapde|यदि|भए|नत्र|फिर्ता|छाप्नुहोस्|बनाउनुहोस्)\b/,
  function: /\b([a-z][a-zA-Z0-9_]*)\(/,
  commit: /(^#.*)$/m,
};

/**
 * Parse an expression in the Abhaya language
 * @param {string} expr - The expression to parse
 * @returns {string|null} The parsed result or null if invalid
 */
export function parseExpression(expr) {
  expr = expr.trim();

  // If expression is a comment, return null here so parseExpression doesn't handle it
  if (expr.startsWith("//")) return null;

  if (expr.includes("+")) {
    const parts = expr.split("+").map((p) => p.trim());
    let final = "";
    for (const p of parts) {
      if (p.startsWith('"') && p.endsWith('"')) {
        final += p.slice(1, -1);
      } else if (p.includes("[") && p.includes("]")) {
        const [varName, indexPart] = p.split("[");
        const index = indexPart.replace("]", "");
        if (variables[varName]) {
          final += variables[varName][parseInt(index)] ?? "[अमान्य सूचकांक]";
        } else {
          final += p;
        }
      } else if (variables[p]) {
        final += variables[p].toString();
      } else {
        final += p;
      }
    }
    return final;
  }

  if (expr.startsWith('"') && expr.endsWith('"')) {
    return expr.slice(1, -1);
  }

  return null;
}

/**
 * Execute a function block in Abhaya language
 * @param {string[]} lines - Array of code lines to execute
 * @returns {Object} Result of execution with output lines and return value
 */
export function executeFunctionBlock(lines) {
  let inElse = false;
  let result = null;
  let outputLines = [];

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) continue;

    if (line.startsWith("//")) {
      outputLines.push({ type: "comment", content: line });
    } else if (line.startsWith("chapde(") && line.endsWith(")")) {
      const content = line.slice(7, -1);
      const parsed = parseExpression(content);
      if (parsed !== null) {
        outputLines.push({ type: "output", content: parsed });
      } else {
        outputLines.push({ type: "error", content: `अमान्य अभिव्यक्ति: ${content}` });
      }
    } else if (line.startsWith("garna parxa(") && line.endsWith(")")) {
      const content = line.slice(13, -1);
      if (content.startsWith('"') && content.endsWith('"')) {
        outputLines.push({ type: "task", content: content.slice(1, -1) });
      } else {
        outputLines.push({ type: "error", content: "garna parxa() ले स्ट्रिङ लिटरल चाहिन्छ" });
      }
    } else if (line === "natra {" || line === "नत्र {") {
      inElse = true;
    } else if (line === "}") {
      inElse = false;
    } else if (line === "ghar ja" || line === "घर जा") {
      if (inElse) {
        outputLines.push({ type: "task", content: "नत्र ब्लक कार्यान्वयन: घर जा" });
      } else {
        outputLines.push({ type: "warn", content: "चेतावनी: घर जा नत्र ब्लक बाहिर भेटियो" });
      }
    } else if (line.startsWith("phirta ") || line.startsWith("फिर्ता ")) {
      result = line.slice(7).trim();
      outputLines.push({ type: "return", content: result });
    } else {
      outputLines.push({ type: "warn", content: "फंक्शन ब्लकमा अज्ञात लाइन: " + line });
    }
  }

  return { outputLines, result };
}

/**
 * Run Abhaya code and return the output
 * @param {string} code - The Abhaya code to run
 * @param {function} onOutput - Callback function to handle output lines
 * @returns {Array} Array of output lines with type and content
 */
export async function runAbhayaCode(code, onOutput) {
  const lines = code.split("\n");
  let inFunction = false;
  let inRukhaBlock = false;
  let rukhaDelay = 0;
  let functionLines = [];
  let outputLines = [];
  let inHerdaBlock = false;
  let herdaLoopCount = 0;

  // Valid commands that can be used outside functions
  const validCommands = {
    'chapde': 'छाप्नुहोस्',
    'छाप्नुहोस्': 'छाप्नुहोस्',
    'rukha': 'रुख',
    'रुख': 'रुख'
  };

  const emit = (line) => {
    outputLines.push(line);
    if (onOutput) onOutput(line);
  };

  const executeWithDelay = async (delay, funcOutput, result) => {
    emit({ 
      type: "comment", 
      content: `// Waiting for ${delay/1000} seconds... (${new Date().toLocaleTimeString()})` 
    });
    await new Promise(resolve => setTimeout(resolve, delay));
    emit({ 
      type: "comment", 
      content: `// Executing at ${new Date().toLocaleTimeString()}` 
    });
    if (funcOutput && funcOutput.length > 0) {
      for (const line of funcOutput) emit(line);
    }
    if (result) emit({ type: "return", content: result });
  };

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith("//")) {
      emit({ type: "comment", content: line });
      continue;
    }
    if (line.startsWith("#")) {
      emit({ type: "commit", content: line });
      continue;
    }

    // Check for rukha block syntax
    const rukhaMatch = line.match(/^rukha\((\d+)\s*s?\)\s*=>\s*{/i);
    if (rukhaMatch) {
      inRukhaBlock = true;
      rukhaDelay = parseInt(rukhaMatch[1]) * 1000; // Convert to milliseconds
      functionLines = [];
      continue;
    }

    if (line === "};" && inRukhaBlock) {
      inRukhaBlock = false;
      const { outputLines: funcOutput, result } = executeFunctionBlock(functionLines);
      await executeWithDelay(rukhaDelay, funcOutput, result);
      continue;
    }

    // Check for herda (loop) block syntax
    const herdaMatch = line.match(/^herda\(([^)]+)\)\s*=>\s*{/i);
    if (herdaMatch) {
      let loopCountRaw = herdaMatch[1].trim();
      let loopCount = 0;
      if (/^\d+$/.test(loopCountRaw)) {
        loopCount = parseInt(loopCountRaw);
      } else if (variables[loopCountRaw] !== undefined) {
        if (Array.isArray(variables[loopCountRaw])) {
          loopCount = variables[loopCountRaw].length;
        } else if (typeof variables[loopCountRaw] === 'number') {
          loopCount = variables[loopCountRaw];
        } else {
          emit({ type: "error", content: `अमान्य लूप गणना: ${loopCountRaw}` });
          continue;
        }
      } else {
        emit({ type: "error", content: `अमान्य लूप गणना: ${loopCountRaw}` });
        continue;
      }
      inHerdaBlock = true;
      herdaLoopCount = loopCount;
      functionLines = [];
      continue;
    }
    if (line === "};" && inHerdaBlock) {
      inHerdaBlock = false;
      emit({ type: "comment", content: `// Starting loop for ${herdaLoopCount} iterations` });
      for (let i = 0; i < herdaLoopCount; i++) {
        emit({ type: "comment", content: `// Iteration ${i + 1} of ${herdaLoopCount}` });
        const { outputLines: funcOutput, result } = executeFunctionBlock(functionLines);
        if (funcOutput && funcOutput.length > 0) {
          for (const l of funcOutput) emit(l);
        }
        if (result) emit({ type: "return", content: result });
      }
      emit({ type: "comment", content: "// Loop completed" });
      continue;
    }

    if ((line.startsWith("from bana") || line.startsWith("बनाउनुहोस्")) && line.includes("=>") && line.endsWith("{")) {
      inFunction = true;
      functionLines = [];
      continue;
    }

    if (line === "};" && inFunction) {
      inFunction = false;
      const { outputLines: funcOutput, result } = executeFunctionBlock(functionLines);
      if (funcOutput && funcOutput.length > 0) {
        for (const l of funcOutput) emit(l);
      }
      if (result) emit({ type: "return", content: result });
      continue;
    }

    if (inFunction || inRukhaBlock || inHerdaBlock) {
      functionLines.push(line);
      continue;
    }

    // Check if the line starts with a valid command
    const commandMatch = line.match(/^(\w+)\s*\(/);
    if (commandMatch) {
      const command = commandMatch[1];
      if (validCommands[command]) {
        if (line.endsWith(")")) {
          const content = line.slice(command.length + 1, -1);
          // Special handling for rukha command
          if (command === 'rukha' || command === 'रुख') {
            if (content.startsWith('"') && content.endsWith('"')) {
              const message = content.slice(1, -1);
              emit({ type: "error", content: `रुक्नुहोस्: ${message}` });
            } else {
              emit({ type: "error", content: "rukha() ले स्ट्रिङ लिटरल चाहिन्छ" });
            }
            continue;
          }
          const parsed = parseExpression(content);
          if (parsed !== null) {
            emit({ type: "output", content: parsed });
          } else {
            emit({ type: "error", content: `अमान्य अभिव्यक्ति: ${content}. कृपया सही स्ट्रिङ वा वेरिएबल प्रयोग गर्नुहोस्।` });
          }
        } else {
          emit({ type: "error", content: `अमान्य सिन्ट्याक्स: ${command}() ले बन्द कोष्ठक चाहिन्छ।` });
        }
      } else {
        emit({ type: "error", content: `अमान्य आदेश: ${command}. उपलब्ध आदेशहरू: ${Object.keys(validCommands).join(', ')}` });
      }
    } else {
      emit({ type: "error", content: `अमान्य सिन्ट्याक्स: ${line}. कृपया सही आदेश प्रयोग गर्नुहोस्।` });
    }
  }

  // If no output was generated, add a default message
  if (outputLines.length === 0) {
    emit({ type: "comment", content: "//No output generated" });
  }

  return outputLines;
}

// Export variables for use in other modules
export { variables };