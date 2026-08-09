
import { motion } from 'framer-motion';
import { Code2, TreePine } from 'lucide-react';

const SkillBar = ({ label, level, humor }: { label: string, level: number, humor: string }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="font-mono text-sm text-white font-bold">{label}</span>
      <span className="text-[10px] font-mono text-slate-500 italic">{humor}</span>
    </div>
    <div className="h-2 bg-nature-900 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        animate={{ width: `${level}%` }}
        className="h-full bg-tech-cyan glow shadow-[0_0_10px_rgba(0,242,255,0.5)]"
      />
    </div>
  </div>
);

export const Skills = () => {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-12 pb-4 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="ml-4 font-mono text-xs text-slate-500 uppercase tracking-widest">
            Capabilities_Matrix.sys
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Spatial & Tech */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="text-tech-cyan w-5 h-5" />
              <h3 className="font-bold text-xl uppercase tracking-tight">Market & Spatial Tech</h3>
            </div>
            <SkillBar label="Spatial Analytics & QGIS" level={95} humor="Ensuring offset data is grounded in geography, not coordinates in the Atlantic." />
            <SkillBar label="Spatial Modeling (Python/GEE)" level={92} humor="High-performance simulations for habitat connectivity and carbon baselines." />
            <SkillBar label="Credit Verification Systems" level={88} humor="Designing custom UIs and tools for ecological field auditing." />
            <SkillBar label="Cloud Infrastructure (AWS)" level={80} humor="Scaling state-wide spatial data pipelines for regulatory compliance." />
            <SkillBar label="Technical Product Delivery" level={85} humor="Translating complex offset policy requirements into automated registry tools." />
          </div>

          {/* Governance & Strategy */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <TreePine className="text-green-400 w-5 h-5" />
              <h3 className="font-bold text-xl uppercase tracking-tight">Governance & Strategy</h3>
            </div>
            <SkillBar label="Environmental Program Governance" level={98} humor="Managing $209M state grant programs, 65 staff, across 11 regions." />
            <SkillBar label="Biodiversity Reforms & Policy" level={95} humor="Implementing statewide reforms and navigating complex transaction markets." />
            <SkillBar label="Executive & People Leadership" level={96} humor="Building high-trust, collaborative cultures in technical and field teams." />
            <SkillBar label="Crisis & Incident Control (AIIMS)" level={88} humor="Commanding emergency responses when public-facing systems are on the line." />
            <SkillBar label="Stakeholder Engagement" level={90} humor="Bridging the gap between landholders, developers, and government ministers." />
          </div>
        </div>

        {/* Console Output Footer */}
        <div className="mt-12 bg-black/40 p-4 rounded-xl font-mono text-[10px] text-green-500/70 border border-white/5">
          <p>&gt; RUNNING_HEURISTIC_ANALYSIS...</p>
          <p>&gt; RESULT: OVERQUALIFIED_FOR_TYPICAL_ROLES</p>
          <p>&gt; STATUS: READY_FOR_NEXT_CHALLENGE_</p>
        </div>
      </div>
    </section>
  );
};
