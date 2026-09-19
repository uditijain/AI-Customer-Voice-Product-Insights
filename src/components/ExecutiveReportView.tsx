import React from 'react';
import { Sparkles, Printer, ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { FullAnalysisResult, CustomerTypeComparison, TopPainPoint, CommonTheme } from '../types';

interface ExecutiveReportViewProps {
  analysis: FullAnalysisResult;
  stats: {
    totalReviews: number;
    avgRating: number;
    sentimentCounts: { positive: number; neutral: number; negative: number };
    netSentimentScore: number;
    topPainPoints: TopPainPoint[];
    commonThemes: CommonTheme[];
    customerTypeComparison: CustomerTypeComparison[];
  };
  onBack: () => void;
}

export const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({
  analysis,
  stats,
  onBack,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 bg-white print:p-0 print:m-0">
      {/* Top action bar (hidden during print) */}
      <div className="flex items-center justify-between print:hidden pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interactive Dashboard
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-xs"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* Briefing Header */}
      <div className="border-b-2 border-slate-900 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
            <span>Executive Strategy Memorandum</span>
            <span>•</span>
            <span>Customer Voice &amp; Product Intelligence</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Generated: {new Date(analysis.analyzedAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-2xl font-bold font-serif-title text-slate-900 mt-2">
          Voice of Customer Intelligence &amp; Strategic Roadmap
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Analyzed dataset: {stats.totalReviews} verified customer reviews across {stats.customerTypeComparison.length} segments.
        </p>
      </div>

      {/* Executive Summary */}
      <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
          I. Executive Synthesis
        </h2>
        <p className="text-sm text-slate-800 leading-relaxed font-serif">
          {analysis.executiveInsights.executiveSummary}
        </p>

        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
          <div>
            <span className="text-[11px] text-slate-500 block uppercase">Net Sentiment</span>
            <span className="text-xl font-bold text-slate-900 font-mono">
              {stats.netSentimentScore > 0 ? `+${stats.netSentimentScore}` : stats.netSentimentScore}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block uppercase">Mean Rating</span>
            <span className="text-xl font-bold text-slate-900 font-mono">
              {stats.avgRating.toFixed(1)} / 5.0
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block uppercase">Positive Share</span>
            <span className="text-xl font-bold text-emerald-700 font-mono">
              {Math.round((stats.sentimentCounts.positive / Math.max(1, stats.totalReviews)) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Critical Strategic Findings */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
          II. Strategic Highlights &amp; Disparities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-rose-200 p-4 rounded-lg bg-rose-50/20">
            <h3 className="text-xs font-bold text-rose-900 uppercase mb-2">
              Key Churn Vulnerabilities
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysis.executiveInsights.churnRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-emerald-200 p-4 rounded-lg bg-emerald-50/20">
            <h3 className="text-xs font-bold text-emerald-900 uppercase mb-2">
              Core Satisfaction Drivers
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysis.executiveInsights.satisfactionDrivers.map((driver, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Segment Differences Table */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
          III. Customer Segment Breakdown
        </h2>
        <table className="w-full text-xs text-left border border-slate-200">
          <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-2.5">Segment</th>
              <th className="p-2.5">Volume</th>
              <th className="p-2.5">Mean Rating</th>
              <th className="p-2.5">Top Pain Point</th>
              <th className="p-2.5">Strategic Diagnosis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {stats.customerTypeComparison.map((seg, i) => (
              <tr key={i}>
                <td className="p-2.5 font-bold text-slate-900">{seg.customerType}</td>
                <td className="p-2.5">{seg.count} ({seg.percentage}%)</td>
                <td className="p-2.5 font-semibold">{seg.avgRating.toFixed(1)}/5</td>
                <td className="p-2.5 text-rose-800">{seg.primaryPainPoint}</td>
                <td className="p-2.5 text-slate-600">{seg.keyObservation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prioritized Recommendations */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
          IV. Prioritized Action Roadmap
        </h2>
        <div className="space-y-3">
          {analysis.recommendedActions.map((action, i) => (
            <div key={i} className="border border-slate-200 p-3.5 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm font-serif">
                  {i + 1}. {action.title}
                </span>
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-800 text-[10px]">
                  {action.priority} | {action.category}
                </span>
              </div>
              {action.observedCustomerEvidence && (
                <p className="text-slate-600 italic">"{action.observedCustomerEvidence}"</p>
              )}
              <p className="text-slate-700"><span className="font-semibold text-slate-900">Execution Plan:</span> {action.implementationPlan}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Target: <strong>{action.targetSegment}</strong></span>
                <span>Expected Impact: <strong className="text-emerald-800">{action.expectedBusinessImpact}</strong></span>
                <span>Owner: <strong>{action.ownerFunction}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology & AI Opportunities */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
          V. Strategic Technology &amp; AI Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.techOpportunities.map((tech, i) => (
            <div key={i} className="border border-slate-200 p-3.5 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 font-serif">
                  {tech.title}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono">
                  {tech.category}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{tech.proposedSolution}</p>
              <div className="pt-1 text-[11px] text-slate-500 flex justify-between">
                <span>Feasibility: <strong>{tech.implementationFeasibility}</strong></span>
                <span className="text-blue-900 font-semibold">{tech.expectedEfficiencyOrRoi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
