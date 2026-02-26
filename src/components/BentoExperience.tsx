import { motion } from 'framer-motion';
import { ShieldCheck, Database, Layers, Flame, Leaf, Target } from 'lucide-react';

const Card = ({ title, subtitle, description, icon: Icon, className = "", items = [] }: any) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className={`glass rounded-3xl p-8 flex flex-col justify-between hover:border-tech-cyan/30 transition-all group ${className}`}
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="bg-tech-cyan/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="text-tech-cyan w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{subtitle}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
        {description}
      </p>
      {items.length > 0 && (
        <ul className="space-y-2 border-t border-white/5 pt-4">
          {items.map((item: string, i: number) => (
            <li key={i} className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tech-cyan/40 rounded-full" /> {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

export const BentoExperience = () => {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-l-4 border-tech-cyan pl-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            PROVEN <span className="text-tech-cyan text-stroke">IMPACT</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-xl leading-relaxed">
            I don't just build systems; I lead high-stakes transformations where natural resources meet strategic technology. 
            Here’s how I've been spending my time.
          </p>
        </div>
        <div className="hidden md:block glass px-6 py-3 rounded-2xl border-white/5 text-right">
          <p className="text-[10px] font-mono text-slate-500 uppercase">Current_Mission</p>
          <p className="text-sm font-bold text-white tracking-tight">Scaling strategic conservation at BCT</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
        {/* Card 1: BCT Leadership */}
        <Card 
          title="Leading Regional Conservation"
          subtitle="Regional Manager @ BCT"
          description="I'm currently responsible for the strategic direction of the Northern Inland Region. It's a complex role where I balance on-ground operations with high-level government needs, ensuring our Private Land Conservation efforts actually deliver long-term results."
          icon={ShieldCheck}
          className="md:col-span-2"
          items={[
            "Managing multi-disciplinary teams of specialists",
            "Oversight of state-wide Biodiversity Offset Schemes",
            "Strategic stakeholder & industry negotiation"
          ]}
        />

        {/* Card 2: The $209M Crisis */}
        <Card 
          title="Turning Chaos into Recovery"
          subtitle="Program Manager @ LLS"
          description="When the bushfires hit, I was tasked with managing a $209M recovery project. I had to build the foundational policy, resourcing, and financial reporting systems from scratch while leading a team of 65 people across 11 regions."
          icon={Flame}
          items={[
            "Handled Treasury-level financial reporting",
            "Scaled grant delivery under extreme pressure",
            "Built resilient policy frameworks"
          ]}
        />

        {/* Card 3: GIS Architecture */}
        <Card 
          title="Modernizing Spatial Tech"
          subtitle="GIS Systems Architect"
          description="Most people see a map; I see the underlying architecture. I delivered the state-wide roadmap for LLS systems, migrating legacy frameworks into modern, high-performance cloud environments that teams actually enjoy using."
          icon={Layers}
          className="md:col-span-1"
          items={[
            "Led state-wide Cloud Migration strategy",
            "Designed automated spatial data pipelines",
            "Bridged the gap between GIS and IT"
          ]}
        />

        {/* Card 4: Python & Automation */}
        <Card 
          title="Automating the Boring Stuff"
          subtitle="The Engine Room"
          description="I believe technology should serve people, not the other way around. I've spent years using Python and spatial analysis to automate biosecurity workflows, turning manual field data into real-time management reports."
          icon={Database}
          className="md:col-span-2"
          items={[
            "Custom Python tools for Biosecurity teams",
            "Automated data-to-dashboard pipelines",
            "Optimizing workflows for speed and scale"
          ]}
        />

        {/* Card 5: Emergency Response */}
        <Card 
          title="Incident Control & Resilience"
          subtitle="Crisis Management"
          description="As a Level 2 Incident Controller, I've managed large-scale biosecurity emergencies. When things go wrong in the field, I provide the evidence-based decision making and leadership needed to stabilize the situation."
          icon={Target}
          items={[
            "National Biosecurity Response Team Lead",
            "PUAOPE018 - Control Level 2 Incident",
            "UAV Pilot (FPV Australia)"
          ]}
        />
        
        {/* Card 6: The Long Game */}
        <Card 
          title="20+ Years of Conservation"
          subtitle="Deep Roots"
          description="From Namoi Catchment to Greening Australia, my career has been dedicated to improving biodiversity. This hands-on history gives me a unique perspective: I understand the trees, the farmers, and the code."
          icon={Leaf}
          items={[
            "Strategic Land Management expertise",
            "Evidence-based decision frameworks",
            "Passion for resilient natural systems"
          ]}
        />
      </div>
    </section>
  );
};
