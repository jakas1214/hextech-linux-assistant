import React, { useState } from 'react';
import { AppView } from './types';
import InstallWizard from './components/InstallWizard';
import Troubleshooter from './components/Troubleshooter';
import AntiCheatConfig from './components/AntiCheatConfig';
import Button from './components/Button';
import { Terminal, Wrench, Shield, Monitor, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.INSTALL:
        return <InstallWizard />;
      case AppView.TROUBLESHOOT:
        return <Troubleshooter />;
      case AppView.ANTICHEAT:
        return <AntiCheatConfig />;
      case AppView.HOME:
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 relative">
               <div className="absolute inset-0 bg-[#0ac8b9] blur-[100px] opacity-10"></div>
               <Monitor size={80} className="text-[#c8aa6e] relative z-10 mx-auto mb-6" />
               <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] mb-4">
                 HEX TECH LINUX
               </h1>
               <p className="text-xl md:text-2xl text-[#a09b8c] font-display uppercase tracking-widest">
                 League of Legends Deployment Assistant
               </p>
            </div>

            <p className="text-[#a09b8c] max-w-2xl mb-12 leading-relaxed">
              Experience the Rift on your preferred Linux distribution. 
              Utilize advanced Hextech AI algorithms to generate installation scripts, 
              configure Wine/Proton layers, and diagnose runtime anomalies.
            </p>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
              <div className="flex-1">
                <Button 
                  onClick={() => setCurrentView(AppView.INSTALL)} 
                  className="w-full h-16 text-lg"
                  icon={<Terminal />}
                >
                  Initiate Install
                </Button>
                <p className="text-xs text-[#5c5b57] mt-2 uppercase tracking-wide">Generate Setup Scripts</p>
              </div>
              
              <div className="flex-1">
                <Button 
                  onClick={() => setCurrentView(AppView.ANTICHEAT)} 
                  className="w-full h-16 text-lg"
                  icon={<Shield />}
                >
                  Anti-Cheat
                </Button>
                <p className="text-xs text-[#5c5b57] mt-2 uppercase tracking-wide">Vanguard Config</p>
              </div>

              <div className="flex-1">
                <Button 
                  onClick={() => setCurrentView(AppView.TROUBLESHOOT)} 
                  variant="secondary"
                  className="w-full h-16 text-lg"
                  icon={<Wrench />}
                >
                  Diagnostics
                </Button>
                 <p className="text-xs text-[#5c5b57] mt-2 uppercase tracking-wide">Fix Runtime Errors</p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 border border-[#1e2328] bg-[#091428]/50">
                <Shield className="text-[#0ac8b9] mb-3" />
                <h3 className="font-display text-[#f0e6d2] mb-2">Secure Scripts</h3>
                <p className="text-sm text-[#a09b8c]">AI-generated bash scripts tailored to your specific kernel and package manager.</p>
              </div>
              <div className="p-4 border border-[#1e2328] bg-[#091428]/50">
                <Lock className="text-[#c8aa6e] mb-3" />
                <h3 className="font-display text-[#f0e6d2] mb-2">Vanguard Ready</h3>
                <p className="text-sm text-[#a09b8c]">Tools to audit Secure Boot and TPM settings required for modern anti-cheat.</p>
              </div>
               <div className="p-4 border border-[#1e2328] bg-[#091428]/50">
                <Wrench className="text-[#0ac8b9] mb-3" />
                <h3 className="font-display text-[#f0e6d2] mb-2">Error Repair</h3>
                <p className="text-sm text-[#a09b8c]">Paste your wine logs and let the Hextech Core identify missing libraries.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 z-0 bg-[url('https://picsum.photos/seed/hextech/1920/1080')] bg-cover bg-center opacity-5 pointer-events-none mix-blend-overlay"></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#010a13] via-[#010a13] to-[#091428] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#3c3c41] bg-[#010a13]/80 backdrop-blur-md h-16 flex items-center justify-between px-6">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentView(AppView.HOME)}
        >
          <div className="w-8 h-8 bg-[#c8aa6e] rotate-45 group-hover:rotate-90 transition-transform duration-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#010a13] -rotate-45"></div>
          </div>
          <span className="font-display font-bold text-[#f0e6d2] tracking-wider text-xl group-hover:text-[#c8aa6e] transition-colors">
            H.L.A.
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setCurrentView(AppView.INSTALL)}
            className={`text-sm uppercase tracking-widest hover:text-[#0ac8b9] transition-colors ${currentView === AppView.INSTALL ? 'text-[#0ac8b9]' : 'text-[#a09b8c]'}`}
          >
            Install
          </button>
          <button 
            onClick={() => setCurrentView(AppView.ANTICHEAT)}
            className={`text-sm uppercase tracking-widest hover:text-[#0ac8b9] transition-colors ${currentView === AppView.ANTICHEAT ? 'text-[#0ac8b9]' : 'text-[#a09b8c]'}`}
          >
            Anti-Cheat
          </button>
          <button 
            onClick={() => setCurrentView(AppView.TROUBLESHOOT)}
            className={`text-sm uppercase tracking-widest hover:text-[#0ac8b9] transition-colors ${currentView === AppView.TROUBLESHOOT ? 'text-[#0ac8b9]' : 'text-[#a09b8c]'}`}
          >
            Diagnostics
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6 flex flex-col">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#3c3c41] bg-[#010a13] py-6 text-center">
        <p className="text-[#5c5b57] text-xs font-mono">
          PROTOTYPE BUILD V.0.9 // NOT AFFILIATED WITH RIOT GAMES
        </p>
      </footer>
    </div>
  );
};

export default App;