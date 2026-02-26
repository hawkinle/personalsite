import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Target, Zap, Terminal as TerminalIcon, Info } from 'lucide-react';

const BUGS = [
  { 
    id: '999999', 
    emoji: '🤡', 
    label: 'ERROR 999999', 
    color: 'bg-red-500', 
    msg: 'POOF!',
    desc: "Something failed, and it's not telling you why."
  },
  { 
    id: 'lock', 
    emoji: '🔒', 
    label: 'SCHEMA LOCK', 
    color: 'bg-yellow-500', 
    msg: 'UNLOCKED!',
    desc: "A process is hugging your database and won't let go."
  },
  { 
    id: 'atlantic', 
    emoji: '🏝️', 
    label: 'ATLANTIC_SHIFT', 
    color: 'bg-blue-600', 
    msg: 'FIXED!',
    desc: "Layers landed at (0,0) in the Atlantic Ocean."
  },
  { 
    id: 'zombie', 
    emoji: '🧟', 
    label: 'ZOMBIE_TASK', 
    color: 'bg-green-600', 
    msg: 'KILLED!',
    desc: "Geoprocessing refuses to actually finish."
  },
];

const ComicPop = ({ x, y, text }: { x: number, y: number, text: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -20, opacity: 1 }}
    animate={{ scale: 2, rotate: 10, opacity: 0 }}
    style={{ left: x, top: y }}
    className="absolute pointer-events-none z-50 font-black text-xl md:text-2xl text-yellow-400 italic select-none drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
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
  const [isMobile, setIsMobile] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleMouseMove = (e: MouseEvent) => { if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

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
      const bugId = activeBug.type.id;
      setScore(s => s + 500);
      setCounts(prev => ({ ...prev, [bugId]: (prev[bugId] || 0) + 1 }));
      
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
    <section className={`py-12 md:py-24 px-4 bg-[#020617] relative overflow-hidden group/arcade ${!isMobile ? 'cursor-none' : 'cursor-auto'}`}>
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Intro Narrative */}
        <div className="max-w-3xl text-center mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 italic tracking-tight underline decoration-tech-cyan/30">GIS BUG ARCADE</h3>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed px-2">
            In my work managing $200M projects, I've found that humor is often the best debugger. 
            This is a small attempt to pay homage to the GIS bugs that test our patience.
          </p>
        </div>

        {/* MOBILE-FIRST SCOREBOARD & BESTIARY */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Detailed Scoreboard */}
          <div className="glass p-4 rounded-2xl border-white/5 bg-black/40">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-tech-cyan" />
              <p className="text-xs font-mono text-tech-cyan uppercase tracking-widest">Bug_Smashed_Registry</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BUGS.map(bug => (
                <div key={bug.id} className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{bug.id}</span>
                  <span className="text-sm font-black text-white">{counts[bug.id] || 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lore/Bestiary Panel */}
          <div className="glass p-4 rounded-2xl border-white/5 bg-black/40">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-yellow-500" />
              <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest">Live_Debug_Lore</p>
            </div>
            <AnimatePresence mode="wait">
              {activeBug ? (
                <motion.div 
                  key={activeBug.type.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xs font-bold text-white">{activeBug.type.label}</p>
                  <p className="text-[10px] text-slate-400 font-mono leading-tight">{activeBug.type.desc}</p>
                </motion.div>
              ) : (
                <p className="text-[10px] text-slate-600 font-mono italic">System stable. No exceptions...</p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* VINTAGE ARCADE CABINET */}
        <div className="relative w-full pt-8 pb-4 bg-arcade-wood rounded-t-[3rem] rounded-b-[1.5rem] border-x-[10px] md:border-x-[16px] border-t-[10px] md:border-t-[16px] border-[#2d0f02] shadow-2xl overflow-hidden">
          
          {/* SMALLER MARQUEE FOR MOBILE */}
          <div className="mx-4 md:mx-8 mb-6 bg-black border-2 border-[#1e293b] p-3 flex justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-tech-cyan/10 to-transparent animate-pulse" />
            <h2 className="text-xl md:text-4xl font-black italic tracking-tighter text-white z-10 drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]">
              GIS_<span className="text-tech-cyan">SMASHER</span>
            </h2>
          </div>

          <div className="bg-[#1e293b] p-3 md:p-8">
            {/* THE SCREEN */}
            <div className="relative bg-black aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border-2 border-black">
              <div className="absolute inset-0 z-10 p-4 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-black/80 px-3 py-1 border border-tech-cyan/30">
                    <p className="text-[8px] font-mono text-tech-cyan/60 uppercase">TOTAL</p>
                    <p className="text-xl font-black text-tech-cyan tabular-nums">{score}</p>
                  </div>
                  <button 
                    onClick={() => { setIsPlaying(!isPlaying); if(!isPlaying) { setScore(0); setCounts({}); }}}
                    className={`px-4 py-2 rounded font-black text-xs uppercase transition-all ${
                      isPlaying ? 'bg-red-600 text-white' : 'bg-tech-cyan text-nature-900 shadow-lg'
                    }`}
                  >
                    {isPlaying ? 'ABORT' : 'START'}
                  </button>
                </div>

                <div className="flex-grow flex items-center justify-center">
                   {isPlaying ? (
                     <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-sm aspect-square">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i} 
                            onMouseDown={(e) => whack(i, e)}
                            className="relative h-full aspect-square bg-nature-950 rounded-full border-b-2 border-slate-800 shadow-inner overflow-hidden"
                          >
                            <AnimatePresence>
                              {activeBug?.index === i && (
                                <motion.div
                                  initial={{ y: 60 }} animate={{ y: 5 }} exit={{ y: 60, scale: 0.5 }}
                                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                                >
                                  <div className={`w-10 h-10 md:w-20 md:h-20 ${activeBug.type.color} rounded-t-full rounded-b-lg shadow-2xl flex items-center justify-center text-2xl md:text-5xl`}>
                                    {activeBug.type.emoji}
                                  </div>
                                  <div className="mt-1 px-1 py-0.5 bg-black/90 rounded text-[6px] font-mono text-white uppercase">
                                    {activeBug.type.label.split(' ')[0]}
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
                     <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-yellow-400 font-black text-2xl md:text-4xl italic">
                        INSERT_COIN
                     </motion.div>
                   )}
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] opacity-50" />
            </div>
          </div>

          {/* COMPACT CONTROL PANEL */}
          <div className="h-16 bg-[#1e293b] border-t-4 border-black rounded-b-xl flex items-center justify-around px-4">
             <div className="w-8 h-8 bg-black rounded-full border-2 border-slate-700 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-4 h-4 bg-red-600 rounded-full" />
             </div>
             <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full border-b-2 border-blue-800 shadow-lg" />
                <div className="w-6 h-6 bg-green-500 rounded-full border-b-2 border-green-800 shadow-lg" />
             </div>
             <div className="w-8 h-10 bg-black rounded border border-slate-700 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-yellow-600/50 rounded-full" />
             </div>
          </div>
        </div>

        <p className="mt-6 text-slate-600 font-mono text-[8px] uppercase tracking-widest text-center px-4">
          Optimized for Touch & Desktop | Built by Leith Hawkins
        </p>
      </div>

      {/* SLEDGEHAMMER (DESKTOP ONLY) */}
      {!isMobile && (
        <motion.div
          className="fixed pointer-events-none z-[100] hidden group-hover/arcade:block"
          style={{ left: 0, top: 0, x: mousePos.x - 30, y: mousePos.y - 60 }}
          animate={{ rotate: isHitting ? -110 : -35, scale: isHitting ? 0.9 : 1 }}
          transition={{ rotate: { type: "spring", damping: 10, stiffness: 600, mass: 0.2 }, x: { duration: 0 }, y: { duration: 0 } }}
        >
          <div className="relative drop-shadow-2xl">
            <div className="w-14 h-9 bg-slate-400 rounded-lg border-2 border-slate-600 relative overflow-hidden">
               <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20" />
            </div>
            <div className="w-4 h-24 bg-[#451a03] rounded-b-lg border-2 border-amber-950 mx-auto -mt-1" />
            <div className="absolute top-1 right-1 px-1 bg-tech-cyan text-[6px] font-black text-nature-900 rounded-sm">PYTHON</div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
