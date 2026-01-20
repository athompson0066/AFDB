import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SLIDES as INITIAL_SLIDES } from './constants.tsx';
import { SlideData } from './types.ts';
import Slide from './components/Slide.tsx';
import ChatBot from './components/ChatBot.tsx';

// Storage version v4
const STORAGE_KEY = 'afdb_slides_persistence_v4';
const AUTH_PASSWORD = 'Beachzipper66$';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>(INITIAL_SLIDES);
  const [isGenerating, setIsGenerating] = useState<Record<number, boolean>>({});
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  
  // Jump to slide state
  const [isJumping, setIsJumping] = useState(false);
  const [jumpInput, setJumpInput] = useState('');

  // Password Protection State
  const [isAuthoringMode, setIsAuthoringMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passError, setPassError] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Persistence: Load on mount
  useEffect(() => {
    const savedSlidesFull = localStorage.getItem(STORAGE_KEY + '_full_list');
    
    if (savedSlidesFull) {
      try {
        setSlides(JSON.parse(savedSlidesFull));
      } catch (e) {
        console.error("Failed to parse full slide list", e);
      }
    }
  }, []);

  // Persistence: Save on slides change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_full_list', JSON.stringify(slides));
  }, [slides]);

  // Slide Management Actions
  const addSlide = (type: 'cover' | 'content' = 'content') => {
    const newId = Math.max(0, ...slides.map(s => s.id)) + 1;
    const newSlide: SlideData = {
      id: newId,
      type: type,
      title: type === 'cover' ? 'New Project Phase' : 'Strategic Analysis',
      imageUrl: 'https://technext24.com/wp-content/uploads/2024/11/Digital-Access-Africa.jpg',
      subtitle: type === 'cover' ? 'Descriptive subtitle for this section' : undefined,
      author: type === 'cover' ? 'Project Working Group' : undefined,
      date: type === 'cover' ? 'Q3 2026' : undefined,
      sections: type === 'content' ? [
        {
          heading: 'Executive Summary',
          content: 'Add your strategic analysis and insights for this section here.'
        }
      ] : []
    };
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlide(slides.length); 
    setErrorMsg(`New ${type} slide added.`);
    setTimeout(() => setErrorMsg(null), 2000);
  };

  const duplicateSlide = (id: number) => {
    const index = slides.findIndex(s => s.id === id);
    if (index === -1) return;
    
    const original = slides[index];
    const newId = Math.max(0, ...slides.map(s => s.id)) + 1;
    const duplicated: SlideData = {
      ...JSON.parse(JSON.stringify(original)),
      id: newId,
      title: original.title + ' (Copy)'
    };
    
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, duplicated);
    setSlides(newSlides);
    setCurrentSlide(index + 1);
    setErrorMsg("Slide duplicated successfully.");
    setTimeout(() => setErrorMsg(null), 2000);
  };

  const deleteSlide = (id: number) => {
    if (slides.length <= 1) return;
    const deletedIndex = slides.findIndex(s => s.id === id);
    setSlides(prev => prev.filter(s => s.id !== id));
    
    if (currentSlide >= deletedIndex && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const resetSlideToDefault = (id: number) => {
    const original = INITIAL_SLIDES.find(s => s.id === id);
    if (original) {
      setSlides(prev => prev.map(s => s.id === id ? { ...original } : s));
      setErrorMsg("Slide content restored to original defaults.");
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const resetAllToDefault = () => {
    if (confirm("This will clear all local edits and restore the entire presentation to project defaults. Continue?")) {
      setSlides(INITIAL_SLIDES);
      setCurrentSlide(0);
      localStorage.removeItem(STORAGE_KEY + '_full_list');
      setErrorMsg("Presentation reset to project defaults.");
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const moveSlide = (id: number, direction: 'up' | 'down') => {
    const index = slides.findIndex(s => s.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === slides.length - 1)) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newSlides = [...slides];
    const [removed] = newSlides.splice(index, 1);
    newSlides.splice(newIndex, 0, removed);
    
    setSlides(newSlides);
    
    if (currentSlide === index) {
      setCurrentSlide(newIndex);
    } else if (currentSlide === newIndex) {
      setCurrentSlide(index);
    }
  };

  const updateSlideContent = (id: number, updates: Partial<SlideData>) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const exportData = () => {
    const data = JSON.stringify(slides);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slideshow_master_config.json';
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
        if (Array.isArray(imported)) {
          setSlides(imported);
          setCurrentSlide(0);
          setErrorMsg("Full presentation imported successfully!");
        } else {
          throw new Error("Invalid format");
        }
        setTimeout(() => setErrorMsg(null), 3000);
      } catch (err) {
        setErrorMsg("Failed to import. Ensure the file is a valid slide array.");
      }
    };
    reader.readAsText(file);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= slides.length) {
      setCurrentSlide(num - 1);
    }
    setIsJumping(false);
    setJumpInput('');
  };

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
      const activeElement = document.activeElement;
      const isTyping = 
        activeElement instanceof HTMLInputElement || 
        activeElement instanceof HTMLTextAreaElement || 
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);
                       
      if (isTyping || showPasswordModal) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      } else if (e.key.toLowerCase() === 'm') {
        toggleAuthoringMode();
      } else if (e.key.toLowerCase() === 'a' && isAuthoringMode) {
        setShowAdmin(prev => !prev);
      } else if (e.key.toLowerCase() === 'g') {
        setIsJumping(true);
        setJumpInput((currentSlide + 1).toString());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isAuthoringMode, showPasswordModal, currentSlide]);

  const filteredSlides = slides.filter((s, idx) => 
    s.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
    (idx + 1).toString() === adminSearch
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900 flex flex-col">
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-700 z-[60]">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

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
            onUpdate={(updates) => updateSlideContent(slide.id, updates)}
            onReset={() => resetSlideToDefault(slide.id)}
          />
        ))}
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowPasswordModal(false)}></div>
          <div className="relative w-full max-sm:w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
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

      {showAdmin && isAuthoringMode && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAdmin(false)}></div>
          <div className="relative w-full max-md:w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Slide Manager</h2>
                <p className="text-sm text-slate-500">Add, Delete or Reorder Slides</p>
              </div>
              <button onClick={() => setShowAdmin(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-4 bg-slate-50 space-y-3">
              <div className="flex gap-2 mb-2">
                <button 
                  onClick={() => addSlide('content')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  + Content
                </button>
                <button 
                  onClick={() => addSlide('cover')}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  + Cover
                </button>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Filter slides..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                />
                <svg className="absolute left-3 top-2.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={exportData}
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  Export Project
                </button>
                <label className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
                  Import Project
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>

              <button 
                onClick={resetAllToDefault}
                className="w-full bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Reset Entire Presentation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-slate-50/30">
              {filteredSlides.map((s) => {
                const actualIndex = slides.indexOf(s);
                return (
                  <div key={s.id} className={`p-4 bg-white border ${currentSlide === actualIndex ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-100'} rounded-2xl shadow-sm hover:border-blue-200 transition-all group`}>
                    <div className="flex gap-4 mb-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 relative">
                        <img src={s.generatedImageUrl || s.imageUrl} className="w-full h-full object-cover" alt="" />
                        <div className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{actualIndex + 1}</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">{s.title}</h3>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{s.type}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => setCurrentSlide(actualIndex)}
                            className="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                          >
                            Jump To
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex gap-1">
                        <button 
                          disabled={actualIndex === 0}
                          onClick={() => moveSlide(s.id, 'up')}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-20"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                        </button>
                        <button 
                          disabled={actualIndex === slides.length - 1}
                          onClick={() => moveSlide(s.id, 'down')}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 disabled:opacity-20"
                          title="Move Down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <button 
                          onClick={() => duplicateSlide(s.id)}
                          className="p-1.5 hover:bg-blue-50 text-blue-400 rounded-lg transition-colors"
                          title="Duplicate Slide"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => deleteSlide(s.id)}
                        disabled={slides.length <= 1}
                        className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors disabled:opacity-0"
                        title="Delete Slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
               <p className="text-[10px] text-slate-500 font-medium italic">All project structure changes are saved locally.</p>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="fixed bottom-24 left-6 z-[80] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-sm font-bold">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="ml-2 hover:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      )}

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
          
          {isAuthoringMode && (
            <button 
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl transition-all border bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white backdrop-blur-md animate-in fade-in slide-in-from-left-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Slide Manager
            </button>
          )}
        </div>
      </div>

      <div 
        className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[90] transition-all duration-500"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(100px)' }}
      >
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xl px-2 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200/50">
           <button 
            onClick={prevSlide}
            className={`p-3 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'opacity-20 scale-90 pointer-events-none' : 'text-slate-700 hover:bg-slate-100 active:scale-90'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="min-w-[80px] flex justify-center">
            {isJumping ? (
              <form onSubmit={handleJumpSubmit} className="flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1 border border-blue-200 animate-in zoom-in-95 duration-200">
                <input
                  autoFocus
                  type="text"
                  className="w-8 bg-transparent border-none text-center font-black text-sm focus:ring-0 outline-none text-blue-600"
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  onBlur={() => setIsJumping(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsJumping(false);
                  }}
                />
                <span className="text-[10px] font-black text-slate-400">/ {slides.length}</span>
              </form>
            ) : (
              <button 
                onClick={() => {
                  setIsJumping(true);
                  setJumpInput((currentSlide + 1).toString());
                }}
                className="px-4 text-slate-900 font-black text-sm tracking-tight select-none text-center hover:text-blue-600 transition-colors group relative flex flex-col items-center"
                title="Jump to slide (G)"
              >
                <span className="leading-none">{currentSlide + 1}</span>
                <span className="text-[9px] text-slate-400 leading-none mt-0.5 opacity-60">of {slides.length}</span>
              </button>
            )}
          </div>

          <button 
            onClick={nextSlide}
            className={`p-3 rounded-full transition-all duration-300 ${currentSlide === slides.length - 1 ? 'opacity-20 scale-90 pointer-events-none' : 'text-slate-700 hover:bg-slate-100 active:scale-90'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default App;