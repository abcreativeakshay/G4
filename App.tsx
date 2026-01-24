import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ToastContainer } from './components/ToastContainer';
import { streamInterviewPrep } from './services/geminiService';
import { UserInput, GenerationState, Toast } from './types';
import { Download, FileText, ChevronUp, Printer, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    content: '',
    error: null,
  });
  
  const [lastInput, setLastInput] = useState<UserInput | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loadingText, setLoadingText] = useState('INITIALIZING...');

  const resultRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    if (state.isGenerating) {
      const texts = ['ESTABLISHING UPLINK...', 'ACCESSING ARCHIVES...', 'DECRYPTING DATA...', 'COMPILING REPORT...'];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [state.isGenerating]);

  const handleGenerate = async (input: UserInput) => {
    setState({ isGenerating: true, content: '', error: null });
    setLastInput(input);

    try {
      await streamInterviewPrep(input, (chunk) => {
        setState((prev) => ({ ...prev, content: prev.content + chunk }));
      });
    } catch (error) {
      setState((prev) => ({ 
        ...prev, 
        error: "CONNECTION FAILURE. CHECK API CREDENTIALS." 
      }));
      addToast("GENERATION FAILED", "error");
    } finally {
      setState((prev) => ({ ...prev, isGenerating: false }));
      if (!state.error) addToast("REPORT COMPILED", "success");
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("SOURCE COPIED", "success");
  };

  const handleDownloadPDF = () => {
    if (!contentRef.current) return;
    addToast("GENERATING PDF...", "info");
    
    // 1. Scroll to top to prevent blank canvas issues
    window.scrollTo(0, 0);

    const element = contentRef.current;
    
    // Add PDF specific class
    element.classList.add('pdf-mode');

    // Safer filename generation
    const cleanTopic = lastInput?.topic.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() || 'REPORT';
    const timestamp = new Date().toISOString().split('T')[0];
    
    const opt = {
      margin:       [0.4, 0.4, 0.4, 0.4], 
      filename:     `NOVA7_PROTOCOL_${cleanTopic}_${timestamp}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 }, 
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        letterRendering: true,
        scrollY: 0, // CRITICAL: Forces capture from top
        windowWidth: 1200, // Fixed width helps consistent layout
      },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Access global html2pdf from CDN script
    const html2pdf = (window as any).html2pdf;
    
    if (html2pdf) {
      // Add timeout to allow UI update (scroll and class add) to paint
      setTimeout(() => {
        html2pdf().set(opt).from(element).save()
          .then(() => {
            element.classList.remove('pdf-mode');
            addToast("EXPORT COMPLETE", "success");
          })
          .catch((err: any) => {
            console.error("PDF Export Error:", err);
            element.classList.remove('pdf-mode');
            addToast("EXPORT FAILED", "error");
          });
      }, 800); 
    } else {
      console.error("html2pdf library not loaded");
      element.classList.remove('pdf-mode');
      addToast("PDF MODULE MISSING", "error");
    }
  };

  useEffect(() => {
    if (state.content.length > 50 && state.content.length < 300 && state.isGenerating) {
       resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state.content]);

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e5e5] text-slate-900 font-mono">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Input Section */}
        <div className={`transition-all duration-500 ease-in-out ${state.content ? 'mb-12' : 'min-h-[60vh] flex flex-col justify-center'}`}>
          <InputForm onSubmit={handleGenerate} isGenerating={state.isGenerating} />
        </div>

        {/* Error State */}
        {state.error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 border-l-4 border-red-600 text-red-900 font-mono flex items-center gap-4">
            <AlertTriangle className="w-6 h-6" />
            <div>
               <h3 className="font-bold uppercase tracking-wider">System Error</h3>
               <p className="text-sm">{state.error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {state.content && (
          <div ref={resultRef} className="max-w-5xl mx-auto animate-fade-in pb-20">
            
            {/* Document Toolbar */}
            <div className="flex justify-between items-end mb-2 font-display text-xs font-bold tracking-widest text-slate-500 uppercase border-b border-slate-300 pb-2">
               <div>
                  REPORT ID: <span className="text-slate-900">{Date.now().toString(36).toUpperCase()}</span>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => window.print()} className="hover:text-orange-600 flex items-center gap-1">
                     <Printer className="w-4 h-4" /> PRINT
                  </button>
                  <button onClick={handleDownloadPDF} className="hover:text-orange-600 flex items-center gap-1">
                     <FileText className="w-4 h-4" /> EXPORT PDF
                  </button>
               </div>
            </div>

            {/* The Document Sheet */}
            <div className="bg-white shadow-2xl min-h-[800px] relative">
              {/* Paper Texture/Pattern */}
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500 z-10"></div>
              
              <div className="p-8 md:p-16 lg:p-20 relative z-0" ref={contentRef}>
                 <MarkdownRenderer content={state.content} onCopy={handleCopyCode} />
                 
                 {state.isGenerating && (
                   <div className="mt-12 py-8 border-t-2 border-dashed border-slate-300 text-center">
                      <div className="inline-block px-4 py-1 bg-orange-100 text-orange-800 font-mono text-xs font-bold uppercase animate-pulse">
                         {loadingText}
                      </div>
                   </div>
                 )}
              </div>

              {/* Document Footer */}
              <div className="absolute bottom-0 left-0 w-full h-12 border-t border-slate-200 bg-slate-50 flex items-center justify-between px-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  <span>Confidentiality: L-4</span>
                  <span>NOVA-7 // AI GEN</span>
              </div>
            </div>

          </div>
        )}
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-orange-600 text-white shadow-lg hover:bg-orange-700 transition-all z-50 border-2 border-white no-print"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-6 border-t-4 border-orange-600 font-mono text-xs text-center uppercase tracking-widest no-print">
        <p>NOVA-7 Tactical Systems // Authorized Personnel Only</p>
      </footer>
    </div>
  );
};

export default App;