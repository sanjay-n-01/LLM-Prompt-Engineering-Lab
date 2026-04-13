import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  X, 
  Menu, 
  LayoutDashboard, 
  BrainCircuit, 
  Search,
  ArrowRight
} from 'lucide-react';
import { essays } from './data';
import { Essay, Tier } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [activeTier, setActiveTier] = useState<Tier | 'Reflection'>('All');
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEssays = useMemo(() => {
    let result = essays;
    if (activeTier !== 'All' && activeTier !== 'Reflection') {
      result = essays.filter(e => e.tier.startsWith(activeTier));
    }
    if (searchQuery) {
      result = result.filter(e => 
        e.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [activeTier, searchQuery]);

  const tiers: Tier[] = ['All', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6'];

  // Close sidebar on mobile when tier changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTier]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-72 bg-slate-900 text-white flex flex-col z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Prompt Lab
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.2em] font-bold opacity-70">
              Linguistic Laboratory
            </p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <h3 className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 mt-4">
            Complexity Tiers
          </h3>
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3",
                activeTier === tier
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <LayoutDashboard size={18} className={activeTier === tier ? "opacity-100" : "opacity-50"} />
              {tier === 'All' ? 'All Iterations' : tier}
            </button>
          ))}

          <div className="pt-8 mt-4 border-t border-white/5">
            <button
              onClick={() => setActiveTier('Reflection')}
              className={cn(
                "w-full text-left px-4 py-4 rounded-2xl text-sm font-bold transition-all group flex items-center justify-between",
                activeTier === 'Reflection'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white"
              )}
            >
              <span className="flex items-center gap-3">
                <BrainCircuit size={18} />
                Project Reflection
              </span>
              <ChevronRight size={16} className={cn("transition-transform", activeTier === 'Reflection' ? "rotate-90" : "")} />
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5 bg-black/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Prompt Logic</span>
              <span className="text-indigo-400 font-bold">Claude 4.6</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Generation</span>
              <span className="text-indigo-400 font-bold">Gemini 3 Flash</span>
            </div>
            <div className="mt-4 bg-slate-800 h-1 rounded-full overflow-hidden flex">
              <div className="w-1/2 h-full bg-indigo-500/50"></div>
              <div className="w-1/2 h-full bg-indigo-400"></div>
            </div>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-tight text-center">
              Multi-Model Hybrid Synthesis
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 lg:px-10 flex justify-between items-center z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg lg:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                The Rank Paradox: Excellence as a Mission, First Place as a Byproduct.
              </h2>
              <p className="text-[10px] lg:text-sm text-slate-500 mt-1 font-medium">
                Filtered by <span className="text-indigo-600 font-bold">{activeTier === 'Reflection' ? 'Reflection' : activeTier === 'All' ? 'All Iterations' : activeTier}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-1.5 border border-slate-200 focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300 transition-all">
              <Search size={16} className="text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-64"
              />
            </div>
            <div className="px-3 py-1.5 lg:px-4 lg:py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              <span className="text-xs lg:text-sm font-bold text-indigo-700">
                {activeTier === 'Reflection' ? 'Insight Mode' : filteredEssays.length}
              </span>
              <span className="hidden sm:inline text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none">
                {activeTier === 'Reflection' ? '' : 'Essays'}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-slate-50/50">
          <AnimatePresence mode="wait">
            {activeTier === 'Reflection' ? (
              <motion.div
                key="reflection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Author's Analysis</h2>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {[
                    {
                      id: 1,
                      title: "The Default Is Motivational Slop",
                      desc: "When given a vague prompt (Tier 1), the LLM defaulted to surface-level motivational writing phrases. Any nuance evaporated without explicit framing."
                    },
                    {
                      id: 2,
                      title: "Structure Commands Compliance",
                      desc: "Tier 2 and 3 prompts produced structurally correct essays but arguments remained predictable. The LLM filled the format without genuine wrestling."
                    },
                    {
                      id: 3,
                      title: "Philosophical Framing Unlocks Thinking",
                      desc: "Tier 4 was the turning point. Philosophical frameworks like Wu Wei or Goodhart's Law produced ideas that felt genuinely constructed."
                    },
                    {
                      id: 4,
                      title: "The LLM Argues Both Sides",
                      desc: "Tier 5 revealed that the LLM will argue any position with equal polish. It is a mirror, not a thinker. Quality is a function of input."
                    },
                    {
                      id: 5,
                      title: "Style Is a Genuine Lever",
                      desc: "Tier 6 proved style is not decoration—it is a primary variable. The assigned voice determines how powerfully the message lands."
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-6">
                        {item.id}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="relative bg-slate-900 rounded-[2.5rem] p-10 lg:p-20 overflow-hidden mb-10">
                  <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20"></div>
                  <div className="relative z-10 max-w-3xl">
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 tracking-tight leading-tight">
                      Conclusion: Prompt Engineering Is Thinking, Not Typing
                    </h2>
                    <div className="space-y-6 text-indigo-100/80 text-lg lg:text-xl leading-relaxed italic font-serif">
                      <p>"The single biggest lesson from 150 essays on one topic: <strong>the LLM is only as smart as your prompt is precise.</strong> A lazy prompt produces lazy output."</p>
                      <p className="not-italic font-sans text-slate-400 text-sm uppercase tracking-widest font-bold">
                        The LLM did not get smarter across these 150 prompts—I did.
                      </p>
                      <p className="not-italic font-sans text-indigo-200 text-base">
                        First place in prompt engineering, it turns out, is a byproduct too—of thinking clearly about what you actually want to say.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                {filteredEssays.map((essay) => (
                  <motion.div
                    layout
                    key={essay.id}
                    onClick={() => setSelectedEssay(essay)}
                    className="essay-card bg-white p-6 rounded-[2rem] border border-slate-200/60 flex flex-col h-[300px] cursor-pointer shadow-sm relative group overflow-hidden hover:border-indigo-200 transition-all"
                  >
                    <div className="mb-4 flex justify-between items-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
                        {essay.tier.split(':')[0]}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-indigo-300 transition-colors">
                        #{String(essay.id).padStart(3, '0')}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {essay.prompt}
                      </h4>
                      <p className="text-sm text-slate-500 font-serif leading-relaxed line-clamp-4 italic opacity-80">
                        "{essay.content.substring(0, 200)}..."
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:opacity-100 opacity-60 transition-opacity">
                        Full Read
                      </span>
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center transform group-hover:translate-x-1 transition-all">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Essay Modal */}
      <AnimatePresence>
        {selectedEssay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEssay(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="px-6 py-5 lg:px-10 lg:py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4 lg:gap-6">
                  <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                    {selectedEssay.tier}
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-400">
                    ID: {String(selectedEssay.id).padStart(3, '0')}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEssay(null)}
                  className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 text-slate-400 hover:text-slate-600 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 lg:p-16 custom-scrollbar">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl lg:text-4xl font-black text-slate-900 leading-tight mb-8 lg:mb-12 tracking-tight text-center">
                    {selectedEssay.prompt}
                  </h3>
                  <div className="text-base lg:text-lg text-slate-700 leading-[1.8] font-serif whitespace-pre-wrap">
                    {selectedEssay.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
