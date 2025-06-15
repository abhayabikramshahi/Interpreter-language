import React, { useState, useEffect, useCallback } from "react";

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
      // mock execution of the function body
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
  // basic keyword highlighting
  const keywords = ['from bana', 'phirta', 'garna parxa', 'natra', 'ghar ja', 'chapde', 'rukha', 'herda'];
  let highlightedCode = code;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword.replace(/ /g, '\\s+')}\\b`, 'g');
    highlightedCode = highlightedCode.replace(regex, `<span style="color:#569CD6">${keyword}</span>`);
  });
  // Highlight comments
  highlightedCode = highlightedCode.replace(/(\/\/.*)/g, `<span style="color:#6b7280;font-style:italic">$1</span>`);
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
  const [fileName, setFileName] = useState("main");
  const [fileExtension, setFileExtension] = useState(".abhaya");
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleRun = async () => {
    if (isRunning) return; // Prevent multiple runs
    
    // Check for empty code
    if (!code.trim()) {
      setOutput([{ 
        type: "error", 
        content: "फुच्रो कोड लेख्नुहोस्! (Please write some code!)" 
      }]);
      return;
    }

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
      
      // Maintain selection after commenting/uncommenting
      setTimeout(() => {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + newText.length;
      }, 0);
    }

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // If there's a selection, indent all selected lines
      if (start !== end) {
        const selectedText = code.substring(start, end);
        const lines = selectedText.split('\n');
        const newText = lines.map(line => '  ' + line).join('\n');
        const newCode = code.substring(0, start) + newText + code.substring(end);
        setCode(newCode);
        
        // Maintain selection after indentation
        setTimeout(() => {
          textarea.selectionStart = start;
          textarea.selectionEnd = start + newText.length;
        }, 0);
      } else {
        // Single tab insertion
        const newCode = code.substring(0, start) + '  ' + code.substring(end);
        setCode(newCode);
        
        // Move cursor after the inserted tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    }

    // Handle Enter key for proper indentation
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Get the current line's indentation
      const currentLine = code.substring(0, start).split('\n').pop();
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      
      // Add new line with same indentation
      const newCode = code.substring(0, start) + '\n' + currentIndent + code.substring(end);
      setCode(newCode);
      
      // Move cursor to the new line with proper indentation
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + currentIndent.length;
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-full font-sans flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-3xl font-bold text-gray-700 ml-2">Abhaya Runner</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex gap-2 items-center">
            <div className="flex items-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="px-3 py-2 focus:outline-none bg-transparent"
                placeholder="Filename"
              />
              <div className="flex items-center border-l border-gray-200">
                <button
                  onClick={() => setFileExtension(".abhaya")}
                  className="px-3 py-2 text-sm font-medium bg-blue-600 text-white"
                >
                  .abhaya
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRun}
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold flex-grow md:flex-grow-0 flex items-center gap-2 transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
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
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor"/>
                  </svg>
                  Run
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-semibold flex-grow md:flex-grow-0 flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Clear
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-grow gap-4 md:gap-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 text-white p-2 rounded-t-md font-medium flex justify-between items-center">
            <span>Code Editor</span>
            <span className="text-xs text-gray-400">{fileName}{fileExtension}</span>
          </div>
          <div className="flex-grow relative">
            <pre
              style={{
                margin: 0,
                padding: '1rem 1rem 1rem 4.5rem',
                height: '100%',
                minHeight: '500px',
                borderRadius: '0 0 0.375rem 0.375rem',
                fontSize: '0.9rem',
                overflow: 'auto',
                backgroundColor: '#1E1E1E',
                color: '#D4D4D4',
                position: 'relative',
                zIndex: 1,
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              <code
                dangerouslySetInnerHTML={{ __html: abhayaHighlightLanguage(code) }}
                style={{
                  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                  lineHeight: '1.5'
                }}
              />
            </pre>
            <textarea
              className="absolute inset-0 w-full h-full resize-none font-mono"
              spellCheck={false}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                // Update cursor position on change
                const textarea = e.target;
                const cursorPosition = textarea.selectionStart;
                const textBeforeCursor = e.target.value.substring(0, cursorPosition);
                const lines = textBeforeCursor.split('\n');
                const line = lines.length;
                const column = lines[lines.length - 1].length + 1;
                setCursorPosition({ line, column });
              }}
              onKeyDown={handleKeyDown}
              onSelect={(e) => {
                const textarea = e.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                setSelection({ start, end });
                
                // Update cursor position
                const textBeforeCursor = code.substring(0, start);
                const lines = textBeforeCursor.split('\n');
                const line = lines.length;
                const column = lines[lines.length - 1].length + 1;
                setCursorPosition({ line, column });
              }}
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
                overflow: 'auto',
                caretShape: 'block',
                caretWidth: '2px'
              }}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500   px-2 py-1 rounded flex items-center gap-2">
              <span>Line {cursorPosition.line}, Column {cursorPosition.column}</span>
              {selection.start !== selection.end && (
                <span className="text-blue-400">
                  ({selection.end - selection.start} chars selected)
                </span>
              )}
            </div>
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