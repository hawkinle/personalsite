import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUGS = [
  { 
    id: '999999', 
    emoji: '🤡', 
    label: 'ERROR 999999', 
    color: 'bg-red-500', 
    msg: 'POOF!',
    desc: "The 'Check Engine' light of GIS. Something failed, and it's not telling you why."
  },
  { 
    id: 'lock', 
    emoji: '🔒', 
    label: 'SCHEMA LOCK', 
    color: 'bg-yellow-500', 
    msg: 'UNLOCKED!',
    desc: "A hidden process is hugging your database and won't let go. Ever."
  },
  { 
    id: 'atlantic', 
    emoji: '🏝️', 
    label: 'ATLANTIC_SHIFT', 
    color: 'bg-blue-600', 
    msg: 'RE-PROJECTED!',
    desc: "Your layers just landed at (0,0) in the Atlantic Ocean. Check your CRS!"
  },
  { 
    id: 'zombie', 
    emoji: '🧟', 
    label: 'ZOMBIE_TASK', 
    color: 'bg-green-600', 
    msg: 'KILLED!',
    desc: "Background geoprocessing is at 100% but refuses to actually finish."
  },
  { 
    id: 'intersect', 
    emoji: '✂️', 
    label: 'SELF_INTERSECT', 
    color: 'bg-orange-500', 
    msg: 'VALIDATED!',
    desc: "A polygon line crossed itself by 0.00001mm. Topology is now a nightmare."
  },
  { 
    id: 'license', 
    emoji: '🔑', 
    label: 'LICENSE_TIMEOUT', 
    color: 'bg-purple-500', 
    msg: 'RENEWED!',
    desc: "The license server can't see you. Hope you saved your work 10 mins ago."
  },
];

const ComicPop = ({ x, y, text }: { x: number, y: number, text: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -20, opacity: 1 }}
    animate={{ scale: 2.5, rotate: 10, opacity: 0 }}
    style={{ left: x, top: y }}
    className="absolute pointer-events-none z-50 font-black text-2xl text-yellow-400 italic select-none drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
  >
    {text}
  </motion.div>
);

export const GISGame = () => {
  const [score, setScore] = useState(0);
  const [activeBug, setActiveBug] = useState<{index: number, type: typeof BUGS[0]} | null>(null);
  const [pops, setPops] = useState<{ id: number, x: number, y: number, text: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHitting, setIsHitting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 9);
        const randomBug = BUGS[Math.floor(Math.random() * BUGS.length)];
        setActiveBug({ index: randomIndex, type: randomBug });
      }, 900);
    } else {
      setActiveBug(null);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const whack = (index: number, e: React.MouseEvent) => {
    setIsHitting(true);
    setTimeout(() => setIsHitting(false), 100);
    
    if (isPlaying && activeBug?.index === index) {
      setScore(s => s + 500);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newPop = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: activeBug.type.msg
      };
      setPops(prev => [...prev, newPop]);
      setActiveBug(null);
      setTimeout(() => setPops(prev => prev.filter(p => p.id !== newPop.id)), 600);
    }
  };

  return (
    <section className="py-24 px-4 bg-[#020617] relative overflow-hidden group/arcade cursor-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Intro Narrative */}
        <div className="max-w-3xl text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-4 italic italic tracking-tight">Software is serious, but it shouldn't be solemn.</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            I built this arcade because I believe that technical resilience comes from a place of curiosity and, occasionally, a bit of healthy frustration. 
            In my work—whether it's managing $200M projects or architecting spatial data—I've found that humor is often the best debugger for complex team dynamics. 
            This is my small attempt to pay homage to the GIS bugs that have tested our patience over the years.
          </p>
        </div>

        {/* VINTAGE ARCADE CABINET */}
        <div className="relative w-full max-w-5xl pt-12 pb-4 bg-arcade-wood rounded-t-[4rem] rounded-b-[2rem] border-x-[16px] border-t-[16px] border-[#2d0f02] shadow-[0_50px_100px_rgba(0,0,0,0.9),inset_0_20px_40px_rgba(255,255,255,0.1)] overflow-hidden">
          
          {/* MARQUEE */}
          <div className="mx-8 mb-8 bg-black border-4 border-[#1e293b] p-4 flex justify-center items-center relative overflow-hidden shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#ff00ff22,#00f2ff22)] animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white z-10 drop-shadow-[0_0_10px_rgba(0,242,255,0.8)] uppercase">
              GIS_<span className="text-tech-cyan">LEGACY_CRUSHER</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row bg-[#1e293b] p-4 md:p-8">
            
            {/* SIDE BEZEL - Lore & Instructions */}
            <div className="hidden lg:flex flex-col w-64 gap-4 mr-8">
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/40">
                <p className="text-[10px] font-mono text-tech-cyan uppercase mb-3 border-b border-tech-cyan/20 pb-1">Bestiary.exe</p>
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {activeBug ? (
                      <motion.div 
                        key={activeBug.type.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-2"
                      >
                        <p className="text-[11px] font-bold text-white font-mono">{activeBug.type.label}</p>
                        <p className="text-[9px] text-slate-400 font-mono leading-relaxed">{activeBug.type.desc}</p>
                      </motion.div>
                    ) : (
                      <p className="text-[9px] text-slate-600 font-mono italic">Waiting for unhandled exception...</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="glass p-4 rounded-2xl border-white/5 bg-black/40 flex-grow">
                <p className="text-[10px] font-mono text-slate-500 uppercase mb-2">Instructions</p>
                <div className="text-[9px] text-slate-400 space-y-2 font-mono">
                  <p>1. Whack rising bugs.</p>
                  <p>2. Stabilize the system.</p>
                  <p>3. Don't let the license expire.</p>
                </div>
              </div>
            </div>

            {/* THE MAIN SCREEN */}
            <div className="flex-grow relative bg-black rounded-3xl border-8 border-nature-950 shadow-[inset_0_0_100px_rgba(0,242,255,0.1)] overflow-hidden min-h-[500px] flex flex-col">
              
              {/* CRT EFFECTS */}
              <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.4)_100%)] shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]" />
              <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

              <div className="absolute inset-0 z-10 p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="bg-black/80 px-4 py-2 border-2 border-tech-cyan/20">
                    <p className="text-[10px] font-mono text-tech-cyan/60 uppercase">System_Score</p>
                    <p className="text-3xl font-black text-tech-cyan tabular-nums">{score.toString().padStart(6, '0')}</p>
                  </div>
                  <div className="text-right glass px-3 py-1 rounded border-white/5">
                    <p className="text-[10px] font-mono text-red-500 uppercase animate-pulse">Critical_Errors</p>
                    <p className="text-[8px] font-mono text-slate-500">USER: LEITH_HAWKINS</p>
                  </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                   {isPlaying ? (
                     <div className="grid grid-cols-3 gap-4 w-full max-w-md aspect-square py-4">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i} 
                            onMouseDown={(e) => whack(i, e)}
                            className="relative h-full aspect-square bg-nature-950 rounded-full border-b-2 border-slate-800 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] overflow-hidden"
                          >
                            <AnimatePresence>
                              {activeBug?.index === i && (
                                <motion.div
                                  initial={{ y: 80 }}
                                  animate={{ y: 5 }}
                                  exit={{ y: 80, scale: 0.5 }}
                                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                >
                                  <div className={`w-12 h-12 md:w-20 md:h-20 ${activeBug.type.color} rounded-t-full rounded-b-lg relative shadow-2xl flex items-center justify-center text-3xl md:text-5xl border-t-2 border-white/20`}>
                                    {activeBug.type.emoji}
                                    <div className="absolute top-1/4 left-1/4 w-2 h-3 bg-white rounded-full">
                                      <div className="w-1 h-1 bg-black rounded-full mx-auto mt-1" />
                                    </div>
                                    <div className="absolute top-1/4 right-1/4 w-2 h-3 bg-white rounded-full">
                                      <div className="w-1 h-1 bg-black rounded-full mx-auto mt-1" />
                                    </div>
                                  </div>
                                  <div className="mt-1 px-2 py-0.5 bg-black/90 rounded text-[7px] font-mono font-black text-white border border-white/10 uppercase">
                                    {activeBug.type.label}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <div className="absolute inset-0 pointer-events-none z-20">
                              <AnimatePresence>
                                {pops.map(pop => (
                                  <ComicPop key={pop.id} x={pop.x} y={pop.y} text={pop.text} />
                                ))}
                              </AnimatePresence>
                            </div>
                          </div>
                        ))}
                     </div>
                   ) : (
                     <div className="text-center">
                        <motion.h3 
                          animate={{ opacity: [1, 0, 1] }} 
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-4xl md:text-6xl font-black text-yellow-400 italic mb-8 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                        >
                          INSERT_COIN
                        </motion.h3>
                        <button 
                          onClick={() => { setIsPlaying(true); setScore(0); }}
                          className="px-10 py-4 bg-tech-cyan text-nature-900 font-black text-xl hover:scale-105 transition-transform rounded-sm shadow-[0_5px_0_#00c2cc] uppercase tracking-tighter"
                        >
                          Start_Debugging
                        </button>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>

          {/* CONTROL PANEL DECK */}
          <div className="mx-4 h-32 bg-[#1e293b] border-t-8 border-black rounded-b-2xl relative flex items-center justify-around px-8 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
             <div className="relative w-16 h-16 bg-black rounded-full border-4 border-slate-700">
                <motion.div 
                  animate={isPlaying ? { x: [-5, 5, -3, 3], y: [2, -2, 5, -5] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-8 h-8 bg-red-600 rounded-full border-b-4 border-red-800 shadow-xl" 
                />
             </div>
             <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full border-b-4 border-blue-800 shadow-lg active:scale-95" />
                <div className="w-10 h-10 bg-yellow-500 rounded-full border-b-4 border-yellow-700 shadow-lg active:scale-95" />
                <div className="w-10 h-10 bg-green-500 rounded-full border-b-4 border-green-700 shadow-lg active:scale-95" />
             </div>
             <div className="w-12 h-16 bg-black rounded border-2 border-slate-700 flex flex-col items-center justify-center gap-2">
                <div className="w-1 h-8 bg-yellow-600/50 rounded-full shadow-[inset_0_0_5px_black]" />
                <p className="text-[6px] font-mono text-slate-500 tracking-tighter uppercase">25&cent;</p>
             </div>
          </div>
        </div>

        <div className="mt-8 text-center opacity-50 space-y-2">
           <p className="text-white font-mono text-[10px] tracking-[0.3em] uppercase">Built for Resilience | Leith Hawkins</p>
           <p className="text-slate-600 font-mono text-[8px] uppercase italic tracking-[0.1em]">Legacy GIS code detected. Executing Python purge...</p>
        </div>
      </div>

      {/* HIGH-PRECISION SLEDGEHAMMER CURSOR */}
      <motion.div
        className="fixed pointer-events-none z-[100] hidden group-hover/arcade:block"
        style={{ 
          left: 0, 
          top: 0,
          x: mousePos.x - 30, 
          y: mousePos.y - 60,
        }}
        animate={{ 
          rotate: isHitting ? -110 : -35,
          scale: isHitting ? 0.9 : 1,
        }}
        transition={{ 
          rotate: { type: "spring", damping: 10, stiffness: 600, mass: 0.2 },
          scale: { duration: 0.05 },
          x: { duration: 0 }, // Zero latency movement
          y: { duration: 0 }  // Zero latency movement
        }}
      >
        <div className="relative drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
          {/* Head */}
          <div className="w-16 h-10 bg-slate-400 rounded-lg border-2 border-slate-600 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20" />
             <div className="absolute inset-x-1 top-1 h-[1px] bg-white/30" />
          </div>
          {/* Handle */}
          <div className="w-4 h-24 bg-amber-900 rounded-b-lg border-2 border-amber-950 mx-auto -mt-1 shadow-lg" />
          {/* Tag */}
          <div className="absolute top-1 right-1 px-1 bg-tech-cyan text-[7px] font-black text-nature-900 rounded-sm">PYTHON</div>
        </div>
      </motion.div>
    </section>
  );
};
