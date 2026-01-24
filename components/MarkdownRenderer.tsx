import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Copy, Terminal } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onCopy: (text: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onCopy }) => {
  return (
    <div className="prose prose-slate max-w-none font-sans text-slate-800">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({node, ...props}) => (
            <div className="mb-12 border-b-4 border-orange-500 pb-4">
               <h1 className="text-3xl md:text-5xl font-display font-bold text-orange-600 uppercase tracking-tighter mb-2" {...props} />
               <div className="h-1 w-full bg-slate-900 mt-1"></div>
            </div>
          ),
          h2: ({node, ...props}) => {
            // Check if it's a section header like "01 // ..."
            const isSection = props.children?.toString().includes('//');
            return (
              <div className="mt-16 mb-8 group break-inside-avoid-page section-header">
                <h2 className={`text-xl md:text-2xl font-display font-bold text-orange-600 uppercase tracking-widest flex items-center gap-3 ${isSection ? '' : ''}`} {...props} />
                <div className="h-px w-full bg-orange-200 mt-2"></div>
                <div className="h-px w-full bg-orange-500 mt-1"></div>
              </div>
            );
          },
          h3: ({node, ...props}) => (
            <h3 className="text-lg font-display font-bold text-slate-900 uppercase tracking-wider mt-8 mb-4 border-l-4 border-orange-500 pl-3 break-after-avoid" {...props} />
          ),
          p: ({node, ...props}) => <p className="leading-7 mb-4 font-serif text-[15px] text-slate-700" style={{ fontFamily: "'Courier Prime', monospace" }} {...props} />,
          ul: ({node, ...props}) => <ul className="list-none space-y-2 mb-6 ml-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside ml-4 space-y-2 mb-6 font-mono text-sm" {...props} />,
          li: ({node, ...props}) => (
            <li className="flex gap-3 items-start font-serif text-[15px]" style={{ fontFamily: "'Courier Prime', monospace" }}>
               <span className="text-orange-500 font-bold shrink-0 mt-1">>></span>
               <span className="block">{props.children}</span>
            </li>
          ),
          blockquote: ({node, ...props}) => (
            <div className="answer-module my-8 border-2 border-slate-900 p-6 bg-white shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] relative break-inside-avoid">
               <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 uppercase tracking-widest -translate-y-1/2 translate-x-4 font-display print-badge">
                 Data Module
               </div>
               <blockquote className="not-italic text-slate-800 font-serif" style={{ fontFamily: "'Courier Prime', monospace" }} {...props} />
            </div>
          ),
          code: ({node, ...props}) => {
             const isInline = props.className ? false : true;
             const codeContent = String(props.children).replace(/\n$/, '');
             
             if (isInline) {
               return <code className="bg-slate-200 text-slate-900 px-1.5 py-0.5 text-[0.9em] font-display font-bold" {...props} />;
             }

             return (
               <div className="my-8 border border-slate-300 bg-slate-50 break-inside-avoid-page">
                 <div className="flex items-center justify-between px-3 py-1 bg-slate-200 border-b border-slate-300">
                   <span className="text-xs font-display font-bold text-slate-500 uppercase">Script Source</span>
                   <button 
                     onClick={() => onCopy(codeContent)}
                     className="text-xs font-mono text-orange-600 hover:text-orange-800 uppercase hover:underline"
                   >
                     [ Copy ]
                   </button>
                 </div>
                 <div className="p-4 overflow-x-auto">
                   <code className="text-sm font-mono text-slate-800 leading-relaxed" {...props} />
                 </div>
               </div>
             );
          },
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-8 border-2 border-slate-900">
              <table className="min-w-full divide-y-2 divide-slate-900" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="bg-orange-100 font-display" {...props} />,
          th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-bold text-orange-900 uppercase tracking-widest border-r border-slate-900 last:border-r-0" {...props} />,
          tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-slate-300 font-mono text-sm" {...props} />,
          tr: ({node, ...props}) => <tr className="hover:bg-orange-50" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 whitespace-normal border-r border-slate-300 last:border-r-0" {...props} />,
          hr: ({node, ...props}) => <div className="my-12 flex items-center gap-4"><div className="h-px bg-slate-300 flex-grow"></div><span className="text-xs text-slate-400 font-mono tracking-widest">SECTION BREAK</span><div className="h-px bg-slate-300 flex-grow"></div></div>
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};