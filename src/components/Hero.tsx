import { motion } from 'framer-motion';

import { TreePine, Cpu } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Contour Lines (Subtle SVG) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-tech-cyan" />
        </svg>
      </div>

      <div className="max-w-5xl w-full z-10">
        <motion.div 
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-tech-cyan text-tech-cyan bg-tech-cyan/10">
              <Cpu className="inline-block w-3 h-3 mr-1" /> SOFTWARE ARCHITECT
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-green-400 text-green-400 bg-green-400/10">
              <TreePine className="inline-block w-3 h-3 mr-1" /> CONSERVATION LEADER
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Architecting <span className="text-tech-cyan">Ecosystems</span> <br />
            with <span className="text-green-400">Code</span> & Conservation
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            I bridge the gap between complex natural landscapes and high-performance spatial technology. 
            From managing <span className="text-slate-200 font-semibold">$209M biodiversity recovery programs</span> to 
            engineering <span className="text-slate-200 font-semibold">AI-driven GIS architectures</span>, 
            I build the digital tools that protect our physical world.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-tech-cyan text-nature-900 font-bold hover:scale-105 transition-transform glow">
              View the Ecosystem
            </button>
            <button className="px-8 py-3 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors">
              Whack a GIS Bug
            </button>
          </div>
        </motion.div>
      </div>

      {/* Animated Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-nature-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-tech-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};
