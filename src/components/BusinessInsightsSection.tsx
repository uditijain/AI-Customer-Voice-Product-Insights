import React from 'react';
import {
  FileText,
  ShieldAlert,
  HeartHandshake,
  TrendingDown,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ExecutiveInsights } from '../types';

interface BusinessInsightsSectionProps {
  insights: ExecutiveInsights;
}

export const BusinessInsightsSection: React.FC<BusinessInsightsSectionProps> = ({
  insights,
}) => {
  return (
    <div className="space-y-6">
      {/* Executive Briefing Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-blue-300" />
          </div>
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-bold">
                Executive Briefing
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Synthesis &amp; Advisory
              </span>
            </div>
            <h2 className="text-lg font-bold font-serif-title text-white leading-relaxed">
              {insights.executiveSummary}
            </h2>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Churn Hazards vs Satisfaction Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Churn Vulnerabilities */}
        <div className="bg-white rounded-xl border border-rose-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-rose-50 text-rose-600 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                Retention &amp; Churn Vulnerabilities
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Risk Factors
            </span>
          </div>

          <ul className="space-y-3">
            {insights.churnRisks.map((risk, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-rose-50/30 border border-rose-100/60 text-xs text-slate-800"
              >
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  !
                </span>
                <span className="leading-relaxed">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Satisfaction Anchors */}
        <div className="bg-white rounded-xl border border-emerald-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                Core Satisfaction &amp; Value Drivers
              </h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Value Anchors
            </span>
          </div>

          <ul className="space-y-3">
            {insights.satisfactionDrivers.map((driver, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/30 border border-emerald-100/60 text-xs text-slate-800"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-relaxed">{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Critical Strategic Highlights */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 font-serif-title">
              Critical Strategic Findings &amp; Observations
            </h3>
          </div>
          <span className="text-xs text-slate-400">Consulting Diagnostic</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.criticalHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs mb-2">
                <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/50">
                  FINDING #{idx + 1}
                </span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-normal">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Segment Disparity Deep Dive */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 font-serif-title">
              Segment Disparity Analysis &amp; Strategic Implications
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Tailored market positioning
          </span>
        </div>

        <div className="space-y-3.5">
          {insights.segmentDisparities.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="md:w-1/4">
                <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 font-bold text-xs">
                  {item.segment}
                </span>
              </div>
              <div className="md:w-2/5 text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block mb-0.5">
                  Observed Pattern:
                </span>
                {item.finding}
              </div>
              <div className="md:w-2/5 text-xs text-blue-900 bg-blue-50/70 p-2.5 rounded border border-blue-100">
                <span className="font-semibold text-blue-950 block mb-0.5 flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  Strategic Implication:
                </span>
                {item.implication}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
