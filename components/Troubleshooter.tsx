import React, { useState, useRef, useEffect } from 'react';
import { LinuxDistro, ChatMessage } from '../types';
import { diagnoseIssue } from '../services/geminiService';
import Button from './Button';
import { MessageSquare, Send, Bot, User, Cpu, Trash2 } from 'lucide-react';

const Troubleshooter: React.FC = () => {
  const [distro, setDistro] = useState<LinuxDistro>(LinuxDistro.UBUNTU);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Systems online. Detecting League of Legends configuration anomalies. Please provide your error logs or describe the issue.",
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await diagnoseIssue(
      distro, 
      userMsg.content,
      history.map(h => ({ role: h.role, content: h.content }))
    );

    const assistantMsg: ChatMessage = { role: 'assistant', content: responseText };
    setHistory(prev => [...prev, assistantMsg]);
    setLoading(false);
  };

  const handleClear = () => {
    setHistory([{
      role: 'assistant',
      content: "Memory purged. Ready for new diagnostics.",
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] min-h-[600px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#f0e6d2] tracking-wider">
            Hextech Diagnostics
          </h2>
          <p className="text-[#a09b8c]">AI-powered error analysis and repair.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={distro}
            onChange={(e) => setDistro(e.target.value as LinuxDistro)}
            className="bg-[#091428] border border-[#3c3c41] text-[#c8aa6e] text-sm px-3 py-2 focus:outline-none focus:border-[#c8aa6e]"
          >
            {Object.values(LinuxDistro).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button 
            onClick={handleClear}
            className="p-2 text-[#5c5b57] hover:text-red-500 transition-colors"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#091428] border border-[#1e2328] relative flex flex-col overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#c8aa6e]"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#c8aa6e]"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#c8aa6e]"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#c8aa6e]"></div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#0ac8b9]/10 border border-[#0ac8b9] flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-[#0ac8b9]" />
                </div>
              )}

              <div className={`max-w-[80%] p-4 border ${
                msg.role === 'user' 
                  ? 'bg-[#1e2328] border-[#c8aa6e] text-[#f0e6d2]' 
                  : 'bg-[#010a13] border-[#3c3c41] text-[#a09b8c]'
              }`}>
                 <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#c8aa6e]/10 border border-[#c8aa6e] flex items-center justify-center shrink-0">
                  <User size={16} className="text-[#c8aa6e]" />
                </div>
              )}
            </div>
          ))}
          {loading && (
             <div className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-[#0ac8b9]/10 border border-[#0ac8b9] flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-[#0ac8b9]" />
                </div>
                <div className="bg-[#010a13] border border-[#3c3c41] p-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0ac8b9] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#0ac8b9] rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-[#0ac8b9] rounded-full animate-bounce delay-200"></div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#010a13] border-t border-[#3c3c41]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Paste error logs or describe the problem..."
              className="flex-1 bg-[#091428] border border-[#3c3c41] text-[#f0e6d2] px-4 py-3 focus:outline-none focus:border-[#0ac8b9] transition-colors"
            />
            <Button onClick={handleSend} disabled={loading || !input.trim()} icon={<Send size={16} />}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooter;