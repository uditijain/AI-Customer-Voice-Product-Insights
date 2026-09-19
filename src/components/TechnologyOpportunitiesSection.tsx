import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Gauge,
  Workflow,
  Sparkles,
  Layers,
  Clock,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { TechAIOpportunityItem } from '../types';

interface TechnologyOpportunitiesSectionProps {
  opportunities: TechAIOpportunityItem[];
}

export const TechnologyOpportunitiesSection: React.FC<TechnologyOpportunitiesSectionProps> = ({
  opportunities,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'GenAI & LLM', 'Intelligent Automation', 'Predictive Analytics', 'Workflow Modernization'];

  const filtered = opportunities.filter(
    (o) => activeCategory === 'All' || o.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'GenAI & LLM':
        return <Bot className="w-4 h-4 text-blue-600" />;
      case 'Intelligent Automation':
        return <Workflow className="w-4 h-4 text-emerald-600" />;
      case 'Predictive Analytics':
        return <Gauge className="w-4 h-4 text-purple-600" />;
      default:
        return <Cpu className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                Technology, Automation &amp; AI Opportunities
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Strategic technology architectures to resolve customer pain points and drive operational leverage
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all text-xs ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Tech Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-slate-100">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {item.category}
                  </span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    item.implementationFeasibility.includes('High')
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.implementationFeasibility.includes('Moderate')
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1 -mt-0.5" />
                  {item.implementationFeasibility}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-900 mb-3 font-serif-title leading-snug">
                {item.title}
              </h4>

              {/* Customer Problem Addressed */}
              <div className="p-3 rounded-lg bg-rose-50/40 border border-rose-100/70 text-xs text-rose-950 mb-3">
                <span className="font-bold text-rose-800 block mb-0.5">
                  Voice of Customer Problem Addressed:
                </span>
                <p className="italic text-slate-700">"{item.customerProblemAddressed}"</p>
              </div>

              {/* Proposed Solution */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800 mb-3">
                <span className="font-semibold text-slate-900 block mb-0.5">
                  Proposed Solution &amp; Architecture:
                </span>
                <p className="leading-relaxed">{item.proposedSolution}</p>
              </div>

              {/* Recommended Tech Approach */}
              <div className="text-xs text-slate-600 mb-2">
                <span className="font-semibold text-slate-800 block mb-0.5">
                  Architectural Implementation:
                </span>
                <p className="text-slate-600 leading-relaxed font-mono text-[11px] bg-slate-100/70 p-2 rounded border border-slate-200/50">
                  {item.recommendedApproach}
                </p>
              </div>
            </div>

            {/* Operational Impact Banner */}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <div className="flex items-center justify-between bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 text-xs">
                <span className="font-semibold text-blue-950 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-blue-600" />
                  Proposed Efficiency Impact:
                </span>
                <span className="font-semibold text-blue-900 text-right pl-2">
                  {item.expectedEfficiencyOrRoi}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
