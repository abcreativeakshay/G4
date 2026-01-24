import React, { useState, useEffect } from 'react';
import { UserInput } from '../types';
import { Terminal, ArrowRight, Zap, Command } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isGenerating: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isGenerating }) => {
  const [topic, setTopic] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit({ topic });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 font-display">
      
      <div className="mb-6 border-l-4 border-orange-500 pl-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter uppercase mb-2">
          Interview Protocol
        </h2>
        <p className="text-slate-600 font-mono text-sm uppercase tracking-widest">
          Initialize 100-Question Drill Sequence
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative group">
        <div className="bg-slate-900 p-1 border-2 border-slate-900 shadow-2xl">
          <div className="bg-black p-4 md:p-6 flex items-center gap-4">
            <span className="text-orange-500 font-bold shrink-0">{'>'}</span>
            <input
              type="text"
              required
              autoFocus
              disabled={isGenerating}
              className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-orange-100 font-mono text-lg md:text-xl placeholder-slate-700 uppercase"
              placeholder="ENTER JOB ROLE OR TOPIC..."
              value={topic}
              onChange={(e) => setTopic(e.target.value.toUpperCase())}
            />
            {cursorVisible && <span className="w-3 h-6 bg-orange-500 block animate-pulse"></span>}
          </div>
          
          <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-t border-slate-700">
             <div className="flex gap-4 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                <span>Mode: Drill</span>
                <span>Count: 100 Qs</span>
                <span>Lat: 12ms</span>
             </div>
             
             <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className={`
                flex items-center gap-2 px-6 py-2 font-bold text-xs uppercase tracking-widest transition-all
                ${isGenerating || !topic.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-orange-600 text-white hover:bg-orange-500'}
              `}
            >
              {isGenerating ? 'GENERATING...' : '[ START MOCK INTERVIEW ]'}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2">
        {['FULL STACK DEV', 'MACHINE LEARNING', 'DEVOPS ENGINEER', 'PRODUCT MANAGER'].map((tag) => (
          <button
            key={tag}
            onClick={() => setTopic(tag)}
            className="px-4 py-2 border border-slate-300 bg-white text-slate-600 text-xs font-bold font-mono hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700 transition-colors uppercase text-left flex items-center justify-between group"
          >
            <span>{tag}</span>
            <span className="opacity-0 group-hover:opacity-100 text-orange-500">+</span>
          </button>
        ))}
      </div>
    </div>
  );
};
