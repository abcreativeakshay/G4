import React from 'react';
import { Toast } from '../types';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-fade-in-up min-w-[300px]
            ${toast.type === 'success' ? 'bg-white/90 border-green-200 text-green-800' : ''}
            ${toast.type === 'error' ? 'bg-white/90 border-red-200 text-red-800' : ''}
            ${toast.type === 'info' ? 'bg-white/90 border-indigo-200 text-indigo-800' : ''}
          `}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-500" />}
          
          <p className="text-sm font-medium flex-grow">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
