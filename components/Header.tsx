import React from 'react';
import { Terminal, Shield, Wifi } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-orange-500 border-b-2 border-orange-600 no-print">
      <div className="max-w-7xl mx-auto px-4 h-14 flex justify-between items-center font-display">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
            <Terminal className="w-5 h-5" />
            <span className="font-bold tracking-wider text-lg">NOVA-7</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 tracking-[0.2em] uppercase">Tactical AI Interface</span>
        </div>
        
        <div className="flex items-center gap-6 text-xs font-bold tracking-widest">
           <div className="hidden sm:flex items-center gap-2 text-emerald-500">
             <Wifi className="w-4 h-4" />
             <span>ONLINE</span>
           </div>
           <div className="flex items-center gap-2">
             <Shield className="w-4 h-4" />
             <span>SECURE//V.2.4</span>
           </div>
        </div>
      </div>
    </header>
  );
};
