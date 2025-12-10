import React, { useState } from 'react';
import { LinuxDistro, InstallMethod, ScriptResponse } from '../types';
import { generateInstallGuide } from '../services/geminiService';
import Button from './Button';
import TerminalBlock from './TerminalBlock';
import { Cpu, Download, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';

const InstallWizard: React.FC = () => {
  const [distro, setDistro] = useState<LinuxDistro>(LinuxDistro.UBUNTU);
  const [method, setMethod] = useState<InstallMethod>(InstallMethod.LUTRIS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResponse | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const data = await generateInstallGuide(distro, method);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-display font-bold text-[#f0e6d2] tracking-wider mb-2">
          Installation Protocol
        </h2>
        <p className="text-[#a09b8c]">
          Configure your environment to generate a compatible deployment script.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Configuration Panel */}
        <div className="bg-[#091428] border border-[#1e2328] p-6 relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent opacity-50"></div>
          
          <div className="mb-6">
            <label className="block text-[#c8aa6e] font-display uppercase tracking-widest text-xs mb-3">
              Operating System
            </label>
            <div className="space-y-2">
              {Object.values(LinuxDistro).map((d) => (
                <button
                  key={d}
                  onClick={() => setDistro(d)}
                  className={`w-full text-left px-4 py-3 border transition-all duration-200 flex items-center justify-between ${
                    distro === d 
                      ? 'border-[#0ac8b9] bg-[#0ac8b9]/10 text-[#0ac8b9]' 
                      : 'border-[#3c3c41] text-[#a09b8c] hover:border-[#c8aa6e] hover:text-[#f0e6d2]'
                  }`}
                >
                  <span className="font-medium">{d}</span>
                  {distro === d && <Cpu size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-[#c8aa6e] font-display uppercase tracking-widest text-xs mb-3">
              Deployment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(InstallMethod).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-2 border text-xs font-medium uppercase transition-all duration-200 ${
                    method === m
                      ? 'border-[#0ac8b9] bg-[#0ac8b9]/10 text-[#0ac8b9]'
                      : 'border-[#3c3c41] text-[#a09b8c] hover:border-[#c8aa6e] hover:text-[#f0e6d2]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading} 
            className="w-full"
            icon={loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          >
            {loading ? 'Initializing Core...' : 'Generate Script'}
          </Button>
        </div>

        {/* Results Panel */}
        <div className="relative min-h-[400px]">
          {!result && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#5c5b57] border-2 border-dashed border-[#3c3c41] bg-[#010a13]/50 p-8 text-center">
              <Download size={48} className="mb-4 opacity-50" />
              <p className="font-display uppercase tracking-wider text-lg">Awaiting Input</p>
              <p className="text-sm mt-2">Select your parameters to begin.</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0ac8b9] bg-[#010a13]/80 z-10 border border-[#0ac8b9]/30">
              <div className="w-16 h-16 border-4 border-[#0ac8b9] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-mono text-sm animate-pulse">Contacting Hextech Network...</p>
            </div>
          )}

          {result && (
            <div className="animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col gap-4">
              <div className="bg-[#1e2328] p-4 border-l-4 border-[#c8aa6e]">
                <h3 className="font-display text-[#f0e6d2] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-[#c8aa6e]" />
                  Instructions
                </h3>
                <p className="text-[#a09b8c] text-sm whitespace-pre-wrap">{result.instructions}</p>
              </div>
              
              <TerminalBlock content={result.script} title={`INSTALL_${distro.replace(/\s/g, '_').toUpperCase()}.SH`} />
              
              <div className="mt-auto text-xs text-[#5c5b57] text-center font-mono">
                * Always review scripts generated by AI before executing with sudo privileges.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallWizard;