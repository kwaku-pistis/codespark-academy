import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: 'dashboard' | 'module') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              &lt;/&gt;
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CodeSpark Academy
              </h1>
              <p className="text-xs text-slate-400">Month 2: Styling & Interactivity</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:inline-block">Welcome, Student!</span>
            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
               <img src="https://picsum.photos/100/100" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};