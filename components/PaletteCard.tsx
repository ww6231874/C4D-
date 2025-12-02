import React from 'react';
import { Heart, Download } from 'lucide-react';
import { Palette, Theme } from '../types';

interface PaletteCardProps {
  palette: Palette;
  onOpen: (palette: Palette) => void;
  theme: Theme;
  labels: any;
}

export const PaletteCard: React.FC<PaletteCardProps> = ({ palette, onOpen, theme, labels }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopyHex = (e: React.MouseEvent, hex: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1000);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      onClick={() => onOpen(palette)}
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border
        ${isDark 
          ? 'bg-gray-800/60 backdrop-blur-md border-white/10 hover:shadow-black/50' 
          : 'bg-white/70 backdrop-blur-md border-white/60 hover:shadow-blue-900/5'}
      `}
    >
      {/* Color Strip */}
      <div className="h-40 flex flex-col w-full">
        {palette.colors.map((color, idx) => (
          <div 
            key={idx} 
            className="flex-1 relative group/color transition-all hover:flex-[1.5]"
            style={{ backgroundColor: color }}
          >
            <div 
              onClick={(e) => handleCopyHex(e, color)}
              className={`
                absolute inset-0 flex items-center justify-center 
                transition-all duration-200 cursor-copy
                ${copied === color ? 'opacity-100 bg-black/20' : 'opacity-0 group-hover/color:opacity-100 bg-black/10'}
              `}
            >
              <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold drop-shadow-md transform scale-90 group-hover/color:scale-100 transition-transform">
                {copied === color ? labels.copied : color}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-4 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold truncate pr-2 text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{palette.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          {palette.tags.slice(0, 2).map(tag => (
            <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              isDark 
                ? 'bg-gray-700/50 text-gray-300 border-gray-600/50' 
                : 'bg-gray-100/50 text-gray-500 border-gray-200/50'
            }`}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className={`flex justify-between items-center pt-2 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'}`}>
          <div className="flex items-center space-x-1 text-gray-400 group-hover:text-red-500 transition-colors">
            <Heart size={14} className="fill-transparent group-hover:fill-red-500 transition-all" />
            <span className="text-xs font-medium">{palette.likes}</span>
          </div>
          
          <button className={`
            flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium 
            opacity-0 transform translate-y-2
            group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300
            hover:scale-105 active:scale-95
            ${isDark 
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}
          `}>
            <Download size={12} />
            {labels.exportC4D}
          </button>
        </div>
      </div>
    </div>
  );
};