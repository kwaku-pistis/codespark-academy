import React from 'react';
import { WeekModule } from '../types';

interface Props {
  module: WeekModule;
  onClick: () => void;
}

export const ModuleCard: React.FC<Props> = ({ module, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${module.color}`} />
      
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-slate-300 border border-slate-700`}>
          Week {module.id}
        </span>
        {module.id === 1 ? (
          <span className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Active
          </span>
        ) : (
           <span className="text-slate-500 text-xs">Locked</span>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
        {module.title}
      </h3>
      
      <div className="space-y-2 mb-6">
        {module.topics.map((topic, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
            <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {topic}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">{module.lessons.length} Lessons</span>
        <span className="text-brand-primary font-semibold group-hover:translate-x-1 transition-transform">Start &rarr;</span>
      </div>
    </div>
  );
};