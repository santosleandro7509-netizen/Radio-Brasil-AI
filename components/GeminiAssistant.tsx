
import React, { useState, useRef, useEffect } from 'react';
import { getMusicAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { ICONS } from '../constants';

interface GeminiAssistantProps {
  currentStationName?: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ currentStationName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Olá! Sou o Brasil Mix AI. Quer saber algo sobre MPB, Samba ou quer uma recomendação musical de acordo com seu humor?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getMusicAssistantResponse(userMsg, currentStationName);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="glass rounded-3xl p-6 flex flex-col h-[500px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
          <ICONS.Sparkles />
        </div>
        <h3 className="text-lg font-outfit font-bold">Assistente Brasil Mix</h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-zinc-800 text-zinc-300 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-zinc-400 rounded-2xl rounded-tl-none p-4 text-xs italic animate-pulse">
              Sintonizando conhecimento...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte sobre música brasileira..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-white text-black font-bold px-4 py-2 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default GeminiAssistant;
