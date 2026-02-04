import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { ModuleCard } from './components/ModuleCard';
import { CodePlayground } from './components/CodePlayground';
import { AITutor } from './components/AITutor';
import { CURRICULUM } from './constants';
import { generateQuiz } from './services/gemini';
import { WeekModule, Lesson } from './types';

function App() {
  const [view, setView] = useState<'dashboard' | 'module'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeLessonId, setActiveLessonId] = useState<string>('');
  
  // Quiz State
  const [quizData, setQuizData] = useState<any>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'loading' | 'ready' | 'answered'>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activeModule = useMemo(() => 
    CURRICULUM.find(m => m.id === activeModuleId) || CURRICULUM[0], 
    [activeModuleId]
  );

  const activeLesson = useMemo(() => 
    activeModule.lessons.find(l => l.id === activeLessonId) || activeModule.lessons[0],
    [activeModule, activeLessonId]
  );

  const handleModuleSelect = (id: number) => {
    setActiveModuleId(id);
    setActiveLessonId(CURRICULUM.find(m => m.id === id)?.lessons[0].id || '');
    setView('module');
    setQuizStatus('idle'); // Reset quiz on module change
    setQuizData(null);
  };

  const handleStartQuiz = async () => {
    setQuizStatus('loading');
    const data = await generateQuiz(activeLesson.title);
    if (data) {
      setQuizData(data);
      setQuizStatus('ready');
      setSelectedOption(null);
    } else {
      setQuizStatus('idle'); // Failed
    }
  };

  return (
    <Layout onNavigate={setView}>
      {view === 'dashboard' ? (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4 py-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CSS & JS</span> in 4 Weeks
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Level up your HTML skills! Learn to style beautiful pages and make them interactive with real code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURRICULUM.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                onClick={() => handleModuleSelect(module.id)} 
              />
            ))}
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-10">
            <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
               <div className="bg-gradient-to-r from-brand-primary to-brand-accent w-[15%] h-full rounded-full relative">
                  <div className="absolute top-0 right-0 h-full w-2 bg-white/30 animate-pulse"></div>
               </div>
            </div>
            <p className="text-right text-sm text-slate-400 mt-2">15% Complete</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] animate-fade-in">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0 bg-slate-800 rounded-xl border border-slate-700 p-4 overflow-y-auto">
            <button 
              onClick={() => setView('dashboard')}
              className="mb-6 flex items-center text-sm text-slate-400 hover:text-white transition"
            >
              &larr; Back to Map
            </button>
            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider opacity-70">{activeModule.title}</h3>
            <div className="space-y-2">
              {activeModule.lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLessonId(lesson.id);
                    setQuizStatus('idle');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeLessonId === lesson.id 
                      ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/50' 
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                  }`}
                >
                  {lesson.title}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Weekly Objectives</h4>
               <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                 {activeModule.objectives.map((obj, i) => (
                   <li key={i}>{obj}</li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
             <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6 overflow-y-auto flex flex-col">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h2>
                  <p className="text-slate-400 text-lg">{activeLesson.description}</p>
                </div>

                {/* Lesson Tabs/Content */}
                <div className="flex-1 flex flex-col gap-6">
                   {/* Improved Content Rendering for Detailed Lessons */}
                   <div 
                      className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 prose prose-invert max-w-none prose-headings:text-brand-primary prose-a:text-blue-400 prose-code:text-purple-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800"
                      dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                   />

                   <div className="flex-1 min-h-[400px]">
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-success"></span>
                        Live Practice: {activeLesson.activityGoal}
                      </h3>
                      <CodePlayground 
                        key={activeLesson.id} // Force reset on lesson change
                        initialHTML={activeLesson.initialHTML}
                        initialCSS={activeLesson.initialCSS}
                        initialJS={activeLesson.initialJS}
                      />
                   </div>

                   {/* Quiz Section */}
                   <div className="border-t border-slate-700 pt-6 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Challenge Time!</h3>
                        {quizStatus === 'idle' && (
                          <button 
                            onClick={handleStartQuiz}
                            className="bg-brand-accent hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-lg shadow-purple-500/20"
                          >
                            Generate Pop Quiz
                          </button>
                        )}
                      </div>

                      {quizStatus === 'loading' && (
                        <div className="p-8 text-center text-slate-400 animate-pulse">
                           Generating a unique challenge for you... 🧙‍♂️
                        </div>
                      )}

                      {quizStatus === 'ready' && quizData && (
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 animate-fade-in-up">
                           <p className="text-lg text-white font-medium mb-4">{quizData.question}</p>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {quizData.options.map((opt: string, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setSelectedOption(idx);
                                    setQuizStatus('answered');
                                  }}
                                  className="p-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-brand-primary text-left transition"
                                >
                                  {opt}
                                </button>
                              ))}
                           </div>
                        </div>
                      )}

                      {quizStatus === 'answered' && quizData && (
                        <div className={`p-4 rounded-xl border ${selectedOption === quizData.correctAnswerIndex ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'} flex items-center gap-4`}>
                           <div className={`text-2xl ${selectedOption === quizData.correctAnswerIndex ? 'text-green-500' : 'text-red-500'}`}>
                             {selectedOption === quizData.correctAnswerIndex ? '🎉' : '❌'}
                           </div>
                           <div>
                             <h4 className={`font-bold ${selectedOption === quizData.correctAnswerIndex ? 'text-green-400' : 'text-red-400'}`}>
                               {selectedOption === quizData.correctAnswerIndex ? 'Correct!' : 'Oops, try again!'}
                             </h4>
                             <p className="text-sm text-slate-400">
                               {selectedOption === quizData.correctAnswerIndex 
                                 ? "Great job understanding the concept!" 
                                 : "Don't give up. Ask the AI Tutor for help!"}
                             </p>
                           </div>
                           <button onClick={handleStartQuiz} className="ml-auto text-sm underline text-slate-400 hover:text-white">Next Question</button>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
          <AITutor currentTopic={activeLesson.title} />
        </div>
      )}
    </Layout>
  );
}

export default App;