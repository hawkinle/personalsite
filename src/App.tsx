
import { Hero } from './components/Hero';
import { BentoExperience } from './components/BentoExperience';
import { GISGame } from './components/GISGame';
import { Skills } from './components/Skills';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-nature-900 text-white">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-8 flex justify-between items-center">
        <div className="font-mono font-bold text-tech-cyan text-lg">LEITH_HAWKINS_v2.0</div>
        <div className="hidden md:flex gap-8 text-sm font-mono text-slate-400">
          <a href="#experience" className="hover:text-tech-cyan transition-colors">EXPERIENCE</a>
          <a href="#arcade" className="hover:text-tech-cyan transition-colors">THE_ARCADE</a>
          <a href="#skills" className="hover:text-tech-cyan transition-colors">SKILLS</a>
        </div>
      </nav>
      
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="experience">
          <BentoExperience />
        </div>
        <div id="arcade">
          <GISGame />
        </div>
        <div id="skills">
          <Skills />
        </div>
      </main>

      <footer className="py-24 px-8 bg-nature-950 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Let's build something <span className="text-tech-cyan">resilient</span>.</h2>
            <div className="space-y-3 text-slate-400 font-mono text-sm">
              <a href="mailto:leithhawkins75@gmail.com" className="flex items-center gap-2 hover:text-tech-cyan transition-colors">
                <Mail className="w-4 h-4" /> leithhawkins75@gmail.com
              </a>
              <a href="tel:0408455541" className="flex items-center gap-2 hover:text-tech-cyan transition-colors">
                <Phone className="w-4 h-4" /> 0408 455 541
              </a>
            </div>
          </div>

          <div className="flex gap-6">
            <a href="https://linkedin.com/in/leithhawkins" target="_blank" className="p-4 rounded-full glass hover:bg-tech-cyan/10 transition-all text-slate-400 hover:text-tech-cyan">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/hawkinle" target="_blank" className="p-4 rounded-full glass hover:bg-tech-cyan/10 transition-all text-slate-400 hover:text-tech-cyan">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest">
            Wait, I didn't save my edits... [Schema Locked].
          </p>
          <p className="mt-2 text-slate-700 font-mono text-[8px]">
            &copy; 2026 LEITH HAWKINS. BUILT WITH REACT, TAILWIND, AND A LOVE FOR BIODIVERSITY.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
