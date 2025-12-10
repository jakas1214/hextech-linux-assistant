import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface TerminalBlockProps {
  content: string;
  title?: string;
}

const TerminalBlock: React.FC<TerminalBlockProps> = ({ content, title = "BASH SCRIPT" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-sm overflow-hidden border border-[#3c3c41] bg-[#010a13] shadow-lg my-4 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e2328] border-b border-[#3c3c41]">
        <div className="flex items-center gap-2 text-[#a09b8c]">
          <Terminal size={14} />
          <span className="uppercase tracking-wide text-xs">{title}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1 text-[#c8aa6e] hover:text-white transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="text-xs uppercase">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-[#0ac8b9] whitespace-pre-wrap leading-relaxed">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default TerminalBlock;