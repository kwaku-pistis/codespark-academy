import React, { useState } from 'react';
import { generateExplanation } from '../services/gemini';
import { Message } from '../types';

interface Props {
  currentTopic: string;
}

export const AITutor: React.FC<Props> = ({ currentTopic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi! I'm your AI coding buddy. Ask me anything about ${currentTopic}!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const answer = await generateExplanation(currentTopic, input);
    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-brand-accent to-purple-600 rounded-full shadow-lg shadow-purple-500/40 flex items-center justify-center text-white text-2xl z-50 hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        🤖
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in-up">
          {/* Header */}
          <div className="bg-slate-900 p-3 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-white">AI Tutor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          {/* Chat Area */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-800/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-slate-700 p-3 rounded-lg rounded-bl-none text-slate-400 text-xs animate-pulse">
                   Thinking...
                 </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-primary"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-brand-primary hover:bg-blue-600 text-white px-3 rounded-md transition disabled:opacity-50"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
};