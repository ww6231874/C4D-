import React, { useState, useEffect } from 'react';
import { 
  Sparkles, LayoutGrid, Brush, Flower, Heart, Sun, Snowflake, 
  Zap, Disc, Mountain, Key, Moon, Globe, Palette as PaletteIcon, 
  Grid, Image as ImageIcon, Cookie, IceCream, Waves, Circle, Feather, Search
} from 'lucide-react';
import { PaletteCard } from './components/PaletteCard';
import { ScriptModal } from './components/ScriptModal';
import { generateAiPalettes } from './services/geminiService';
import { ALL_INITIAL_PALETTES, SUGGESTED_THEMES, CATEGORIES, TRANSLATIONS } from './constants';
import { Palette, Language, Theme } from './types';

function App() {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [palettes, setPalettes] = useState<Palette[]>(ALL_INITIAL_PALETTES);
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(ALL_INITIAL_PALETTES);
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // New Global State
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');

  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  // Check for API Key on mount
  useEffect(() => {
    const checkApiKey = async () => {
      // @ts-ignore
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        // Fallback for environments without the bridge
        setHasApiKey(true);
      }
    };
    checkApiKey();
  }, []);

  const handleConnectApiKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  // Filter Logic
  useEffect(() => {
    let result = palettes;

    if (activeFilter !== '全部') {
      result = palettes.filter(p => p.tags.includes(activeFilter));
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPalettes(result);
  }, [palettes, activeFilter, searchQuery]);


  const handleGenerate = async (prompt: string = searchQuery) => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    const newPalettes = await generateAiPalettes(prompt, lang);
    if (newPalettes.length > 0) {
      setPalettes(prev => [...newPalettes, ...prev]);
      // Reset filter to see results
      if (activeFilter !== '全部') setActiveFilter('全部');
      setSearchQuery(''); 
    }
    setIsGenerating(false);
  };

  const getIcon = (iconName: string, size = 18) => {
    const icons: any = { 
      LayoutGrid, Brush, Flower, Heart, Sun, Snowflake, Zap, Disc, Mountain,
      Palette: PaletteIcon, Grid, Image: ImageIcon, Cookie, IceCream, 
      Waves, Circle, Feather, Lollipop: Disc
    };
    const Icon = icons[iconName] || LayoutGrid;
    return <Icon size={size} />;
  };

  // Background Component
  const Background = () => (
    <div className={`fixed inset-0 z-[-1] transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`absolute inset-0 opacity-40 transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-100'}`}
        style={{
          background: isDark 
            ? 'radial-gradient(at 0% 0%, #1a1b26 0, transparent 50%), radial-gradient(at 100% 100%, #2e1065 0, transparent 50%)'
            : 'radial-gradient(at 0% 0%, #dbeafe 0, transparent 50%), radial-gradient(at 100% 100%, #f3e8ff 0, transparent 50%)'
        }} 
      />
    </div>
  );

  // Render Landing Page if no API Key
  if (!hasApiKey) {
    return (
      <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
        <Background />
        <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center mx-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/30 mx-auto mb-6">
            C4D
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.connectTitle}</h1>
          <p className="text-gray-500 mb-8 leading-relaxed whitespace-pre-line">
            {t.connectDesc}
          </p>
          
          <button 
            onClick={handleConnectApiKey}
            className="w-full py-3.5 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
          >
            <Key size={18} />
            {t.connectBtn}
          </button>
          
          <div className="mt-6 text-xs text-gray-400">
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">{t.billingHelp}</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans selection:bg-blue-500/30 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
      <Background />
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
        flex flex-col border-r
        ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/60 border-white/40'}
        backdrop-blur-2xl
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-20 flex items-center px-6 shrink-0 gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20 flex items-center justify-center text-white font-bold text-lg">
            C4D
          </div>
          <span className={`font-bold tracking-tight text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Palette Studio</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 no-scrollbar">
          {CATEGORIES.map((cat, idx) => {
            if (cat.type === 'header') {
              return (
                <div key={idx} className={`mt-6 mb-3 px-3 text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {lang === 'zh' ? cat.label : cat.enLabel}
                </div>
              );
            }
            const isActive = activeFilter === (cat.id || '全部');
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id || '全部');
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? (isDark ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'bg-white text-blue-600 shadow-md ring-1 ring-black/5') 
                    : (isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900')}
                `}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-transparent'}`}>
                   {getIcon(cat.icon || 'LayoutGrid', 18)}
                </div>
                <span>{lang === 'zh' ? cat.label : cat.enLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Settings */}
        <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200/50'}`}>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className={`flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-white/50 text-gray-600 hover:text-gray-900'}`}
            >
              {theme === 'light' ? <Moon size={14}/> : <Sun size={14}/>}
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button 
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className={`flex items-center justify-center gap-2 p-2 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-white/50 text-gray-600 hover:text-gray-900'}`}
            >
              <Globe size={14}/>
              {lang === 'zh' ? 'English' : '中文'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar */}
        <header className={`h-20 shrink-0 flex items-center justify-between px-8 transition-colors ${isDark ? 'bg-gray-900/50' : 'bg-transparent'}`}>
          <div className="flex-1 max-w-2xl relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(searchQuery)}
              className={`
                w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none transition-all shadow-sm
                ${isDark 
                  ? 'bg-gray-800/80 text-white placeholder-gray-500 border border-gray-700 focus:bg-gray-800 focus:border-blue-500' 
                  : 'bg-white/80 text-gray-900 placeholder-gray-400 border border-white/60 focus:bg-white focus:ring-2 focus:ring-blue-500/20'}
              `}
            />
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            <button 
              onClick={() => handleGenerate(searchQuery || (lang === 'zh' ? '随机灵感' : 'Random Inspiration'))}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={18} className={isGenerating ? "animate-spin" : ""} />
              {isGenerating ? t.generating : t.generate}
            </button>
          </div>
        </header>
        
        {/* Search Recommendations / Chips */}
        {!isGenerating && (
          <div className="px-8 pb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
            {searchQuery === '' && (
              <>
                 <span className={`text-xs font-bold uppercase tracking-wider py-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.suggestedThemes}:</span>
                 {SUGGESTED_THEMES.map(themeName => (
                   <button
                     key={themeName}
                     onClick={() => { setSearchQuery(themeName); handleGenerate(themeName); }}
                     className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                       isDark 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white/50 text-gray-600 hover:bg-white hover:text-blue-600'
                     }`}
                   >
                     {themeName}
                   </button>
                 ))}
              </>
            )}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-10">
          
          {/* Empty State / AI Trigger */}
          {filteredPalettes.length === 0 && !isGenerating && (
             <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in-95 duration-300">
               <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-300'}`}>
                 <Search size={32} />
               </div>
               <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.noResults}</h3>
               <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                 "{searchQuery}"
               </p>
               <button 
                  onClick={() => handleGenerate(searchQuery)}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
               >
                 <Sparkles size={20} />
                 {t.generateWithAI}: "{searchQuery}"
               </button>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPalettes.map((palette) => (
              <PaletteCard 
                key={palette.id} 
                palette={palette} 
                onOpen={setSelectedPalette} 
                theme={theme}
                labels={t}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Script Modal */}
      {selectedPalette && (
        <ScriptModal 
          palette={selectedPalette} 
          onClose={() => setSelectedPalette(null)} 
        />
      )}
    </div>
  );
}

export default App;