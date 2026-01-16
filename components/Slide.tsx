import React, { useState } from 'react';
import { SlideData, SectionContent, ChartItem } from '../types';

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  index: number;
  currentIndex: number;
  totalSlides: number;
  isAuthoringMode: boolean;
  isGenerating?: boolean;
  onRegenerate?: () => void;
  onUpdate?: (updates: Partial<SlideData>) => void;
  onReset?: () => void;
}

const Slide: React.FC<SlideProps> = ({ 
  slide, 
  isActive, 
  index, 
  currentIndex, 
  totalSlides, 
  isAuthoringMode, 
  isGenerating, 
  onRegenerate,
  onUpdate,
  onReset
}) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const offset = index - currentIndex;
  
  const baseClasses = `
    flex flex-col md:flex-row h-full w-full absolute inset-0
    transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
    backface-hidden
  `;

  let transformStyles: React.CSSProperties = {};
  
  if (isActive) {
    transformStyles = {
      transform: 'translateX(0) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 10,
    };
  } else if (offset > 0) {
    transformStyles = {
      transform: `translateX(${offset * 100}%) rotateY(-45deg) scale(0.8)`,
      opacity: 0,
      zIndex: 0,
    };
  } else {
    transformStyles = {
      transform: `translateX(${offset * 100}%) rotateY(45deg) scale(0.8)`,
      opacity: 0,
      zIndex: 0,
    };
  }

  const currentImageUrl = slide.generatedImageUrl || slide.imageUrl;

  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      const isHtml = /<[a-z][\s\S]*>/i.test(content);
      if (isHtml) {
        return <div className="text-slate-600 leading-relaxed text-lg prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      return <p className="text-slate-600 leading-relaxed text-lg">{content}</p>;
    }

    if (Array.isArray(content)) {
      if (content.length > 0 && typeof content[0] === 'object' && 'label' in content[0]) {
        return (
          <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm my-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-sm font-bold text-slate-700 uppercase tracking-wider">Metric / Term</th>
                  <th className="px-4 py-3 text-sm font-bold text-slate-700 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {content.map((item: any, i: number) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900 align-top w-1/3">{item.label}</td>
                    <td className="px-4 py-3 text-slate-600 align-top">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <ul className="space-y-4">
          {content.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-600 text-lg">
              <span className="text-blue-500 font-bold">•</span>
              <span>{typeof item === 'string' ? item : JSON.stringify(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    const structured = content as SectionContent;
    if (structured.type === 'chart') {
      const chartData = structured.data as ChartItem[];
      const maxVal = Math.max(...chartData.map(d => Math.max(d.value, d.secondaryValue || 0)));
      
      return (
        <div className="space-y-6 my-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          {chartData.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>{item.label}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">{item.value}{item.unit || ''}</span>
                  {item.secondaryValue !== undefined && (
                    <span className="text-slate-400">{item.secondaryValue}{item.unit || ''}</span>
                  )}
                </div>
              </div>
              <div className="relative h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                 {item.secondaryValue !== undefined && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-slate-300 transition-all duration-1000 ease-out"
                    style={{ width: `${(item.secondaryValue / maxVal) * 100}%`, zIndex: 5 }}
                  ></div>
                )}
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  style={{ width: `${(item.value / maxVal) * 100}%`, zIndex: 10 }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const insertHtml = (sIdx: number, tag: string) => {
    const newSections = [...(slide.sections || [])];
    const currentContent = newSections[sIdx].content as string;
    let newContent = '';
    
    if (tag === 'ul') {
      newContent = `${currentContent}\n<ul class="list-disc pl-5 space-y-2">\n  <li>New Item</li>\n</ul>`;
    } else if (tag === 'li') {
      newContent = `${currentContent}\n  <li>New Item</li>`;
    } else if (tag === 'b') {
      newContent = `${currentContent}<b>Bold Text</b>`;
    } else if (tag === 'i') {
      newContent = `${currentContent}<i>Italic Text</i>`;
    }

    newSections[sIdx] = { ...newSections[sIdx], content: newContent };
    onUpdate?.({ sections: newSections });
  };

  const ImageColumn = () => (
    <div className="w-full md:w-1/2 h-[30vh] md:h-full relative overflow-hidden shadow-2xl bg-slate-800 group vignette">
      {isGenerating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/80 z-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium animate-pulse tracking-wide">Refining Scene Geometry...</p>
        </div>
      ) : null}

      <img 
        src={currentImageUrl} 
        alt={slide.title} 
        className={`absolute inset-0 w-full h-full object-cover animate-ken-burns transition-opacity duration-1000 ${isGenerating ? 'opacity-30' : 'opacity-100'}`}
      />
      
      <div className="absolute inset-0 aurora-overlay opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 shimmer-sweep"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-8 text-white z-10 hidden md:block">
         <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 inline-block border border-white/20 shadow-2xl">
            <span className="text-sm font-bold tracking-widest uppercase text-blue-200 drop-shadow-md">Slide {index + 1} of {totalSlides}</span>
         </div>
      </div>
    </div>
  );

  const EditorView = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Edit Slide Content</h2>
        <div className="flex gap-2">
            <button 
                onClick={() => {
                  if (confirm("Restore this slide to its original project default?")) {
                    onReset?.();
                  }
                }}
                className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                title="Revert to initial constant values"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Restore Defaults
            </button>
            <button 
                onClick={() => setIsEditingContent(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all"
            >
                Finish Editing
            </button>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Slide Title</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
            value={slide.title}
            onChange={(e) => onUpdate?.({ title: e.target.value })}
          />
        </div>

        {slide.type === 'cover' && (
          <>
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subtitle</label>
                <textarea 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                rows={3}
                value={slide.subtitle}
                onChange={(e) => onUpdate?.({ subtitle: e.target.value })}
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Author / Organization & Contacts</label>
                    <textarea 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        rows={4}
                        value={slide.author || ''}
                        onChange={(e) => onUpdate?.({ author: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        value={slide.date || ''}
                        onChange={(e) => onUpdate?.({ date: e.target.value })}
                    />
                </div>
            </div>
          </>
        )}

        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Manual Image URL Override</label>
            <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs font-mono"
                placeholder="https://..."
                value={slide.imageUrl}
                onChange={(e) => onUpdate?.({ imageUrl: e.target.value, generatedImageUrl: undefined })}
            />
        </div>

        {slide.sections?.map((section, sIdx) => (
          <div key={sIdx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Section Heading</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-semibold text-blue-800"
                value={section.heading || ''}
                onChange={(e) => {
                  const newSections = [...(slide.sections || [])];
                  newSections[sIdx] = { ...newSections[sIdx], heading: e.target.value };
                  onUpdate?.({ sections: newSections });
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Section Content (HTML Supported)</label>
                {typeof section.content === 'string' && (
                  <div className="flex gap-1">
                    <button onClick={() => insertHtml(sIdx, 'ul')} className="text-[9px] bg-slate-200 hover:bg-slate-300 px-1.5 py-0.5 rounded font-bold">UL</button>
                    <button onClick={() => insertHtml(sIdx, 'li')} className="text-[9px] bg-slate-200 hover:bg-slate-300 px-1.5 py-0.5 rounded font-bold">LI</button>
                    <button onClick={() => insertHtml(sIdx, 'b')} className="text-[9px] bg-slate-200 hover:bg-slate-300 px-1.5 py-0.5 rounded font-bold">B</button>
                    <button onClick={() => insertHtml(sIdx, 'i')} className="text-[9px] bg-slate-200 hover:bg-slate-300 px-1.5 py-0.5 rounded font-bold">I</button>
                  </div>
                )}
              </div>
              
              {typeof section.content === 'string' ? (
                <textarea 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm leading-relaxed font-mono"
                  rows={6}
                  value={section.content}
                  onChange={(e) => {
                    const newSections = [...(slide.sections || [])];
                    newSections[sIdx] = { ...newSections[sIdx], content: e.target.value };
                    onUpdate?.({ sections: newSections });
                  }}
                />
              ) : (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-[10px] font-bold text-blue-500 uppercase">
                  Complex content (Charts/Tables) must be edited via global config import for safety.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContentView = () => {
    if (slide.type === 'cover') {
      const authors = slide.author?.split('\n') || [];
      return (
        <div className="flex flex-col justify-center h-full space-y-10 md:space-y-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-blue-400"></div>
                <div className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em]">
                Strategic Advisory Framework
                </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.9]">
              {slide.title.split(' and ').map((part, i) => (
                <span key={i} className="block">
                  {i > 0 && <span className="text-blue-400">& </span>}
                  {part}
                </span>
              ))}
            </h1>
          </div>
          
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl text-white font-light leading-snug border-l-8 border-blue-400 pl-8 py-2 max-w-xl">
              {slide.subtitle}
            </p>
          </div>

          <div className="space-y-8 pt-12 border-t border-white/10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Expert Working Group
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {authors.map((auth, i) => {
                   const cleanAuth = auth.replace('• ', '').trim();
                   if (!cleanAuth) return null;
                   const [name, email] = cleanAuth.split(' – ');
                   return (
                     <div key={i} className="group p-5 rounded-3xl bg-white/5 border border-white/10 shadow-sm hover:bg-white/10 hover:border-blue-400/50 hover:-translate-y-1 transition-all">
                        <p className="font-extrabold text-white text-base mb-1">{name}</p>
                        <p className="text-blue-300 text-[11px] font-medium tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{email}</p>
                     </div>
                   );
                })}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-12 pb-24 md:pb-32">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Project Cycle</span>
                  <span className="text-lg font-black text-white">FY 2026/27</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Publication Date</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-white bg-blue-600/30 px-4 py-2 rounded-2xl border border-blue-400/30 shadow-lg backdrop-blur-md">{slide.date}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-start justify-between">
          <h2 className={`text-3xl md:text-5xl font-bold text-slate-900 mb-8 border-b-4 border-blue-600 pb-4 inline-block w-fit tracking-tight`}>
            {slide.title}
          </h2>
          {isAuthoringMode && isActive && (
            <button 
              onClick={() => setIsEditingContent(true)}
              className="p-2 bg-slate-100 hover:bg-blue-100 rounded-xl text-slate-400 hover:text-blue-600 transition-all group/btn"
              title="Edit Slide Content"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:rotate-12 transition-transform"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </button>
          )}
        </div>

        <div className="space-y-8">
          {slide.sections?.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.heading && (
                <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {section.heading}
                </h3>
              )}
              
              {renderContent(section.content)}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-12 border-t border-slate-100 text-slate-400 text-sm italic pb-12">
          For client internal purposes only. Not for external publication.
        </div>
      </>
    );
  };

  return (
    <div className={baseClasses} style={transformStyles}>
      <ImageColumn />
      <div className={`w-full md:w-1/2 h-[70vh] md:h-full ${slide.type === 'cover' ? 'bg-gradient-to-br from-[#001c3d] via-[#002a5c] to-[#00367a]' : 'bg-white'} overflow-y-auto custom-scrollbar flex flex-col px-8 md:px-20 py-12 md:py-24`}>
        <div className="max-w-3xl mx-auto w-full h-full relative">
          {isEditingContent && isAuthoringMode ? <EditorView /> : <ContentView />}
        </div>
      </div>
    </div>
  );
};

export default Slide;