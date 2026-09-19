import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Target,
  UserCheck,
  Zap,
  Filter,
  CheckCircle,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import { RecommendedActionItem } from '../types';

interface RecommendedActionsSectionProps {
  actions: RecommendedActionItem[];
}

export const RecommendedActionsSection: React.FC<RecommendedActionsSectionProps> = ({
  actions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');

  const categories = ['All', 'Quick Win', 'Product Roadmap', 'Customer Success & Support', 'Strategic Policy'];
  const priorities = ['All', 'Immediate (P0)', 'Near-term (P1)', 'Medium-term (P2)'];

  const filteredActions = actions.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedPriority !== 'All' && item.priority !== selectedPriority) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                Evidence-Based Recommendations
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Evidence-Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practical business and product recommendations directly supported by customer feedback
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPriority(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    selectedPriority === p
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="pt-3 flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border transition-all text-xs ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 font-medium'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Action Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredActions.map((action, idx) => (
          <div
            key={action.id || idx}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                    action.priority.includes('P0')
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : action.priority.includes('P1')
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {action.priority}
                </span>

                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {action.category}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2.5 font-serif-title">
                {action.title}
              </h4>

              {/* Observed Customer Evidence */}
              {action.observedCustomerEvidence && (
                <div className="mb-3 text-xs bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80">
                  <span className="font-semibold text-amber-950 block mb-1 flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-amber-700" />
                    Observed Customer Feedback:
                  </span>
                  <p className="text-amber-900 leading-relaxed italic">
                    "{action.observedCustomerEvidence}"
                  </p>
                </div>
              )}

              {/* Implementation Steps */}
              <div className="mb-3 text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block mb-1 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                  Execution Roadmap:
                </span>
                <p className="pl-5 text-slate-600 leading-relaxed">
                  {action.implementationPlan}
                </p>
              </div>
            </div>

            {/* Footer KPIs & Owner */}
            <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                  Target Segment:
                </span>
                <span className="font-semibold text-slate-800">
                  {action.targetSegment}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs bg-emerald-50/70 p-2 rounded border border-emerald-100">
                <span className="text-emerald-950 font-semibold">
                  Proposed Business Impact:
                </span>
                <span className="text-emerald-800 font-medium text-right pl-2">
                  {action.expectedBusinessImpact}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-slate-400" />
                  Functional Owner:
                </span>
                <span className="font-mono text-slate-700 font-medium">
                  {action.ownerFunction}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
