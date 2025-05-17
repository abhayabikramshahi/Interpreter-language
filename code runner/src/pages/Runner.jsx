import React, { useState, useEffect, useCallback } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mock Abhaya language functionality (for demonstration in a web-only environment)
const mockAbhayaOutput = (code) => {
  const output = [];
  const lines = code.split('\n');

  const mockPrint = (text) => {
    output.push({ type: 'output', content: text });
  };

  const mockFunction = (name, body) => {
    // Very basic function simulation
    if (name === 'bana') {
      //  mock execution of the function body
      const bodyLines = body.trim().split('\n');
      bodyLines.forEach(line => {
        if (line.includes('chapde')) {
          const textToPrint = line.match(/chapde\("(.+)"\)/)?.[1];
          if (textToPrint) {
            mockPrint(textToPrint);
          }
        } else if (line.includes('phirta')) {
          const returnValue = line.match(/phirta\s+"(.+)"/)?.[1];
          if (returnValue) {
            output.push({ type: 'return', content: `Returned: ${returnValue}` });
          }
        }
      });
    }
  };

  const processHerdaLoop = (loopCount, body) => {
    output.push({ type: 'comment', content: `// Starting loop for ${loopCount} iterations` });
    for (let i = 0; i < loopCount; i++) {
      output.push({ type: 'comment', content: `// Iteration ${i + 1} of ${loopCount}` });
      const bodyLines = body.trim().split('\n');
      bodyLines.forEach(line => {
        if (line.includes('chapde')) {
          const textToPrint = line.match(/chapde\("(.+)"\)/)?.[1];
          if (textToPrint) {
            mockPrint(textToPrint);
          }
        }
      });
    }
    output.push({ type: 'comment', content: '// Loop completed' });
  };

  lines.forEach(line => {
    if (line.trim().startsWith('//')) {
      output.push({ type: 'comment', content: line });
    } else if (line.startsWith('from bana')) {
      const functionName = 'bana'; // Hardcoded for this mock
      const functionBody = lines.slice(lines.indexOf(line) + 1, lines.lastIndexOf('};')).join('\n');
      mockFunction(functionName, functionBody);
    } else if (line.startsWith('herda(')) {
      const loopCountMatch = line.match(/herda\((\d+)\)/);
      if (loopCountMatch) {
        const loopCount = parseInt(loopCountMatch[1]);
        const loopBody = lines.slice(lines.indexOf(line) + 1, lines.lastIndexOf('};')).join('\n');
        processHerdaLoop(loopCount, loopBody);
      }
    } else if (line.includes('chapde')) {
      const textToPrint = line.match(/chapde\("(.+)"\)/)?.[1];
      if (textToPrint) {
        mockPrint(textToPrint);
      }
    } else if (line.includes('phirta')) {
      const returnValue = line.match(/phirta\s+"(.+)"/)?.[1];
      if (returnValue) {
        output.push({ type: 'return', content: `Returned: ${returnValue}` });
      }
    }
  });

  if (output.length === 0) {
    output.push({ type: 'comment', content: '//No output generated' });
  }
  return output;
};

// Mock highlighting
const abhayaHighlightLanguage = (code) => {
  //  basic keyword highlighting
  const keywords = ['from bana', 'phirta', 'garna parxa', 'natra', 'ghar ja', 'chapde', 'rukha'];
  let highlightedCode = code;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'g');
    highlightedCode = highlightedCode.replace(regex, `<span style="color:#569CD6">${keyword}</span>`);
  });
  return highlightedCode;
};

const runAbhayaCode = async (code, onOutput) => {
  const mockOutput = mockAbhayaOutput(code);

  // Simulate streaming output
  for (const line of mockOutput) {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
    onOutput(line);
  }
};

export default function RunnerPage() {
  const [code, setCode] = useState(
    `// This is a sample Abhaya code\nfrom bana => {\n\tchapde("Hello world")\n\tphirta "Success"\n};`
  );
  const [output, setOutput] = useState([
    { type: "comment", content: "//This function made by Abhaya bikram shahi and so enjoy the complier and feel profesional with nepali coding language .. Namaskar" },
  ]);
  const [fileName, setFileName] = useState(".abhaya");
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (isRunning) return; // Prevent multiple runs
    setIsRunning(true);
    setIsLoading(true);
    try {
      setOutput([]); // Clear output before running
      // Initial loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Stream output as it arrives
      await runAbhayaCode(code, (line) => {
        setOutput(prev => [...prev, line]);
      });
    } catch (error) {
      setOutput([{ type: "error", content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput([{ type: "comment", content: "//This function made by Abhaya bikram shahi and so enjoy the complier and feel profesional with nepali coding language .. Namaskar" }]);
  };

  const handleKeyDown = (e) => {
    // Handle Ctrl + / for comments
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = code.substring(start, end);
      const lines = selectedText.split('\n');

      // Check if all selected lines are already commented
      const allCommented = lines.every(line => line.trim().startsWith('//'));

      let newText;
      if (allCommented) {
        // Uncomment
        newText = lines.map(line => line.replace(/^\/\/\s?/, '')).join('\n');
      } else {
        // Comment
        newText = lines.map(line => line.trim() ? `// ${line}` : line).join('\n');
      }

      const newCode = code.substring(0, start) + newText + code.substring(end);
      setCode(newCode);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-full font-sans flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Abhaya Runner</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filename"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRun}
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold flex-grow md:flex-grow-0 flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running...
                </>
              ) : (
                'Run'
              )}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md font-semibold flex-grow md:flex-grow-0"
            >
              Clear
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-grow gap-4 md:gap-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 text-white p-2 rounded-t-md font-medium flex justify-between items-center">
            <span>Code Editor</span>
            <span className="text-xs text-gray-400">{fileName}</span>
          </div>
          <div className="flex-grow relative">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                height: '100%',
                minHeight: '500px',
                borderRadius: '0 0 0.375rem 0.375rem',
                fontSize: '0.9rem',
                overflow: 'auto',
                backgroundColor: '#1E1E1E',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                lineHeight: '1.5'
              }}
              wrapLines={true}
              showLineNumbers={true}
              lineNumberStyle={{
                color: '#858585',
                marginRight: '1rem',
                userSelect: 'none',
                minWidth: '3em',
                textAlign: 'right'
              }}
              lineProps={lineData => {
                const line = String(lineData || '');
                for (const keyword of ['from bana', 'phirta', 'garna parxa', 'natra', 'ghar ja', 'chapde', 'rukha', 'herda']) {
                  if (line.includes(keyword)) {
                    return { style: { display: 'block', color: '#569CD6' } };
                  }
                }
                return { style: { display: 'block' } };
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                  lineHeight: '1.5'
                }
              }}
            >
              {code}
            </SyntaxHighlighter>
            <textarea
              className="absolute inset-0 w-full h-full resize-none font-mono"
              spellCheck={false}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your Abhaya code here..."
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                color: 'transparent',
                caretColor: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                padding: '1rem 1rem 1rem 4.5rem',
                zIndex: 2,
                tabSize: 2,
                whiteSpace: 'pre',
                overflow: 'auto'
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 text-white p-2 rounded-t-md font-medium">
            <span>Output</span>
          </div>
          <div
            className="flex-grow bg-gray-50 border border-gray-300 rounded-b-md overflow-auto p-4 font-mono whitespace-pre-wrap min-h-[500px]"
            aria-label="Output"
          >
            {output.map(({ type, content }, i) => {
              let style = {};

              if (type === "comment") {
                style = { color: "#6b7280", fontStyle: "italic" };
              } else if (type === "error") {
                style = { color: "#dc2626", fontWeight: "bold" };
              } else if (type === "warn") {
                style = { color: "#b45309", fontWeight: "bold" };
              } else if (type === "task") {
                style = { color: "#2563eb" };
              } else if (type === "return") {
                style = { color: "#047857", fontWeight: "bold" };
              } else if (type === "output") {
                style = { color: "#111827" };
              }

              return (
                <div key={i} style={style}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <div className="md:hidden mt-8 text-center text-gray-700 font-semibold">
        Runner is not optimized for mobile. Please visit on a desktop for full experience.
      </div>
    </div>
  );
}

