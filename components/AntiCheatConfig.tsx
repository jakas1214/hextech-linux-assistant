import React, { useState } from 'react';
import { LinuxDistro, ScriptResponse } from '../types';
import { generateAntiCheatConfig } from '../services/geminiService';
import Button from './Button';
import TerminalBlock from './TerminalBlock';
import { Shield, Lock, Activity, Loader2, FileCode, AlertOctagon } from 'lucide-react';

const AntiCheatConfig: React.FC = () => {
  const [distro, setDistro] = useState<LinuxDistro>(LinuxDistro.UBUNTU);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResponse | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    const data = await generateAntiCheatConfig(distro);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 border border-[#c8aa6e] bg-[#091428] rounded-full">
          <Shield size={32} className="text-[#c8aa6e]" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-[#f0e6d2] tracking-wider mb-1">
            Vanguard Protocol
          </h2>
          <p className="text-[#a09b8c]">
            System compliance check and safe configuration for Anti-Cheat.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#091428] border border-[#1e2328] p-6">
             <label className="block text-[#c8aa6e] font-display uppercase tracking-widest text-xs mb-3">
              Target System
            </label>
            <div className="space-y-2 mb-6">
              {Object.values(LinuxDistro).map((d) => (
                <button
                  key={d}
                  onClick={() => setDistro(d)}
                  className={`w-full text-left px-4 py-3 border transition-all duration-200 text-sm ${
                    distro === d 
                      ? 'border-[#0ac8b9] bg-[#0ac8b9]/10 text-[#0ac8b9]' 
                      : 'border-[#3c3c41] text-[#a09b8c] hover:border-[#c8aa6e] hover:text-[#f0e6d2]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={loading} 
              className="w-full"
              variant="danger"
              icon={loading ? <Loader2 className="animate-spin" /> : <Activity />}
            >
              {loading ? 'Scanning...' : 'Calibrate System'}
            </Button>
          </div>

          <div className="bg-[#1a0505] border border-red-900/50 p-4">
            <h4 className="flex items-center gap-2 text-red-500 font-bold text-sm mb-2">
              <AlertOctagon size={16} /> BAN RISK WARNING
            </h4>
            <p className="text-xs text-red-400/80 leading-relaxed">
              Hextech Assistant prioritizes account safety. We do NOT provide bypasses for Vanguard. 
              The generated scripts only verify "Legitimate" settings (TPM, Secure Boot) to prevent account flagging.
            </p>
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-2 min-h-[500px] relative bg-[#010a13] border border-[#1e2328]">
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#5c5b57] p-8 text-center">
              <Shield size={64} className="mb-4 opacity-20" />
              <p className="font-display uppercase tracking-wider text-lg">System Standby</p>
              <p className="text-sm mt-2 max-w-xs">Select your distribution and initiate calibration to receive safety diagnostic data.</p>
            </div>
          )}

          {loading && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010a13]/90 z-20">
               <div className="relative">
                 <div className="w-20 h-20 border-t-4 border-b-4 border-[#c8aa6e] rounded-full animate-spin"></div>
                 <div className="w-16 h-16 border-l-4 border-r-4 border-[#0ac8b9] rounded-full animate-spin absolute top-2 left-2 reverse-spin"></div>
               </div>
               <p className="mt-6 text-[#c8aa6e] font-display tracking-widest animate-pulse">Analyzing Security Compliance...</p>
             </div>
          )}

          {result && (
            <div className="p-6 h-full overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
              <div className="mb-6 pb-6 border-b border-[#3c3c41]">
                <h3 className="font-display text-[#0ac8b9] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileCode size={20} />
                  System Analysis
                </h3>
                <div className="prose prose-invert prose-sm max-w-none text-[#a09b8c]">
                  <p className="whitespace-pre-wrap">{result.instructions}</p>
                </div>
              </div>
              
              <TerminalBlock content={result.script} title="SAFETY_CHECK.SH" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AntiCheatConfig;