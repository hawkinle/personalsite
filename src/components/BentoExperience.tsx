import { motion } from 'framer-motion';
import { ShieldCheck, Database, Layers, Flame, Leaf, Target } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  items?: string[];
}

const Card = ({ title, subtitle, description, icon: Icon, className = "", items = [] }: CardProps) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className={`glass rounded-3xl p-8 flex flex-col justify-between hover:border-tech-cyan/30 transition-all group ${className}`}
  >
    <div className="flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-tech-cyan/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="text-tech-cyan w-6 h-6" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{subtitle}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium flex-grow">
        {description}
      </p>
    </div>
    {items.length > 0 && (
      <ul className="space-y-2 border-t border-white/5 pt-4 mt-6">
        {items.map((item: string, i: number) => (
          <li key={i} className="text-[11px] font-mono text-slate-400 flex items-start gap-2 leading-relaxed">
            <span className="w-1.5 h-1.5 bg-tech-cyan/40 rounded-full mt-1.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
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
            I lead complex programs and build high-integrity systems where environmental policy meets infrastructure compliance and spatial tech.
          </p>
        </div>
        <div className="hidden md:block glass px-6 py-4 rounded-2xl border-white/5 text-right max-w-md">
          <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Current_Mission</p>
          <p className="text-xs font-bold text-white tracking-tight leading-relaxed">
            Principal Biodiversity & Offsets Advisor at Inland Rail, overseeing a Biodiversity Offset Portfolio of 35 properties (tenancy, asset management, and environmental compliance).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto]">
        {/* Card 1: Inland Rail Current Role */}
        <Card 
          title="Strategic Offsets & Compliance"
          subtitle="Principal Advisor @ Inland Rail"
          description="Leading environmental compliance and biodiversity offset delivery for the Inland Rail program. Overseeing a complex portfolio of 35 offset properties, managing agricultural tenancy agreements, physical asset maintenance, and regulatory compliance across major linear infrastructure corridors."
          icon={ShieldCheck}
          className="md:col-span-2"
          items={[
            "Overseeing a Biodiversity Offset Portfolio of 35 properties, including agricultural tenancy agreements and asset management",
            "Ensuring regulatory environmental compliance and offset delivery across key infrastructure segments",
            "Liaising with government regulators, landholders, and corporate stakeholders to secure environmental outcomes"
          ]}
        />

        {/* Card 2: BCT Leadership (Former) */}
        <Card 
          title="Statewide Biodiversity Reforms"
          subtitle="Former Regional Manager @ BCT"
          description="Directed regional operations for the NSW Biodiversity Conservation Trust. Implemented statewide biodiversity reforms and led private land conservation investments, while building high-trust, data-driven teams that translate environmental policy into high-integrity biodiversity credit outcomes."
          icon={Leaf}
          className="md:col-span-1"
          items={[
            "Executive oversight of regional biodiversity portfolios and implementation of statewide reforms",
            "Facilitating conservation agreements and transactions in NSW Biodiversity Offset Schemes (BOS)",
            "Coaching senior policy, ecology, and spatial specialists into collaborative, high-trust leadership roles"
          ]}
        />

        {/* Card 3: LLS Recovery */}
        <Card 
          title="Large-Scale Program Governance"
          subtitle="Former $209M Grant Program Manager"
          description="Directed NSW's post-fire wildlife and habitat recovery program. Under extreme public scrutiny and tight legislative timelines, I scaled a cross-regional force of 65 specialists to execute complex conservation work, ensuring strict treasury auditing and governance."
          icon={Flame}
          className="md:col-span-1"
          items={[
            "Managed and audited a $209M state-wide post-fire biodiversity recovery grant program",
            "Recruited, mobilized, and aligned a 65-person inter-disciplinary team across 11 regions",
            "Ensured compliance, reporting transparency, and risk mitigation under high-stress conditions"
          ]}
        />

        {/* Card 4: GIS Architecture */}
        <Card 
          title="Market Integrity & Spatial Tech"
          subtitle="Environmental Spatial Architect"
          description="Designing the spatial infrastructure underpinning ecological data systems. I authored and executed the state-wide cloud-native GIS migration roadmap for Local Land Services, ensuring data accuracy and compliance required for regulatory mapping and credit verification."
          icon={Layers}
          className="md:col-span-1"
          items={[
            "Led cloud migration of state-wide spatial infrastructure to modern AWS environments",
            "Engineered automated data pipelines that eliminate reporting latency and mapping errors",
            "Aligned spatial databases with rigorous data governance and security frameworks"
          ]}
        />

        {/* Card 5: Emergency Response */}
        <Card 
          title="Crisis Leadership & Risk Management"
          subtitle="Accredited Level 2 Incident Controller"
          description="Accredited incident controller (PUAOPE018) leading high-stakes biosecurity and environmental emergency responses. Experienced in managing cross-agency teams, scaling operations rapidly, and maintaining calm directive authority under intense public and political pressure."
          icon={Target}
          className="md:col-span-1"
          items={[
            "Served as National Biosecurity Response Team Lead for emergency pest/disease outbreaks",
            "Commanded multi-agency teams and resources under the Australasian Inter-service Incident Management System (AIIMS)"
          ]}
        />

        {/* Card 6: Python & Automation */}
        <Card 
          title="De-risking Environmental Operations"
          subtitle="Process Automation & Analytics"
          description="Eliminating transaction friction and operational bottlenecks. I engineer high-performance spatial automation tools (Python, Numba) that transform raw field data, ecological surveys, and remote sensing into audit-ready datasets."
          icon={Database}
          className="md:col-span-2"
          items={[
            "Developed custom optimization scripts, accelerating spatial assessment times by over 80%",
            "Automated biosecurity modeling, offset assessments, and ETL data pipelines",
            "Built interactive, real-time spatial dashboards for operational decision-making"
          ]}
        />
        
        {/* Card 7: The Long Game */}
        <Card 
          title="20+ Years in Ecosystem Services"
          subtitle="Deep Conservation Roots"
          description="A career dedicated to private land conservation, catchment management, and environmental markets. From Namoi Catchment to Greening Australia, BCT, and Inland Rail, I possess deep strategic knowledge of landholders, ecosystems, policy, and infrastructure dynamics."
          icon={Leaf}
          className="md:col-span-1"
          items={[
            "Expertise in Biodiversity Offsets, Carbon Farming, and Land Stewardship contracts",
            "Bridging the gap between rural landholders, corporate credit buyers, and state regulators",
            "Designing evidence-based frameworks to measure and verify ecological outcomes"
          ]}
        />
      </div>
    </section>
  );
};
