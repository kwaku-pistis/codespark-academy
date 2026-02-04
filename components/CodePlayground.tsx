import React, { useState, useEffect } from 'react';

interface Props {
  initialHTML: string;
  initialCSS: string;
  initialJS: string;
}

export const CodePlayground: React.FC<Props> = ({ initialHTML, initialCSS, initialJS }) => {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [js, setJs] = useState(initialJS);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('css');

  // We use an iframe or a data URL to render safely, 
  // but for a simple React learning app, direct injection with a cleanup effect is often easier for immediate feedback
  // provided we trust the input (the user is only hacking themselves).
  // Here we construct a srcDoc.
  const srcDoc = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; color: white; padding: 20px; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch(e) {
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-slate-400">playground.env</span>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-1">
          {(['html', 'css', 'js'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-colors ${
                activeTab === lang 
                  ? 'bg-brand-primary text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Area */}
      <div className="flex-1 flex flex-col md:flex-row h-[400px] md:h-auto">
        {/* Editor Input */}
        <div className="flex-1 bg-[#0f172a] overflow-hidden relative group">
          <textarea
            value={activeTab === 'html' ? html : activeTab === 'css' ? css : js}
            onChange={(e) => {
              if (activeTab === 'html') setHtml(e.target.value);
              if (activeTab === 'css') setCss(e.target.value);
              if (activeTab === 'js') setJs(e.target.value);
            }}
            className="w-full h-full bg-transparent text-slate-300 font-mono text-sm p-4 resize-none outline-none border-none leading-relaxed"
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-xs text-slate-600 bg-slate-900/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Editable {activeTab.toUpperCase()}
          </div>
        </div>

        {/* Preview Output */}
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-slate-700 bg-white relative">
          <div className="absolute top-0 left-0 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-br z-10">
            BROWSER PREVIEW
          </div>
          <iframe
            title="preview"
            srcDoc={srcDoc}
            className="w-full h-full"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};