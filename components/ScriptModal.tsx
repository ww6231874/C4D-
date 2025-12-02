import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal, Info, Maximize2, Minimize2 } from 'lucide-react';
import { Palette, C4DMaterialType } from '../types';
import { generateC4DScript } from '../utils/c4dScriptBuilder';

interface ScriptModalProps {
  palette: Palette | null;
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({ palette, onClose }) => {
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeType, setActiveType] = useState<C4DMaterialType>(C4DMaterialType.STANDARD);

  useEffect(() => {
    if (palette) {
      setScript(generateC4DScript(palette, activeType));
    }
  }, [palette, activeType]);

  if (!palette) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* MacOS Window Style Container */}
      <div className="bg-white/90 backdrop-blur-2xl rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl ring-1 ring-black/10 overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Title Bar */}
        <div className="h-12 bg-gray-100/50 border-b border-gray-200/50 flex items-center justify-between px-4 shrink-0 drag-handle">
          <div className="flex gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/20 shadow-inner transition-colors flex items-center justify-center group">
              <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600/20 shadow-inner" />
          </div>
          
          <div className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Terminal size={14} className="text-gray-400" />
            C4D Script Generator
          </div>

          <div className="w-14" /> {/* Spacer for centering */}
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          
          {/* Sidebar Controls */}
          <div className="w-full md:w-72 bg-gray-50/50 p-6 border-r border-gray-200/50 flex flex-col gap-6 shrink-0 overflow-y-auto">
            
            {/* Palette Preview */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-3">{palette.name}</h3>
               <div className="flex h-10 rounded-lg overflow-hidden ring-1 ring-black/5">
                {palette.colors.map(c => (
                  <div key={c} style={{ background: c }} className="flex-1" />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                 {palette.colors.map(c => (
                   <span key={c} className="text-[10px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{c}</span>
                 ))}
              </div>
            </div>

            {/* Config Options */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">渲染引擎</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveType(C4DMaterialType.STANDARD)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    activeType === C4DMaterialType.STANDARD 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-white text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="font-semibold">标准材质 (Standard)</div>
                  <div className={`text-xs mt-0.5 opacity-80 ${activeType === C4DMaterialType.STANDARD ? 'text-blue-100' : 'text-gray-400'}`}>
                    通用 / 物理 / ProRender
                  </div>
                </button>
                <button
                  onClick={() => setActiveType(C4DMaterialType.REDSHIFT)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    activeType === C4DMaterialType.REDSHIFT
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-white text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="font-semibold">Redshift / Octane</div>
                  <div className={`text-xs mt-0.5 opacity-80 ${activeType === C4DMaterialType.REDSHIFT ? 'text-purple-100' : 'text-gray-400'}`}>
                    RS_Proxy 兼容模式
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-auto">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 backdrop-blur-sm">
                    <div className="flex gap-2 items-start">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"/>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            在 C4D 2025 中打开脚本管理器 <span className="font-mono bg-blue-100 px-1 rounded mx-0.5">Shift+F11</span>，粘贴并运行。
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Code Editor View */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e] relative group">
             {/* Code Actions */}
             <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
               <button
                 onClick={handleCopy}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg ${
                   copied 
                     ? 'bg-green-500 text-white' 
                     : 'bg-white text-gray-900 hover:scale-105'
                 }`}
               >
                 {copied ? <Check size={16} /> : <Copy size={16} />}
                 {copied ? '已复制' : '复制 Python 代码'}
               </button>
             </div>

             <div className="h-full overflow-auto p-6 code-scroll">
               <pre className="font-mono text-sm leading-relaxed">
                 <code className="block text-gray-300 font-normal">
                   {/* Syntax Highlighting Simulation */}
                   {script.split('\n').map((line, i) => (
                     <div key={i} className="table-row">
                       <span className="table-cell text-gray-600 select-none text-right pr-4 w-8">{i + 1}</span>
                       <span className="table-cell whitespace-pre-wrap">
                         {line
                           .replace(/(import|def|class|return|if|else|for|in|True|False|None)/g, '<span class="text-purple-400">$1</span>')
                           .replace(/(print|len|range)/g, '<span class="text-blue-400">$1</span>')
                           .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
                           .replace(/(#.*)/g, '<span class="text-gray-500">$1</span>')
                           .split(/<span class="(.*?)">(.*?)<\/span>/g)
                           .map((part, idx, arr) => {
                             if (idx % 3 === 1) return <span key={idx} className={part}>{arr[idx+1]}</span>;
                             if (idx % 3 === 2) return null;
                             return part;
                           })
                         }
                       </span>
                     </div>
                   ))}
                 </code>
               </pre>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};