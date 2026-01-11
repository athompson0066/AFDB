
import React from 'react';
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
}

const Slide: React.FC<SlideProps> = ({ slide, isActive, index, currentIndex, totalSlides, isAuthoringMode, isGenerating, onRegenerate }) => {
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
          {structured.chartType === 'grouped-bar' && (
            <div className="flex gap-6 mt-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Primary Metric
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 rounded-sm"></div> Comparative Metric
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const ImageColumn = () => (
    <div className="w-full md:w-1/2 h-[30vh] md:h-full relative overflow-hidden shadow-2xl bg-slate-800 group">
      {isGenerating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/80 z-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium animate-pulse tracking-wide">Refining Scene Geometry...</p>
        </div>
      ) : null}

      {isAuthoringMode && slide.generatedImageUrl && !isGenerating && isActive && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRegenerate?.();
          }}
          className="absolute top-4 right-4 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md p-2 rounded-full border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          title="Regenerate this image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        </button>
      )}

      <img 
        src={currentImageUrl} 
        alt={slide.title} 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isGenerating ? 'opacity-30' : 'opacity-100'}`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-8 text-white z-10 hidden md:block">
         <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 inline-block border border-white/30">
            <span className="text-sm font-semibold tracking-widest uppercase">Slide {index + 1} of {totalSlides}</span>
         </div>
      </div>
    </div>
  );

  if (slide.type === 'cover') {
    return (
      <div className={baseClasses} style={transformStyles}>
        <ImageColumn />
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white flex flex-col justify-center px-8 md:px-16 space-y-6">
          <div className="space-y-2">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Official Report</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              {slide.title}
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-slate-600 font-medium">
            {slide.subtitle}
          </h2>
          <div className="pt-8 border-t border-slate-100 space-y-2">
            <p className="text-slate-500 italic">{slide.author}</p>
            <p className="text-slate-400 font-semibold">{slide.date}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={baseClasses} style={transformStyles}>
      <ImageColumn />
      <div className="w-full md:w-1/2 h-[70vh] md:h-full bg-white overflow-y-auto custom-scrollbar flex flex-col px-8 md:px-16 py-12 md:py-24">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b-4 border-blue-600 pb-4 inline-block w-fit">
            {slide.title}
          </h2>
          
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

          <div className="mt-12 pt-12 border-t border-slate-100 text-slate-400 text-sm italic">
            For client internal purposes only. Not for external publication.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
