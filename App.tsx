
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SLIDES as INITIAL_SLIDES } from './constants.tsx';
import { SlideData } from './types.ts';
import Slide from './components/Slide.tsx';

const STORAGE_KEY = 'afdb_slides_persistence_v1';
const AUTH_PASSWORD = 'Beachzipper66$';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>(INITIAL_SLIDES);
  const [isGenerating, setIsGenerating] = useState<Record<number, boolean>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  
  // Password Protection State
  const [isAuthoringMode, setIsAuthoringMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passError, setPassError] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Persistence: Load on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const persistedData: Record<number, { imageUrl?: string, generatedImageUrl?: string }> = JSON.parse(saved);
        setSlides(prev => prev.map(slide => {
          if (persistedData[slide.id]) {
            return { 
              ...slide, 
              imageUrl: persistedData[slide.id].imageUrl || slide.imageUrl,
              generatedImageUrl: persistedData[slide.id].generatedImageUrl
            };
          }
          return slide;
        }));
      } catch (e) {
        console.error("Failed to parse persisted data", e);
      }
    }
  }, []);

  // Persistence: Save on slides change
  useEffect(() => {
    const dataToSave: Record<number, { imageUrl?: string, generatedImageUrl?: string }> = {};
    slides.forEach(s => {
      dataToSave[s.id] = { 
        imageUrl: s.imageUrl,
        generatedImageUrl: s.generatedImageUrl 
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [slides]);

  const updateSlideImage = (id: number, url: string) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, imageUrl: url, generatedImageUrl: undefined } : s));
  };

  const exportData = () => {
    const data = JSON.stringify(slides.map(s => ({ id: s.id, imageUrl: s.imageUrl, generatedImageUrl: s.generatedImageUrl })));
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slideshow_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setSlides(prev => prev.map(slide => {
          const match = imported.find((i: any) => i.id === slide.id);
          if (match) {
            return { ...slide, imageUrl: match.imageUrl, generatedImageUrl: match.generatedImageUrl };
          }
          return slide;
        }));
        setErrorMsg("Configuration imported successfully!");
        setTimeout(() => setErrorMsg(null), 3000);
      } catch (err) {
        setErrorMsg("Failed to import configuration.");
      }
    };
    reader.readAsText(file);
  };

  const generateImageWithRetry = async (index: number, retryCount = 0): Promise<void> => {
    const slide = slides[index];
    const slideId = slide.id;
    
    setIsGenerating(prev => ({ ...prev, [slideId]: true }));
    setErrorMsg(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("Missing Gemini API Key. Please set the API_KEY environment variable in Vercel.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const headings = slide.sections?.map(s => s.heading).filter(Boolean).join(', ') || '';
      const bodyText = slide.sections?.map(s => {
        if (typeof s.content === 'string') return s.content;
        if (Array.isArray(s.content)) return JSON.stringify(s.content);
        return '';
      }).join(' ').slice(0, 300) || '';
      
      const fullContext = `${slide.title}. ${slide.subtitle || ''}. ${headings}. ${bodyText}`;

      let environment = "a natural everyday setting in Nigeria";
      if (fullContext.toLowerCase().includes("farmer") || fullContext.toLowerCase().includes("rural") || fullContext.toLowerCase().includes("agriculture")) {
        environment = "a lush Nigerian farm with green fields or a rural village market";
      } else if (fullContext.toLowerCase().includes("urban") || fullContext.toLowerCase().includes("city") || fullContext.toLowerCase().includes("lagos") || fullContext.toLowerCase().includes("market")) {
        environment = "a vibrant, busy Nigerian urban street with modern buildings or a bustling shopping area";
      } else if (fullContext.toLowerCase().includes("solar") || fullContext.toLowerCase().includes("off-grid")) {
        environment = "a home interior in Nigeria with warm solar-powered lighting";
      } else if (fullContext.toLowerCase().includes("youth") || fullContext.toLowerCase().includes("student") || fullContext.toLowerCase().includes("digital")) {
        environment = "a modern Nigerian cafe, workspace, or community tech hub";
      }

      const prompt = `A highly professional, realistic, documentary-style photograph of a real-life Nigerian person in ${environment}.
      Subject: ${slide.title}.
      Pose & Action: The subject is holding a modern smartphone naturally and is looking directly at the screen, appearing focused and engaged. This is a candid moment; the subject is NOT showing the phone to the camera or to anyone else. The device is held for personal use as in real life.
      Style: Authentic documentary photography, sharp focus on the subject, naturalistic professional lighting, cinematic depth of field, 8k resolution.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        },
      });

      let generatedUrl = '';
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedUrl) {
        setSlides(prev => prev.map(s => 
          s.id === slideId ? { ...s, generatedImageUrl: generatedUrl } : s
        ));
      } else {
        throw new Error("The AI did not return image data.");
      }
    } catch (error: any) {
      const isRateLimit = error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED") || (error.status === 429);
      
      if (isRateLimit && retryCount < 2) {
        const delay = Math.pow(2, retryCount + 1) * 2000;
        setErrorMsg(`Quota reached. Retrying in ${delay/1000}s...`);
        await sleep(delay);
        return generateImageWithRetry(index, retryCount + 1);
      }

      console.error(`Image generation failed for slide ${index}:`, error);
      setErrorMsg(isRateLimit 
        ? "API Quota exhausted. Please wait a minute or check your billing details." 
        : `Generation failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsGenerating(prev => ({ ...prev, [slideId]: false }));
    }
  };

  const generateImageForSlide = async (index: number) => {
    await generateImageWithRetry(index);
  };

  const generateAllImages = async () => {
    if (isGeneratingAll) return;
    setIsGeneratingAll(true);
    setErrorMsg(null);
    
    try {
      for (let i = 0; i < slides.length; i++) {
        if (!slides[i].generatedImageUrl) {
          await generateImageWithRetry(i);
          await sleep(1000);
        }
      }
    } catch (e) {
      console.error("Batch generation error:", e);
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === AUTH_PASSWORD) {
      setIsAuthoringMode(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPassError(false);
    } else {
      setPassError(true);
      setPasswordInput('');
    }
  };

  const toggleAuthoringMode = () => {
    if (isAuthoringMode) {
      setIsAuthoringMode(false);
      setShowAdmin(false);
    } else {
      setShowPasswordModal(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showPasswordModal) return; // Disable keys during password prompt
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      } else if (e.key.toLowerCase() === 'm') {
        toggleAuthoringMode();
      } else if (e.key.toLowerCase() === 'a' && isAuthoringMode) {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isAuthoringMode, showPasswordModal]);

  const filteredSlides = slides.filter(s => 
    s.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
    (indexToId(slides.indexOf(s)) + 1).toString() === adminSearch
  );

  function indexToId(index: number) {
    return slides[index].id;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-700 z-[60]">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Slides Content */}
      <div className="flex-1 relative slide-container">
        {slides.map((slide, index) => (
          <Slide 
            key={slide.id} 
            slide={slide} 
            isActive={index === currentSlide} 
            index={index}
            currentIndex={currentSlide}
            totalSlides={slides.length}
            isAuthoringMode={isAuthoringMode}
            isGenerating={isGenerating[slide.id]}
            onRegenerate={() => generateImageForSlide(index)}
          />
        ))}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowPasswordModal(false)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Authorizing Access</h3>
              <p className="text-slate-500 text-sm mb-8">Please enter the security password to access authoring tools.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input 
                  autoFocus
                  type="password"
                  placeholder="Password"
                  className={`w-full px-5 py-4 bg-slate-50 border ${passError ? 'border-red-500' : 'border-slate-200'} rounded-2xl text-center text-xl font-bold tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10 transition-all`}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPassError(false);
                  }}
                />
                {passError && <p className="text-red-500 text-xs font-bold animate-bounce">Incorrect Password. Try again.</p>}
                
                <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
                      className="flex-1 px-4 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        Enter Mode
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel Drawer - Only allowed in Authoring Mode */}
      {showAdmin && isAuthoringMode && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAdmin(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Admin Section</h2>
                <p className="text-sm text-slate-500">Manage Slide Assets Manually</p>
              </div>
              <button onClick={() => setShowAdmin(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-4 bg-slate-50 space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search slides by title or number..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                />
                <svg className="absolute left-3 top-2.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={exportData}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export Config
                </button>
                <label className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Import Config
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {filteredSlides.map((s) => {
                const actualIndex = slides.indexOf(s);
                return (
                  <div key={s.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all group">
                    <div className="flex gap-4 mb-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                        <img src={s.generatedImageUrl || s.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Slide {actualIndex + 1}</span>
                          {s.generatedImageUrl && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">AI Generated</span>}
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{s.title}</h3>
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentSlide(actualIndex);
                          setShowAdmin(false);
                        }}
                        className="text-blue-500 hover:text-blue-700 p-2"
                        title="Go to slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Image URL Override</label>
                      <input 
                        type="text" 
                        value={s.imageUrl}
                        onChange={(e) => updateSlideImage(s.id, e.target.value)}
                        placeholder="Paste image URL here..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-200">
               <p className="text-[10px] text-slate-500 text-center font-medium italic">All changes are saved automatically to local storage.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {errorMsg && (
        <div className="fixed bottom-24 left-6 z-[80] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-sm font-bold">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="ml-2 hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Mode Selectors */}
      <div className="fixed top-6 left-6 z-[70] flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleAuthoringMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl transition-all border ${
              isAuthoringMode 
                ? 'bg-blue-600 border-blue-400 text-white' 
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white backdrop-blur-md'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            {isAuthoringMode ? 'Authoring Mode' : 'Presentation Mode'}
          </button>
          
          {/* Admin Panel Button - Only visible in Authoring Mode */}
          {isAuthoringMode && (
            <button 
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl transition-all border bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white backdrop-blur-md animate-in fade-in slide-in-from-left-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Admin Panel
            </button>
          )}
        </div>
      </div>

      {/* AI Controls Panel - Only visible in Authoring Mode */}
      {isAuthoringMode && (
        <div className="fixed top-6 right-6 z-[70] flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex items-center gap-2 shadow-2xl">
            <button
              onClick={() => generateImageForSlide(currentSlide)}
              disabled={isGenerating[slides[currentSlide].id] || isGeneratingAll}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              {isGenerating[slides[currentSlide].id] ? 'Generating...' : 'Magic Current'}
            </button>
            <button
              onClick={generateAllImages}
              disabled={isGeneratingAll}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
              {isGeneratingAll ? 'Magic All...' : 'Magic All'}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Controls Overlay */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-lg px-2 py-2 rounded-full shadow-2xl border border-slate-200">
           <button 
            onClick={prevSlide}
            className={`p-3 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'opacity-0 scale-50 pointer-events-none' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="px-4 text-slate-900 font-bold text-xs tracking-tight select-none min-w-[70px] text-center">
            {currentSlide + 1} / {slides.length}
          </div>
          <button 
            onClick={nextSlide}
            className={`p-3 rounded-full transition-all duration-300 ${currentSlide === slides.length - 1 ? 'opacity-0 scale-50 pointer-events-none' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
