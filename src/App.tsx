import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Shield, 
  Cpu, 
  Brain, 
  Zap, 
  Search, 
  Lock, 
  Activity, 
  Layers, 
  UserCheck, 
  Trash2, 
  Sparkles,
  Menu,
  X,
  Database,
  ShieldCheck
} from 'lucide-react';
import { 
  ENGINE_API_URL, 
  PROOFS_REPO_URL, 
  WHITEPAPER_URL, 
  AUDIT_GUIDE_URL, 
  PROOFS_DIR_URL, 
  SPEC_URL, 
  SRC_URL, 
  AUDIT_DIR_URL 
} from './constants';

// --- Data ---

const THOUGHT_STEPS = [
  { step: "Sens", action: "L'IA extrait une orientation initiale.", result: "Hypothèse brute." },
  { step: "Organisation", action: "L'IA structure les éléments (relations, hiérarchies).", result: "Schéma logique." },
  { step: "Cohérence", action: "Le système mesure l'alignement interne.", result: "Élimination des contradictions." },
  { step: "Temps & Constance", action: "Le système éprouve la structure face aux perturbations.", result: "Validation de la tenue." },
  { step: "Mémoire & Stabilisation", action: "Seule la structure qui a tenu est stockée.", result: "Vérité stabilisée." },
];

const AGENTS = [
  {
    name: "Le Douteur",
    desc: "Génère une friction cognitive et critique les hypothèses pour éviter les biais de confirmation.",
    icon: <Search className="w-5 h-5" />,
    role: "Friction"
  },
  {
    name: "L'Empathe",
    desc: "Gère la cognition sociale et l'adaptation au contexte humain sans compromettre la logique.",
    icon: <UserCheck className="w-5 h-5" />,
    role: "Adaptation"
  },
  {
    name: "Le Nettoyeur Cognitif",
    desc: "Trie et filtre l'information avant qu'elle ne pollue la mémoire à long terme.",
    icon: <Trash2 className="w-5 h-5" />,
    role: "Purge"
  },
  {
    name: "Le Clarificateur (Shazam)",
    desc: "Résout la complexité pour une expression claire, synthétique et actionnable.",
    icon: <Sparkles className="w-5 h-5" />,
    role: "Synthèse"
  }
];

const ARCHITECTURE_LAYERS = [
  {
    id: 4,
    title: "4. Noyau Déterministe (Le Juge)",
    role: "Valider, juger, sceller.",
    does: "Bloque, autorise, prouve (X-108). Invariants Lean 4 (0 sorry).",
    doesNot: "Ne raisonne pas, n'interprète pas.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: 3,
    title: "3. Espace Latent",
    role: "Incuber, maintenir, purger.",
    does: "Évalue, retient, met en attente. Spécifications TLA+.",
    doesNot: "N'agit pas publiquement, ne valide pas.",
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 2,
    title: "2. Noyau Cognitif (IA)",
    role: "Raisonner, structurer, proposer.",
    does: "Synthétise, déduit, explore.",
    doesNot: "Ne valide pas, n'agit sur le réel.",
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: 1,
    title: "1. Outils / Services",
    role: "Exécuter, chercher, ramener.",
    does: "Scrape, formate, parse.",
    doesNot: "N'interprète pas, ne décide pas.",
    icon: <Cpu className="w-5 h-5" />
  }
];

// --- Components ---

const ConstructionBanner = () => (
  <div className="bg-[#0a2a1a] border-b border-obsidia-accent py-2 px-4 text-center">
    <p className="text-[12px] text-obsidia-accent uppercase tracking-[0.2em] font-mono font-medium">
      ⚡ OBSIDIA AGI — SYSTÈME EN COURS DE DÉVELOPPEMENT ACTIF · ARCHITECTURE V4.2.0 · FONCTIONNALITÉS EN PRODUCTION PROGRESSIVE
    </p>
  </div>
);

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'latent', label: 'Espace Latent' },
    { id: 'memory', label: 'Mémoire Gouvernée' },
    { id: 'agents', label: 'Agents Périphériques' },
    { id: 'reflex', label: 'Protocole Reflex' },
    { id: 'whitepaper', label: 'Livre Blanc' },
    { id: 'proof-lab', label: 'Proof Lab' },
  ];

  return (
    <nav className="w-full border-b border-obsidia-border bg-obsidia-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-8 h-8 bg-obsidia-accent rounded-sm flex items-center justify-center">
              <Shield className="text-obsidia-bg w-5 h-5" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">OBSIDIA AGI</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`text-[10px] uppercase tracking-widest transition-colors hover:text-obsidia-accent ${
                  activePage === item.id ? 'text-obsidia-accent font-bold' : 'text-obsidia-ink/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-obsidia-ink">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-obsidia-bg border-b border-obsidia-border px-4 pt-2 pb-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`text-left text-sm uppercase tracking-widest ${
                  activePage === item.id ? 'text-obsidia-accent' : 'text-obsidia-ink/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SystemStats = ({ features }: { features: any }) => {
  const stats = [
    { label: "COHERENCE", value: `${features?.coherence || '0.92'} (X-108)` },
    { label: "FRICTION", value: features?.friction || '0.04' },
    { label: "DETERMINISM_RATIO", value: "99.999998%" },
    { label: "ACTIVE_AGENTS", value: "51/51" },
    { label: "REGIME", value: features?.regime || 'STABLE' },
    { label: "VOLATILITY", value: features?.volatility || '0.05' },
  ];

  return (
    <div className="bg-obsidia-accent/10 border-y border-obsidia-border py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee">
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center mx-8 space-x-2">
            <span className="text-[10px] font-mono text-obsidia-accent opacity-70 uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-xs font-mono text-obsidia-ink font-medium">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-5xl z-10"
      >
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a 
            href={ENGINE_API_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-obsidia-accent/30 bg-obsidia-accent/10 hover:bg-obsidia-accent/20 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-obsidia-accent" />
            <span className="text-[10px] font-mono text-obsidia-accent uppercase tracking-[0.2em]">● KERNEL — EN PRODUCTION</span>
          </a>
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.2em]">◐ AGI — DÉVELOPPEMENT ACTIF</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold tracking-tighter leading-[0.85] mb-8">
          LE DUAL OBSIDIA : LA <span className="text-obsidia-accent italic">COGNITION GOUVERNÉE</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-obsidia-ink/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Obsidia n'est pas une IA générative. C'est un moteur de certitude conçu pour les infrastructures critiques, où l'aléa est une faille de sécurité.
          <span className="block mt-4 font-bold text-obsidia-ink">"Chez Obsidia, l'IA n'est pas le système souverain — elle est un composant gouverné."</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-obsidia-accent text-obsidia-bg font-bold rounded-sm hover:bg-white transition-colors duration-300 uppercase tracking-widest text-xs">
            Déployer l'Architecture
          </button>
          <button className="px-8 py-4 border border-obsidia-ink/20 hover:border-obsidia-accent/50 transition-colors duration-300 rounded-sm uppercase tracking-widest text-xs font-medium">
            Consulter le Livre Blanc
          </button>
        </div>
      </motion.div>

      {/* Technical Meta Labels */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="text-[10px] font-mono opacity-30 uppercase tracking-widest space-y-1">
          <p>Coord: 48.8566° N, 2.3522° E</p>
          <p>Status: Synchronized</p>
        </div>
      </div>
      <div className="absolute bottom-12 right-12 hidden lg:block text-right">
        <div className="text-[10px] font-mono opacity-30 uppercase tracking-widest space-y-1">
          <p>Protocol: X-108_STABLE</p>
          <p>Encryption: Quantum-Resistant</p>
        </div>
      </div>
    </section>
  );
};

const ArchitectureLayers = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section className="py-24 px-6 bg-obsidia-ink/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-4">Architecture Système</h2>
            <h3 className="text-4xl font-bold mb-6 leading-tight">LES COUCHES DE LA CERTITUDE.</h3>
            <p className="text-obsidia-ink/60 mb-8 font-light">
              Chaque niveau de l'architecture Obsidia est conçu pour éliminer l'incertitude. Contrairement aux LLM classiques, nous ne prédisons pas le mot suivant, nous validons la trajectoire logique.
            </p>
            
            <div className="p-6 border border-obsidia-accent/20 bg-obsidia-accent/5 rounded-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-obsidia-accent/20 rounded-full">
                  {ARCHITECTURE_LAYERS[activeLayer].icon}
                </div>
                <div>
                  <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Focus Actuel</p>
                  <p className="text-sm font-bold uppercase tracking-wider">{ARCHITECTURE_LAYERS[activeLayer].title}</p>
                </div>
              </div>
              <p className="text-sm text-obsidia-ink/80 leading-relaxed mb-4 italic">
                "{ARCHITECTURE_LAYERS[activeLayer].role}"
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-obsidia-accent uppercase tracking-widest mb-1">Ce qu'elle fait</p>
                  <p className="text-xs opacity-70">{ARCHITECTURE_LAYERS[activeLayer].does}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-red-500/70 uppercase tracking-widest mb-1">Ce qu'elle ne fait pas</p>
                  <p className="text-xs opacity-70">{ARCHITECTURE_LAYERS[activeLayer].doesNot}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Layer Cards */}
          <div className="lg:w-2/3 space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setActiveLayer(index)}
                className={`group cursor-pointer p-8 border transition-all duration-500 ${
                  activeLayer === index 
                    ? 'bg-obsidia-ink/5 border-obsidia-accent/40 translate-x-4' 
                    : 'border-obsidia-ink/10 hover:border-obsidia-ink/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className={`text-2xl font-bold mb-2 transition-colors ${activeLayer === index ? 'text-obsidia-accent' : ''}`}>
                      {layer.title}
                    </h4>
                    <p className="text-sm opacity-50 font-mono uppercase tracking-widest">{layer.role}</p>
                  </div>
                  <div className={`p-3 rounded-full transition-all duration-500 ${activeLayer === index ? 'bg-obsidia-accent text-obsidia-bg scale-110' : 'bg-obsidia-ink/5'}`}>
                    {layer.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProofSection = () => {
  const proofs = [
    { title: "Invariants du Noyau", tech: "Lean 4", status: "0 sorry", desc: "Preuve formelle de la non-contradiction des règles de gouvernance." },
    { title: "Spécifications X-108", tech: "TLA+", status: "TLC Checked", desc: "Vérification par modèle de l'absence de deadlock dans le protocole de veto." },
    { title: "Ancrage Cryptographique", tech: "Quantum-Resistant", status: "Active", desc: "Signature immuable de chaque décision validée par le Juge." },
    { title: "Tests Adversariaux", tech: "Phase 15.2", status: "Passed", desc: "Résistance prouvée face aux tentatives d'injection et de dérive cognitive." },
  ];

  return (
    <section className="py-24 px-6 border-t border-obsidia-border bg-obsidia-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-4">Validation Formelle</h2>
          <h3 className="text-4xl font-bold mb-6">RÉSULTATS VÉRIFIÉS (v1.3.0).</h3>
          <p className="text-obsidia-ink/60 max-w-2xl font-light">
            Obsidia n'est pas basé sur la confiance, mais sur la preuve. Chaque composant critique du moteur est formellement spécifié et vérifié mathématiquement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofs.map((proof, i) => (
            <div key={i} className="p-8 border border-obsidia-border bg-obsidia-ink/[0.02] hover:border-obsidia-accent/30 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-obsidia-accent px-2 py-1 bg-obsidia-accent/10 rounded-sm uppercase tracking-widest">
                  {proof.tech}
                </span>
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                  {proof.status}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-obsidia-accent transition-colors">{proof.title}</h4>
              <p className="text-xs text-obsidia-ink/50 leading-relaxed">{proof.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-obsidia-accent/20 bg-obsidia-accent/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-lg font-bold mb-2 uppercase tracking-tight">Consulter le Pack de Preuve Moteur</h4>
            <p className="text-sm opacity-60">Accédez au dépôt public contenant les fichiers Lean 4, TLA+ et les rapports de tests.</p>
          </div>
          <a 
            href={PROOFS_REPO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-obsidia-ink text-obsidia-bg font-bold rounded-sm hover:bg-obsidia-accent transition-colors uppercase tracking-widest text-xs"
          >
            Voir sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const ThoughtCycle = () => {
  return (
    <section className="py-32 px-6 bg-obsidia-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-4">Pipeline Cognitif</h2>
            <h3 className="text-5xl font-bold tracking-tighter leading-none">LA CHAÎNE CANONIQUE.</h3>
          </div>
          <p className="text-obsidia-ink/40 text-sm max-w-xs font-light">
            Audit en temps réel du flux de pensée. Chaque étape est une barrière déterministe.
          </p>
        </div>

        <div className="border border-obsidia-border overflow-hidden">
          <div className="grid grid-cols-[80px_1.5fr_1fr] bg-obsidia-ink/5 border-b border-obsidia-border py-4 px-6">
            <div className="text-[10px] font-serif italic opacity-50 uppercase tracking-widest">Index</div>
            <div className="text-[10px] font-serif italic opacity-50 uppercase tracking-widest">Action du Système</div>
            <div className="text-[10px] font-serif italic opacity-50 uppercase tracking-widest">Résultat Stabilisé</div>
          </div>
          
          {THOUGHT_STEPS.map((s, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-[80px_1.5fr_1fr] border-b border-obsidia-border last:border-0 py-8 px-6 hover:bg-obsidia-accent/5 transition-colors group cursor-crosshair"
            >
              <div className="font-mono text-xs text-obsidia-accent opacity-50">0{idx + 1}</div>
              <div className="pr-8">
                <h4 className="text-xl font-bold mb-2 group-hover:text-obsidia-accent transition-colors">{s.step}</h4>
                <p className="text-sm text-obsidia-ink/60 font-light leading-relaxed">{s.action}</p>
              </div>
              <div className="font-mono text-[11px] text-obsidia-ink/40 bg-obsidia-ink/[0.02] p-4 border border-obsidia-border/50">
                {s.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AgentsGrid = () => {
  return (
    <section className="py-32 px-6 bg-obsidia-ink/[0.03] border-y border-obsidia-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">Intelligence Spécialisée</h2>
          <h3 className="text-6xl font-bold tracking-tighter">LES AGENTS PÉRIPHÉRIQUES.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidia-border border border-obsidia-border">
          {AGENTS.map((agent, idx) => (
            <div 
              key={idx} 
              className="bg-obsidia-bg p-10 hover:bg-obsidia-accent/[0.02] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Shield className="w-12 h-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-[1px] bg-obsidia-accent" />
                  <span className="text-[10px] font-mono text-obsidia-accent uppercase tracking-widest">{agent.role}</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {agent.name}
                </h4>
                
                <p className="text-sm text-obsidia-ink/60 font-light leading-relaxed mb-8">
                  {agent.desc}
                </p>

                <div className="pt-6 border-t border-obsidia-border/50 flex justify-between items-center">
                  <span className="text-[9px] font-mono opacity-40 uppercase tracking-tighter">Status: Active</span>
                  <div className="w-2 h-2 rounded-full bg-obsidia-accent/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReflexSection = () => (
  <section className="py-32 px-6 bg-obsidia-bg overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 border border-obsidia-accent/30 bg-obsidia-accent/5 mb-8">
            <span className="text-[10px] font-mono text-obsidia-accent uppercase tracking-[0.3em]">Optimisation Cognitive</span>
          </div>
          <h2 className="text-6xl font-bold mb-8 tracking-tighter leading-none uppercase">LE PROTOCOLE <br /><span className="text-obsidia-accent italic">REFLEX</span>.</h2>
          <p className="text-lg text-obsidia-ink/60 mb-12 font-light leading-relaxed">
            Reflex permet de court-circuiter les calculs lourds en reconnaissant des patterns déjà validés. C'est la vitesse alliée à la certitude absolue.
          </p>
          
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent group-hover:bg-obsidia-accent group-hover:text-obsidia-bg transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Vitesse Contrôlée</h4>
                <p className="text-sm text-obsidia-ink/50 font-light leading-relaxed">
                  Réponse instantanée pour les requêtes à haute fréquence, sans compromis sur la sécurité.
                </p>
              </div>
            </div>
            
            <div className="flex gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 border border-obsidia-accent/20 flex items-center justify-center text-obsidia-accent group-hover:bg-obsidia-accent group-hover:text-obsidia-bg transition-all duration-300">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Garantie Déterministe</h4>
                <p className="text-sm text-obsidia-ink/50 font-light leading-relaxed">
                  Chaque sortie Reflex est auditée par la couche Veto en temps réel (latence &lt; 5ms).
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Hardware-like Visualization */}
          <div className="relative aspect-square max-w-md mx-auto border border-obsidia-border bg-obsidia-ink/[0.02] p-12 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-obsidia-accent/10 rounded-full m-8"
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 border-2 border-obsidia-accent flex items-center justify-center mb-6 mx-auto"
              >
                <Zap className="text-obsidia-accent w-16 h-16" />
              </motion.div>
              <p className="text-[10px] font-mono text-obsidia-accent uppercase tracking-[0.4em]">Reflex Core Active</p>
              <p className="text-[8px] font-mono opacity-30 mt-2">SIGMA_VALIDATION: OK</p>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-obsidia-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-obsidia-accent" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-obsidia-accent" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-obsidia-accent" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LiveDashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [gates, setGates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [featRes, gateRes] = await Promise.all([
        fetch('/api/features', { method: 'POST', body: JSON.stringify({}) }),
        fetch('/api/gates', { method: 'POST', body: JSON.stringify({}) })
      ]);
      
      if (featRes.ok && gateRes.ok) {
        const featData = await featRes.json();
        const gateData = await gateRes.json();
        
        setMetrics(featData);
        setGates(gateData.filter((g: any) => g.id)); // Filter out mode: fallback
        
        setHistory(prev => {
          const newPoint = {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            coherence: parseFloat(featData.coherence),
            friction: parseFloat(featData.friction) * 10, // Scale for visibility
            volatility: parseFloat(featData.volatility) * 10
          };
          const updated = [...prev, newPoint].slice(-20);
          return updated;
        });
      }
    } catch (error) {
      console.error("Failed to fetch live metrics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading && !metrics) {
    return (
      <div className="h-64 flex items-center justify-center border border-obsidia-border bg-obsidia-ink/5">
        <div className="flex flex-col items-center gap-4">
          <Activity className="w-8 h-8 text-obsidia-accent animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Initialisation du flux live...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-obsidia-border bg-obsidia-ink/5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Cohérence Système</span>
            <Activity className="w-4 h-4 text-obsidia-accent" />
          </div>
          <div className="text-3xl font-bold tracking-tighter mb-1">
            {(metrics?.coherence * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] font-mono text-obsidia-accent uppercase tracking-widest">
            {metrics?.mode === 'fallback' ? 'Simulation Locale' : 'Live Engine'}
          </div>
        </div>
        
        <div className="p-6 border border-obsidia-border bg-obsidia-ink/5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Friction Cognitive</span>
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold tracking-tighter mb-1">
            {metrics?.friction}
          </div>
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
            Niveau de doute actif
          </div>
        </div>

        <div className="p-6 border border-obsidia-border bg-obsidia-ink/5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Régime Actuel</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold tracking-tighter mb-1 uppercase">
            {metrics?.regime}
          </div>
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
            {metrics?.active_agents} Agents en ligne
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 border border-obsidia-border bg-obsidia-bg h-[400px]">
          <h3 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">Flux de Stabilité (Live)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorCoh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#141414" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#141414" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#141414" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                domain={[0.8, 1]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050505', border: '1px solid #141414', fontSize: '10px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="coherence" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorCoh)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-8 border border-obsidia-border bg-obsidia-bg h-[400px]">
          <h3 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">État des Portes de Gouvernance</h3>
          <div className="space-y-6">
            {gates.map((gate: any) => (
              <div key={gate.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${gate.status === 'OPEN' ? 'bg-obsidia-accent' : 'bg-red-500'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest">{gate.id}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Charge: {(gate.load * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1 bg-obsidia-ink/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${gate.load * 100}%` }}
                    className={`h-full ${gate.status === 'OPEN' ? 'bg-obsidia-accent' : 'bg-red-500'}`}
                  />
                </div>
              </div>
            ))}
            <div className="pt-8 border-t border-obsidia-border/50">
              <div className="p-4 bg-obsidia-accent/5 border border-obsidia-accent/20">
                <p className="text-[10px] font-mono leading-relaxed opacity-60">
                  <span className="text-obsidia-accent font-bold">INFO:</span> Les portes G1 et G2 gèrent le flux cognitif primaire. La porte G3 est réservée aux interventions du Juge Déterministe en cas de dérive &gt; 0.15.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatentSpacePage = () => (
  <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">L'Espace Latent</h1>
      
      {/* Narrative Block: L'Alchimie du Doute */}
      <section className="mb-16 p-10 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Search className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">L'Alchimie du Doute</h2>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">L'INCERTITUDE EST UNE ÉTAPE, PAS UNE DESTINATION.</h3>
          <p className="text-base text-obsidia-ink/70 leading-relaxed font-light">
            Dans l'Espace Latent, Obsidia s'autorise l'exploration, le tâtonnement et même l'erreur. C'est le seul lieu où la cognition est libre de dériver, car elle est <span className="text-obsidia-ink font-bold">confinée</span>. 
            Ici, le doute n'est pas une faiblesse, c'est l'outil de purification qui permet de séparer le signal de l'hallucination avant que le Juge ne scelle la vérité.
          </p>
        </div>
      </section>

      <div className="mb-24">
        <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">Métriques Système en Temps Réel</h2>
        <LiveDashboard />
      </div>

      <div className="bg-obsidia-accent/5 border-l-4 border-obsidia-accent p-8 mb-12">
        <p className="text-2xl font-serif italic text-obsidia-ink leading-relaxed">
          "Ce n'est pas la pensée qui est bloquée, c'est la sortie hors cadre."
        </p>
      </div>
      
      <p className="text-xl text-obsidia-ink/60 mb-16 max-w-3xl leading-relaxed">
        L'espace latent est un bac à sable cognitif. La dérive interne est possible, la dérive de sortie ne l'est pas. 
        C'est ici que l'IA incube, doute et purge ses idées avant de parler.
      </p>
      
      <div className="mb-24">
        <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">La Chaîne Canonique (Le Cycle de la Pensée)</h2>
        <div className="border border-obsidia-border overflow-hidden bg-obsidia-bg">
          <div className="grid grid-cols-[150px_1.5fr_1fr] bg-obsidia-ink/5 border-b border-obsidia-border py-4 px-6">
            <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Étape</div>
            <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Action du Système</div>
            <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Résultat</div>
          </div>
          
          {THOUGHT_STEPS.map((s, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-[150px_1.5fr_1fr] border-b border-obsidia-border last:border-0 py-8 px-6 hover:bg-obsidia-accent/5 transition-colors"
            >
              <div className="font-bold text-obsidia-accent uppercase tracking-wider">{s.step}</div>
              <div className="pr-8 text-sm text-obsidia-ink/80">{s.action}</div>
              <div className="font-mono text-[11px] text-obsidia-ink/40 bg-obsidia-ink/[0.02] p-3 border border-obsidia-border/50">
                {s.result}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8 border border-obsidia-border bg-white/5">
          <h3 className="text-obsidia-ink font-bold mb-4 uppercase text-sm tracking-widest">Incubation Cognitive</h3>
          <p className="text-sm text-obsidia-ink/60 leading-relaxed">Le temps nécessaire pour que les structures se stabilisent face au bruit. L'IA explore librement sans impact externe, permettant une maturation des concepts avant toute validation déterministe.</p>
        </div>
        <div className="p-8 border border-obsidia-border bg-white/5">
          <h3 className="text-obsidia-ink font-bold mb-4 uppercase text-sm tracking-widest">Purge Ontologique</h3>
          <p className="text-sm text-obsidia-ink/60 leading-relaxed">Élimination systématique des hallucinations. Seules les structures validées par le Juge Déterministe franchissent le seuil de l'espace latent vers la mémoire scellée.</p>
        </div>
      </div>
    </motion.div>
  </div>
);

const MemoryPage = () => (
  <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Mémoire Gouvernée</h1>
      
      {/* Narrative Block: Le Sceau de l'Éternité */}
      <section className="mb-16 p-10 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Database className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">Le Sceau de l'Éternité</h2>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">SEULE LA VÉRITÉ VÉRIFIÉE MÉRITE DE PERSISTER.</h3>
          <p className="text-base text-obsidia-ink/70 leading-relaxed font-light">
            La mémoire d'Obsidia n'est pas un flux continu de données, c'est une architecture de certitudes. Chaque fragment stocké est passé par le crible du <span className="text-obsidia-ink font-bold">Noyau Déterministe</span>. 
            Nous ne mémorisons pas des faits, nous scellons des structures de vérité immuables, garantissant que le système reste cohérent avec lui-même, aujourd'hui et dans mille ans.
          </p>
        </div>
      </section>

      <div className="bg-obsidia-accent/5 border-l-4 border-obsidia-accent p-8 mb-12">
        <p className="text-2xl font-serif italic text-obsidia-ink leading-relaxed">
          "L'important n'est pas la perfection du premier pas, mais la justesse du rendu final."
        </p>
      </div>

      <p className="text-xl text-obsidia-ink/60 mb-16 max-w-3xl leading-relaxed">
        Tout n'est pas mémorisé : seule la vérité validée persiste. 
        Obsidia distingue la structure de la donnée brute pour garantir une stabilité temporelle absolue.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="p-10 border border-obsidia-border bg-white/5">
          <h3 className="text-obsidia-accent font-bold uppercase text-xs tracking-widest mb-6">Mémoire Fractale</h3>
          <p className="text-sm text-obsidia-ink/60 leading-relaxed">
            Les patterns validés sont stockés de manière réutilisable. Le système ne réapprend pas, il reconnaît des structures de vérité déjà scellées par le Juge Déterministe.
          </p>
        </div>
        <div className="p-10 border border-obsidia-border bg-white/5">
          <h3 className="text-obsidia-accent font-bold uppercase text-xs tracking-widest mb-6">Stabilité Temporelle</h3>
          <p className="text-sm text-obsidia-ink/60 leading-relaxed">
            Résistance à la corruption de l'information. Une vérité validée à l'instant T reste immuable face aux tentatives de dérive cognitive ultérieures.
          </p>
        </div>
      </div>

      <div className="border-t border-obsidia-border pt-16">
        <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Le Sceau Déterministe</h2>
        <p className="text-obsidia-ink/60 max-w-4xl leading-relaxed mb-12">
          La mémoire Obsidia n'est pas un accumulateur passif. C'est un coffre-fort logique. 
          Chaque fragment de mémoire possède une preuve mathématique de sa validité, 
          rendant toute hallucination persistante impossible par design.
        </p>
        <div className="inline-block px-6 py-3 bg-obsidia-accent/10 border border-obsidia-accent/20 font-mono text-xs text-obsidia-accent">
          MEMORY_INTEGRITY_CHECK: 100% VALIDATED
        </div>
      </div>
    </motion.div>
  </div>
);

const LiveAgentActivity = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const agents = ["Douteur", "Empathe", "Nettoyeur", "Clarificateur"];
  const actions = [
    "Analyse de friction en cours...",
    "Vérification de cohérence structurelle.",
    "Purge de l'espace latent (hallucination détectée).",
    "Synthèse de la cognition stabilisée.",
    "Audit du Juge Déterministe : OK.",
    "Interception d'une dérive cognitive.",
    "Optimisation du flux Reflex.",
    "Mise à jour de la mémoire gouvernée."
  ];

  useEffect(() => {
    const addLog = () => {
      const agent = agents[Math.floor(Math.random() * agents.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const newLog = `[${time}] ${agent.toUpperCase()} : ${action}`;
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    };

    const interval = setInterval(addLog, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 border border-obsidia-border bg-obsidia-ink font-mono text-[10px] space-y-2 h-[200px] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-obsidia-ink to-transparent z-10" />
      <div className="space-y-2 pt-4">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${i === 0 ? 'text-obsidia-accent' : 'text-obsidia-accent/40'}`}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-obsidia-ink to-transparent z-10" />
    </div>
  );
};

const AgentsPage = () => (
  <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Agents Périphériques</h1>
      
      {/* Narrative Block: La Symphonie des Contraintes */}
      <section className="mb-16 p-10 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Layers className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">La Symphonie des Contraintes</h2>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">L'INTELLIGENCE NAÎT DE LA FRICTION, PAS DU CONSENSUS.</h3>
          <p className="text-base text-obsidia-ink/70 leading-relaxed font-light">
            Nos agents ne collaborent pas pour s'accorder ; ils s'affrontent pour se valider. Le Douteur, l'Empathe et le Nettoyeur forment un écosystème de <span className="text-obsidia-ink font-bold">tensions nécessaires</span>. 
            C'est cette orchestration par le Noyau qui transforme une multitude d'IA spécialisées en une intelligence souveraine.
          </p>
        </div>
      </section>

      <div className="mb-24">
        <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">Activité des Agents en Temps Réel</h2>
        <LiveAgentActivity />
      </div>

      <p className="text-xl text-obsidia-ink/60 mb-12 max-w-3xl leading-relaxed">
        L'intelligence Obsidia n'est pas un bloc monolithique. Elle est une symphonie d'agents spécialisés, 
        chacun doté d'un rôle critique dans la chaîne de vérité.
      </p>
      
      <AgentsGrid />

      <div className="mt-20 space-y-16">
        <div className="border-l-2 border-obsidia-accent pl-8">
          <h2 className="text-2xl font-bold uppercase mb-6 tracking-tight">L'Orchestration Cognitive</h2>
          <p className="text-obsidia-ink/60 max-w-4xl leading-relaxed">
            Contrairement aux agents classiques qui s'auto-alimentent, les agents Obsidia sont orchestrés par 
            le Noyau Déterministe. Ils ne peuvent pas "décider" de sortir du cadre. Leur autonomie est 
            confinée à l'Espace Latent pour l'exploration, mais leur influence sur la Mémoire Gouvernée 
            est soumise à un arbitrage strict.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 border border-white/5 bg-white/5">
            <h3 className="text-sm font-bold uppercase mb-4">Protocole d'Arbitrage</h3>
            <p className="text-xs text-obsidia-ink/50 leading-relaxed">
              Lorsqu'un agent (ex: L'Extracteur) propose une structure, Le Douteur doit tenter de l'invalider. 
              Si le conflit persiste, le Noyau Déterministe tranche en faveur de la structure la plus 
              cohérente avec la mémoire existante. C'est la fin du consensus mou.
            </p>
          </div>
          <div className="p-8 border border-white/5 bg-white/5">
            <h3 className="text-sm font-bold uppercase mb-4">Pourquoi c'est vital ?</h3>
            <p className="text-xs text-obsidia-ink/50 leading-relaxed">
              La spécialisation évite la "dilution de compétence" des modèles généralistes. 
              Chaque agent est un expert dans son domaine (Friction, Isolation, Synthèse), 
              garantissant une profondeur d'analyse impossible pour un agent unique.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const ReflexPage = ({ features }: { features: any }) => (
  <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Le Protocole Reflex</h1>
      
      {/* Narrative Block: L'Instinct de la Preuve */}
      <section className="mb-16 p-10 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Zap className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">L'Instinct de la Preuve</h2>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">LA VITESSE SANS CONTRÔLE EST UNE FAILLE.</h3>
          <p className="text-base text-obsidia-ink/70 leading-relaxed font-light">
            Le protocole Reflex est la réponse d'Obsidia à l'exigence de réactivité. En reconnaissant instantanément des patterns déjà validés, le système agit avec l'immédiateté d'un réflexe biologique. 
            Mais contrairement au vivant, ce réflexe est <span className="text-obsidia-ink font-bold">mathématiquement prouvé</span> : il ne s'active que si la trajectoire est déjà scellée.
          </p>
        </div>
      </section>

      <p className="text-xl text-obsidia-ink/60 mb-16 max-w-3xl leading-relaxed">
        Reflex permet de court-circuiter les calculs lourds en reconnaissant des patterns déjà validés (mémoire fractale). 
        C'est l'assurance d'une réactivité extrême sans sacrifier la sécurité finale.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-8">
          <div className="p-8 border border-obsidia-accent/20 bg-obsidia-accent/5">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="text-obsidia-accent" />
              <h3 className="text-lg font-bold uppercase tracking-tight">Métrique Technique</h3>
            </div>
            <div className="text-4xl font-mono text-obsidia-accent mb-2">Latence &lt; 5ms</div>
            <p className="text-xs text-obsidia-ink/40 uppercase tracking-widest">Temps de validation X-108 en mode Reflex</p>
          </div>
          
          <div className="p-8 border border-obsidia-border bg-white/5">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4">La Garantie Obsidia</h3>
            <p className="text-sm text-obsidia-ink/60 leading-relaxed">
              Reflex propose une action rapide, mais la couche déterministe garde toujours le droit de veto final. 
              La vitesse n'écrase jamais la sécurité. Si un doute structurel émerge, le système repasse instantanément en mode Deep-Audit.
            </p>
          </div>
        </div>
        
        <div className="relative aspect-video border border-obsidia-border bg-obsidia-ink/5 flex items-center justify-center">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="text-center w-full px-12">
            <div className="text-[10px] font-mono text-obsidia-accent mb-4 uppercase tracking-[0.5em]">Reflex Stream | COHERENCE: {features?.coherence || '0.92'}</div>
            <div className="flex gap-2 justify-center items-end h-20">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <motion.div 
                  key={i}
                  animate={{ 
                    height: [
                      10 + Math.random() * 20, 
                      30 + Math.random() * 40, 
                      10 + Math.random() * 20
                    ] 
                  }}
                  transition={{ 
                    duration: 0.5 + Math.random(), 
                    repeat: Infinity, 
                    delay: i * 0.05 
                  }}
                  className="w-2 bg-obsidia-accent"
                />
              ))}
            </div>
            <div className="mt-4 text-[8px] font-mono opacity-30 uppercase tracking-widest">
              VOLATILITY: {features?.volatility || '0.05'} | REGIME: {features?.regime || 'STABLE'}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-obsidia-border pt-16">
        <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">L'Architecture Duale en Action</h2>
        <p className="text-obsidia-ink/60 max-w-4xl leading-relaxed">
          Le protocole Reflex n'est pas une faille, c'est une optimisation. En utilisant la mémoire fractale des vérités déjà scellées, 
          Obsidia peut agir à la vitesse de la pensée humaine tout en restant sous la garde constante du Juge Déterministe. 
          C'est la fin du compromis entre performance et sûreté.
        </p>
      </div>
    </motion.div>
  </div>
);

const SystemStatusBar = ({ features, engineStatus }: { features: any, engineStatus: any }) => {
  return (
    <div className="bg-obsidia-ink border-b border-obsidia-accent/20 py-2 px-6 flex justify-between items-center overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${engineStatus ? 'bg-obsidia-accent animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[9px] font-mono text-obsidia-accent uppercase tracking-widest">
            Engine: {engineStatus ? 'Online' : 'Offline'}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 border-l border-obsidia-accent/10 pl-6">
          <div className="flex flex-col">
            <span className="text-[8px] opacity-40 uppercase tracking-tighter">Cohérence</span>
            <span className="text-[10px] font-mono text-obsidia-accent">{(features?.coherence * 100 || 0).toFixed(1)}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] opacity-40 uppercase tracking-tighter">Agents</span>
            <span className="text-[10px] font-mono text-obsidia-accent">{features?.active_agents || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] opacity-40 uppercase tracking-tighter">Régime</span>
            <span className="text-[10px] font-mono text-obsidia-accent uppercase">{features?.regime || 'Stable'}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-[9px] font-mono opacity-30 uppercase tracking-widest">
          X-108 GOVERNANCE CORE v1.3.0
        </div>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-obsidia-accent opacity-50" />
          <span className="text-[9px] font-mono text-obsidia-accent opacity-50">LIVE</span>
        </div>
      </div>
    </div>
  );
};

const LiveProofDashboard = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const newPoint = {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        throughput: 800 + Math.random() * 400, // Proofs per second
        latency: 2 + Math.random() * 3 // ms
      };
      setData(prev => [...prev, newPoint].slice(-15));
    };

    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="p-6 border border-obsidia-border bg-obsidia-ink/5 h-[300px]">
        <h3 className="text-[10px] font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-6">Débit de Vérification (Proofs/s)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#141414" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#141414" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #141414', fontSize: '10px' }} />
            <Line type="monotone" dataKey="throughput" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="p-6 border border-obsidia-border bg-obsidia-ink/5 h-[300px]">
        <h3 className="text-[10px] font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-6">Latence du Juge (ms)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#141414" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#141414" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #141414', fontSize: '10px' }} />
            <Area type="stepAfter" dataKey="latency" stroke="#10b981" fill="#10b981" fillOpacity={0.1} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ProofLabPage = () => {
  const [simulationState, setSimulationState] = useState<'idle' | 'proposing' | 'intercepting' | 'blocked' | 'executed'>('idle');
  const [proofData, setProofData] = useState<any>(null);

  const startSimulation = async () => {
    setSimulationState('proposing');
    
    try {
      const res = await fetch('/api/simulation', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Adapt simulation data for proof context
        setProofData({
          domain: data.data.asset === 'BTC/USD' ? 'Cognition' : 'Action',
          type: data.data.side === 'BUY' ? 'Expansion' : 'Contraction',
          complexity: data.data.amount,
          coherence: data.data.price,
          risk_score: data.data.risk_score
        });
        
        setTimeout(() => {
          setSimulationState('intercepting');
          setTimeout(() => {
            setSimulationState(data.decision === 'VETO' ? 'blocked' : 'executed');
          }, 2000);
        }, 2000);
      }
    } catch (error) {
      console.error("Simulation failed:", error);
      setSimulationState('idle');
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Proof Lab : Vérification Formelle</h1>
        
        {/* Narrative Block: L'Épreuve de la Preuve */}
        <section className="mb-16 p-10 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Activity className="w-48 h-48" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-4">L'Épreuve de la Preuve</h2>
            <h3 className="text-3xl font-bold mb-4 tracking-tight">LA THÉORIE PROUVE, LA MATHÉMATIQUE SCELLE.</h3>
            <p className="text-base text-obsidia-ink/70 leading-relaxed font-light">
              Le Proof Lab est l'environnement de test où Obsidia démontre sa <span className="text-obsidia-ink font-bold">supériorité mathématique</span>. 
              C'est ici que nous éprouvons les invariants du protocole X-108 face à des simulations de dérive cognitive. 
              Chaque proposition de l'IA est soumise au Juge pour une validation formelle en temps réel.
            </p>
          </div>
        </section>

        <p className="text-xl text-obsidia-ink/60 mb-16 max-w-3xl leading-relaxed">
          Démonstration de l'architecture duale appliquée à la vérification de cohérence. 
          Le Juge Déterministe intercepte chaque proposition de structure cognitive avant qu'elle ne soit scellée dans la mémoire.
        </p>

        <div className="mb-24">
          <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.3em] mb-8">Métriques de Preuve en Temps Réel</h2>
          <LiveProofDashboard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="p-10 border border-obsidia-border bg-white/5">
            <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Simulation de Vérification X-108</h2>
            <div className="space-y-6">
              <div className="p-6 bg-obsidia-ink border border-obsidia-accent/20 font-mono text-xs">
                <div className="flex justify-between mb-4">
                  <span className="text-obsidia-accent/40">SYSTÈME:</span>
                  <span className="text-obsidia-accent">X-108 GOVERNANCE CORE</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-obsidia-accent/40">[09:42:12]</span>
                    <span>Initialisation du flux de vérification...</span>
                  </div>
                  {simulationState !== 'idle' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <span className="text-obsidia-accent/40">[09:42:14]</span>
                      <span className="text-blue-400">IA: Proposition de structure cognitive.</span>
                    </motion.div>
                  )}
                  {(simulationState === 'intercepting' || simulationState === 'blocked' || simulationState === 'executed') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <span className="text-obsidia-accent/40">[09:42:16]</span>
                      <span className="text-yellow-400">JUGE: Vérification formelle Lean 4...</span>
                    </motion.div>
                  )}
                  {simulationState === 'blocked' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <span className="text-obsidia-accent/40">[09:42:18]</span>
                      <span className="text-red-500 font-bold">JUGE: VETO APPLIQUÉ. STRUCTURE INVALIDÉE.</span>
                    </motion.div>
                  )}
                  {simulationState === 'executed' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <span className="text-obsidia-accent/40">[09:42:18]</span>
                      <span className="text-obsidia-accent font-bold">JUGE: PREUVE VALIDÉE. STRUCTURE SCELLÉE.</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {simulationState === 'idle' ? (
                <button 
                  onClick={startSimulation}
                  className="w-full py-4 bg-obsidia-accent text-obsidia-bg font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                  Lancer la Vérification
                </button>
              ) : (
                <button 
                  onClick={() => setSimulationState('idle')}
                  className="w-full py-4 border border-obsidia-border text-obsidia-ink/40 font-bold uppercase tracking-widest text-xs hover:text-obsidia-ink transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          <div className="p-10 border border-obsidia-border bg-obsidia-ink/[0.02]">
            <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Détails de la Preuve</h2>
            {proofData ? (
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between py-2 border-b border-obsidia-border/50">
                  <span className="opacity-40">DOMAINE</span>
                  <span>{proofData.domain}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-obsidia-border/50">
                  <span className="opacity-40">TYPE</span>
                  <span className="text-obsidia-accent">{proofData.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-obsidia-border/50">
                  <span className="opacity-40">COMPLEXITÉ</span>
                  <span>{proofData.complexity}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-obsidia-border/50">
                  <span className="opacity-40">COHÉRENCE</span>
                  <span>{proofData.coherence}</span>
                </div>
                <div className="pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">Score de Risque</span>
                    <span className={proofData.risk_score > 0.8 ? 'text-red-500' : 'text-obsidia-accent'}>{proofData.risk_score}</span>
                  </div>
                  <div className="w-full h-1 bg-obsidia-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${proofData.risk_score * 100}%` }}
                      className={`h-full ${proofData.risk_score > 0.8 ? 'bg-red-500' : 'bg-obsidia-accent'}`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-obsidia-ink/20 italic text-sm">
                En attente de proposition...
              </div>
            )}
          </div>
        </div>

        <section className="border-t border-obsidia-border pt-16">
          <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Pourquoi le Proof Lab ?</h2>
          <p className="text-obsidia-ink/60 max-w-4xl leading-relaxed mb-8">
            La vérification formelle est l'environnement de test ultime pour une AGI. Elle exige une vitesse d'exécution millimétrée (Reflex) 
            et une sécurité absolue (Juge). Dans le Proof Lab, nous prouvons que le Juge Déterministe peut intercepter 
            des structures cognitives complexes en moins de 5ms, garantissant qu'aucune hallucination de l'IA ne puisse polluer 
            le noyau de gouvernance.
          </p>
          <a 
            href={PROOFS_REPO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-obsidia-accent font-mono text-xs uppercase tracking-widest hover:underline"
          >
            Consulter le dépôt GitHub <Zap className="w-3 h-3" />
          </a>
        </section>
      </motion.div>
    </div>
  );
};

const WhitepaperPage = () => {
  const [copied, setCopied] = useState(false);
  const terminalCode = `$ cd proofkit
$ python verify_all.py
[INFO] Loading X-108 Temporal invariants...
[INFO] Checking Lean 4 conformance...
[SUCCESS] X-108 STD 1.0 — ALL CHECKS PASS`;

  const handleCopy = () => {
    navigator.clipboard.writeText(terminalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { 
      num: "01", 
      title: "COMPRENDRE", 
      desc: "Accédez au Livre Blanc et aux spécifications détaillées de l'architecture duale Obsidia.", 
      link: WHITEPAPER_URL,
      label: "Lire le Livre Blanc"
    },
    { 
      num: "02", 
      title: "VÉRIFIER", 
      desc: "Examinez les preuves formelles Lean 4 et les modèles TLA+ validant le protocole X-108.", 
      link: SPEC_URL,
      label: "Voir les Preuves"
    },
    { 
      num: "03", 
      title: "REPRODUIRE", 
      desc: "Déployez le noyau Rust en local et testez les invariants face à vos propres simulations.", 
      link: SRC_URL,
      label: "Cloner le Noyau"
    },
    { 
      num: "04", 
      title: "AUDITER", 
      desc: "Suivez le guide d'audit complet pour valider l'étanchéité entre l'IA et le Juge Déterministe.", 
      link: AUDIT_GUIDE_URL,
      label: "Lancer l'Audit"
    },
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-5xl font-bold mb-8 uppercase tracking-tighter">Livre Blanc & Ressources</h1>
        
        {/* Section: Le Pari de la Transparence */}
        <section className="mb-24 p-12 border border-obsidia-accent/20 bg-obsidia-accent/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-6">Le Pari de la Transparence</h2>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">L'AGI NE PEUT PAS ÊTRE UNE BOÎTE NOIRE.</h3>
            <p className="text-lg text-obsidia-ink/70 leading-relaxed font-light">
              Nous croyons que la sécurité d'une intelligence artificielle souveraine ne peut reposer sur le secret industriel, mais sur la <span className="text-obsidia-ink font-bold">vérifiabilité universelle</span>. 
              Obsidia publie l'intégralité de ses invariants mathématiques et de sa logique de gouvernance. 
              Parce que dans un monde automatisé, la confiance est une faille ; seule la preuve est une protection.
            </p>
          </div>
        </section>

        {/* 4 Numbered Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-obsidia-border border border-obsidia-border mb-24">
          {steps.map((step, i) => (
            <div key={i} className="p-12 bg-obsidia-bg hover:bg-obsidia-accent/[0.02] transition-colors group">
              <div className="text-5xl font-bold text-obsidia-accent/20 mb-6 group-hover:text-obsidia-accent/40 transition-colors font-mono">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">{step.title}</h3>
              <p className="text-sm text-obsidia-ink/60 leading-relaxed mb-8 h-12">
                {step.desc}
              </p>
              <a 
                href={step.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-mono text-obsidia-accent uppercase tracking-widest hover:underline"
              >
                {step.label} <Zap className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        <section className="mb-24">
          <h2 className="text-3xl font-bold uppercase mb-8 tracking-tight">Application : Trading Déterministe (Lab-Trad)</h2>
          <div className="p-10 border border-obsidia-border bg-obsidia-ink/[0.02]">
            <p className="text-obsidia-ink/80 leading-relaxed mb-8">
              Le noyau de gouvernance Obsidia est implémenté dans un environnement de trading réel via notre laboratoire <strong>Obsidia-lab-trad</strong>. 
              Ce dépôt centralise l'exécution des stratégies, la vérification formelle des ordres (ProofKit), et les preuves adversariales de niveau bancaire.
            </p>
            <div className="mb-8 p-6 bg-obsidia-bg border border-obsidia-border">
              <h4 className="text-sm font-bold uppercase mb-2">Standard X-108 appliqué à la Cognition :</h4>
              <p className="text-sm text-obsidia-ink/60">
                Chaque structure cognitive passe par l'interface de gouvernance ex-ante (X-108 STD 1.0). 
                Si la cohérence ou la dérive dépasse les invariants mathématiques, la structure est invalidée avant scellement.
              </p>
            </div>
            <a 
              href={PROOFS_REPO_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-obsidia-accent text-obsidia-bg font-bold rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-xs"
            >
              Explorer le Proof Lab
            </a>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold uppercase mb-8 tracking-tight">Vérification Indépendante</h2>
          <p className="text-obsidia-ink/60 mb-8 max-w-2xl">
            Vous pouvez vérifier l'intégrité du système localement en exécutant le kit de preuve.
          </p>
          <div className="relative group">
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 px-3 py-1 bg-white/10 hover:bg-white/20 text-[10px] font-mono uppercase tracking-widest rounded transition-colors z-10"
            >
              {copied ? 'Copié !' : 'Copier le script'}
            </button>
            <pre className="p-8 bg-obsidia-ink text-obsidia-accent font-mono text-sm overflow-x-auto border border-obsidia-accent/20">
              <code>{terminalCode}</code>
            </pre>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-obsidia-border pt-24 pb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter uppercase">Vous avez audité. <br />Vous voulez <span className="text-obsidia-accent italic">déployer ?</span></h2>
          <p className="text-obsidia-ink/60 mb-12 max-w-2xl mx-auto font-light">
            L'architecture Obsidia est prête pour l'intégration dans vos infrastructures critiques. 
            Passez de la preuve théorique à la certitude opérationnelle.
          </p>
          <button className="px-12 py-6 bg-obsidia-accent text-obsidia-bg font-bold rounded-sm hover:bg-obsidia-ink hover:text-obsidia-bg transition-all duration-300 uppercase tracking-[0.2em] text-sm">
            Démarrer l'Intégration
          </button>
        </section>
      </motion.div>
    </div>
  );
};

const Footer = () => (
  <footer className="py-20 px-4 border-t border-obsidia-border bg-obsidia-bg">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="text-obsidia-accent w-6 h-6" />
          <span className="font-mono font-bold tracking-tighter text-lg">OBSIDIA AGI</span>
        </div>
        <p className="text-xs text-obsidia-ink/40 leading-relaxed">
          L'architecture duale pour une cognition souveraine et gouvernée. 
          Le futur de l'AGI est déterministe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-obsidia-ink/40 mb-6">Ressources</h4>
          <ul className="space-y-4 text-xs">
            <li>
              <a 
                href={WHITEPAPER_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-obsidia-accent transition-colors flex flex-col"
              >
                <span>Livre Blanc AGI</span>
                <span className="text-[9px] opacity-50">(Bientôt : version AGI dédiée)</span>
              </a>
            </li>
            <li>
              <a 
                href={AUDIT_GUIDE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-obsidia-accent transition-colors flex flex-col"
              >
                <span>Auditer l'Espace Latent</span>
                <span className="text-[9px] opacity-50">(Bientôt : guide AGI dédiée)</span>
              </a>
            </li>
            <li>
              <a 
                href={PROOFS_DIR_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-obsidia-accent transition-colors flex flex-col"
              >
                <span>Preuves Mathématiques</span>
                <span className="text-[9px] opacity-50">(Preuves Kernel actuellement disponibles)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-obsidia-ink/40 mb-6">Écosystème</h4>
          <ul className="space-y-4 text-xs">
            <li><a href={ENGINE_API_URL} target="_blank" rel="noopener noreferrer" className="hover:text-obsidia-accent transition-colors">Governance Core</a></li>
            <li><a href={PROOFS_REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-obsidia-accent transition-colors">Sigma Engine (GitHub)</a></li>
            <li><a href={WHITEPAPER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-obsidia-accent transition-colors">Livre Blanc (Architecture)</a></li>
            <li><a href={AUDIT_DIR_URL} target="_blank" rel="noopener noreferrer" className="hover:text-obsidia-accent transition-colors">Guide d'Audit v1.3.0</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-obsidia-border flex justify-between items-center text-[10px] uppercase tracking-widest text-obsidia-ink/20">
      <p>© 2026 OBSIDIA GOVERNANCE CORE</p>
      <p>SCELLÉ PAR LE JUGE DÉTERMINISTE</p>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [engineStatus, setEngineStatus] = useState<any>(null);
  const [features, setFeatures] = useState<any>(null);
  const [gates, setGates] = useState<any>([]);
  const [pythonStatus, setPythonStatus] = useState<any>(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToTop();
    const titles: Record<string, string> = {
      home: "Obsidia AGI — Cognition Gouvernée",
      latent: "L'Espace Latent | Obsidia AGI",
      memory: "Mémoire Gouvernée | Obsidia AGI",
      agents: "Agents Périphériques | Obsidia AGI",
      reflex: "Protocole Reflex | Obsidia AGI",
      whitepaper: "Livre Blanc | Obsidia AGI",
      'proof-lab': "Proof Lab | Obsidia AGI"
    };
    document.title = titles[activePage] || "Obsidia AGI — Cognition Gouvernée";
  }, [activePage, scrollToTop]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // GET /api/health
        const healthRes = await fetch('/api/health');
        if (healthRes.ok) setEngineStatus(await healthRes.json());

        // POST /api/features
        const featuresRes = await fetch('/api/features', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
        if (featuresRes.ok) setFeatures(await featuresRes.json());

        // POST /api/gates
        const gatesRes = await fetch('/api/gates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
        if (gatesRes.ok) setGates(await gatesRes.json());

        // GET /api/python-engine/health
        const pythonRes = await fetch('/api/python-engine/health');
        if (pythonRes.ok) setPythonStatus(await pythonRes.json());
      } catch (error) {
        console.error("Backend unreachable, using fallback values.");
        // Fallback values are handled by the components using optional chaining or defaults
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-obsidia-bg text-obsidia-ink">
      <header className="sticky top-0 z-50">
        <ConstructionBanner />
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <SystemStatusBar features={features} engineStatus={engineStatus} />
      </header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              
              {/* Narrative Block: La Souveraineté par le Déterminisme */}
              <section className="py-20 px-6 bg-obsidia-bg border-t border-obsidia-border relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                      <h2 className="text-xs font-mono text-obsidia-accent uppercase tracking-[0.4em] mb-6">Manifeste</h2>
                      <h3 className="text-4xl font-bold mb-6 tracking-tight">REPRENDRE LE CONTRÔLE SUR L'ALÉA COGNITIF.</h3>
                      <p className="text-lg text-obsidia-ink/70 leading-relaxed font-light">
                        L'intelligence artificielle actuelle souffre d'un péché originel : l'imprévisibilité. Obsidia change de paradigme en séparant radicalement la cognition (l'IA) de la décision (le Juge). 
                        Nous ne cherchons pas à rendre l'IA parfaite, nous la rendons <span className="text-obsidia-ink font-bold">gouvernable</span>. 
                        C'est la naissance d'une AGI souveraine, où chaque action est une preuve, pas une probabilité.
                      </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="w-64 h-64 border border-obsidia-accent/20 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 animate-spin-slow border-t-2 border-obsidia-accent rounded-full" />
                        <Shield className="w-24 h-24 text-obsidia-accent/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <SystemStats features={features} />
              <ArchitectureLayers />
              <ProofSection />
              <ThoughtCycle />
              <AgentsGrid />
              <ReflexSection />
            </motion.div>
          )}

          {activePage === 'latent' && (
            <motion.div
              key="latent"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LatentSpacePage />
            </motion.div>
          )}

          {activePage === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MemoryPage />
            </motion.div>
          )}

          {activePage === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AgentsPage />
            </motion.div>
          )}

          {activePage === 'reflex' && (
            <motion.div
              key="reflex"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ReflexPage features={features} />
            </motion.div>
          )}

          {activePage === 'whitepaper' && (
            <motion.div
              key="whitepaper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <WhitepaperPage />
            </motion.div>
          )}

          {activePage === 'proof-lab' && (
            <motion.div
              key="proof-lab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProofLabPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
