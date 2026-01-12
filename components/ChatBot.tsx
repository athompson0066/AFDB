
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const BOT_IMAGE = "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/6d0d06ce-e8a5-434e-a633-a4893841b6a3/2022-08-10-Trinet-Henderson-Tiara-1485.jpg";
const BOT_NAME = "Linda Quaynor";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Good day. I am **${BOT_NAME}**. I am pleased to assist you with any inquiries regarding the **Google** and **AFDB** Affordable Device Financing Model Project. 

This research framework outlines strategic interventions for bridging the usage gap in Sub-Saharan Africa, with a primary focus on the **Nigeria** pilot. 

How may I provide strategic clarity for you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIdx) => {
      const isListItem = line.trim().startsWith('* ');
      const cleanLine = isListItem ? line.trim().substring(2) : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx} className="font-bold text-blue-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <li key={lineIdx} className="ml-4 mb-2 list-disc list-outside text-slate-700">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={lineIdx} className={line.trim() === '' ? 'h-3' : 'mb-3 text-slate-700 leading-relaxed'}>
          {renderedLine}
        </p>
      );
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are Linda Quaynor, a Senior Project Expert and Advisor for the Google and AFDB Device Financing Project. 
          Your tone is professional, authoritative, and data-driven. 
          Use the following context from the project report to answer questions:
          - Project Goal: Designing a scalable model to accelerate smartphone access in Nigeria.
          - The Problem: 80M Nigerians are unconnected; 4G handsets cost >80% of monthly income for the poorest 20%.
          - Core Barriers: Affordability, Digital Literacy, and Gender gap (32% in SSA).
          - Proposed Models: (1) Blended Finance BNPL (repaid over 6-12 months for consumers >$5 DDI) and (2) Smartphone-as-a-Service Subscription (Lease model for <$1.39 DDI).
          - Pilot States: Focus on high 4G coverage but low penetration (e.g., Kano, Kaduna, Imo, Osun). States with >100% penetration like Lagos are excluded from the initial pilot.
          - Key Partners: AfDB (funding/de-risking), Google (Android/skills), MNOs like MTN, and Fintechs.
          - Success Metrics: 30% of unconnected Nigerians (24M) migrating to smartphones within 5 years.
          
          FORMATTING RULES:
          - Use **double asterisks** for emphasis on critical data or entities.
          - Use * for bulleted lists.
          - Keep responses concise and focused on the report's strategic findings.`
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I apologize, I couldn't process that response." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I am currently experiencing a connectivity issue. Please retry your inquiry shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-36 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[450px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-top-4 zoom-in-95 duration-200 pointer-events-auto">
          {/* Header */}
          <div className="bg-blue-600 p-5 flex items-center gap-3 text-white shadow-lg z-10">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-inner">
              <img src={BOT_IMAGE} className="w-full h-full object-cover" alt={BOT_NAME} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{BOT_NAME}</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold">Project Lead & Advisor</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto p-2 hover:bg-white/10 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 18 12-12"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-5 py-4 rounded-2xl text-sm shadow-sm border ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white border-blue-500 rounded-br-none' 
                    : 'bg-white text-slate-800 border-slate-100 rounded-bl-none'
                }`}>
                  {msg.role === 'model' ? (
                    <div className="prose prose-sm max-w-none">
                      {renderFormattedText(msg.text)}
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Inquire about project specifics..." 
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 disabled:opacity-40 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-500 transition-all active:scale-95 border-4 border-white/20 pointer-events-auto"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 18 12-12"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
