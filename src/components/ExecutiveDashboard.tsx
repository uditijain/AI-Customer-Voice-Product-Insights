import React from 'react';
import {
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Users,
  Star,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { AnalyzedReview, CustomerTypeComparison, TopPainPoint, CommonTheme } from '../types';

interface ExecutiveDashboardProps {
  reviews: AnalyzedReview[];
  stats: {
    totalReviews: number;
    avgRating: number;
    sentimentCounts: { positive: number; neutral: number; negative: number };
    sentimentPercentages: { positive: number; neutral: number; negative: number };
    netSentimentScore: number;
    ratingDistribution: Record<number, number>;
    topPainPoints: TopPainPoint[];
    commonThemes: CommonTheme[];
    customerTypeComparison: CustomerTypeComparison[];
  };
  onFilterByTheme?: (theme: string) => void;
  onFilterByCustomerType?: (type: string) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  reviews,
  stats,
  onFilterByTheme,
  onFilterByCustomerType,
}) => {
  const {
    totalReviews,
    avgRating,
    sentimentCounts,
    sentimentPercentages,
    netSentimentScore,
    ratingDistribution,
    topPainPoints,
    commonThemes,
    customerTypeComparison,
  } = stats;

  const criticalIssuesCount = reviews.filter(
    (r) => r.priority === 'Critical' || r.priority === 'High'
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reviews */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Feedback Volume
            </span>
            <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {totalReviews}
            </span>
            <span className="text-xs text-slate-500">verified reviews</span>
          </div>
          <div className="mt-2.5 text-xs text-slate-600 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>100% processed via Gemini AI</span>
          </div>
        </div>

        {/* Net Sentiment Score */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Net Sentiment Index
            </span>
            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                netSentimentScore >= 0
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold tracking-tight ${
                netSentimentScore > 0
                  ? 'text-emerald-700'
                  : netSentimentScore < 0
                  ? 'text-rose-700'
                  : 'text-slate-800'
              }`}
            >
              {netSentimentScore > 0 ? `+${netSentimentScore}` : netSentimentScore}
            </span>
            <span className="text-xs text-slate-500">(-100 to +100)</span>
          </div>
          {/* Sentiment Stacked Bar */}
          <div className="mt-3">
            <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
              <div
                style={{ width: `${sentimentPercentages.positive}%` }}
                className="bg-emerald-500 h-full"
                title={`Positive: ${sentimentPercentages.positive}%`}
              />
              <div
                style={{ width: `${sentimentPercentages.neutral}%` }}
                className="bg-slate-400 h-full"
                title={`Neutral: ${sentimentPercentages.neutral}%`}
              />
              <div
                style={{ width: `${sentimentPercentages.negative}%` }}
                className="bg-rose-500 h-full"
                title={`Negative: ${sentimentPercentages.negative}%`}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-500 font-medium">
              <span className="text-emerald-700">{sentimentCounts.positive} Pos ({sentimentPercentages.positive}%)</span>
              <span className="text-slate-600">{sentimentCounts.neutral} Neu</span>
              <span className="text-rose-700">{sentimentCounts.negative} Neg ({sentimentPercentages.negative}%)</span>
            </div>
          </div>
        </div>

        {/* Average CSAT Rating */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Mean Customer Rating
            </span>
            <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">out of 5.0</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(avgRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
            <span className="ml-1.5 text-xs text-slate-500 font-medium">
              {avgRating >= 4 ? 'Solid CSAT' : avgRating >= 3 ? 'Fair CSAT' : 'At-Risk CSAT'}
            </span>
          </div>
        </div>

        {/* Priority Triage Flag */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Urgent Attention Needs
            </span>
            <div className="w-8 h-8 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-rose-700">
              {criticalIssuesCount}
            </span>
            <span className="text-xs text-slate-500">
              critical or high priority
            </span>
          </div>
          <div className="mt-2.5 text-xs text-slate-600">
            {criticalIssuesCount > 0 ? (
              <span className="text-rose-700 font-medium">
                Immediate retention and SLA risks flagged
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">
                Zero critical escalations detected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mid-Row: Common Themes & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Common Themes (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                  Common Customer Themes &amp; Sentiment Balance
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-normal">
                Frequency &amp; Sentiment Ratio
              </span>
            </div>

            <div className="mt-4 space-y-3.5">
              {commonThemes.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onFilterByTheme && onFilterByTheme(item.theme)}
                  className="group p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50/70 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {item.theme}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                        {item.count} mentions ({item.percentage}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-emerald-700 font-medium">{item.positivePct}% Pos</span>
                      <span className="text-slate-400">/</span>
                      <span className="text-rose-700 font-medium">{item.negativePct}% Neg</span>
                    </div>
                  </div>

                  {/* Horizontal visual balance bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 flex overflow-hidden">
                    <div
                      style={{ width: `${item.positivePct}%` }}
                      className="bg-emerald-500 h-full"
                    />
                    <div
                      style={{ width: `${item.neutralPct}%` }}
                      className="bg-slate-300 h-full"
                    />
                    <div
                      style={{ width: `${item.negativePct}%` }}
                      className="bg-rose-500 h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Tip: Click any theme to filter the granular review table below</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </p>
        </div>

        {/* Rating Distribution (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 font-serif-title">
                  Rating Distribution
                </h3>
              </div>
              <span className="text-xs text-slate-400">1 to 5 Stars</span>
            </div>

            <div className="mt-4 space-y-2.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingDistribution[star] || 0;
                const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 w-12 text-slate-700 font-medium">
                      <span>{star}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className={`h-full transition-all ${
                          star >= 4
                            ? 'bg-emerald-500'
                            : star === 3
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                      />
                    </div>
                    <span className="w-14 text-right font-mono text-slate-500 text-[11px]">
                      {count} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/60 p-3 rounded-lg text-xs text-slate-600">
            <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
              <span>NPS Proxy Indicator</span>
              <span
                className={
                  (ratingDistribution[5] || 0) + (ratingDistribution[4] || 0) >=
                  (ratingDistribution[1] || 0) + (ratingDistribution[2] || 0)
                    ? 'text-emerald-700'
                    : 'text-rose-700'
                }
              >
                {Math.round(
                  (((ratingDistribution[5] || 0) -
                    ((ratingDistribution[1] || 0) + (ratingDistribution[2] || 0))) /
                    Math.max(1, totalReviews)) *
                    100
                )}{' '}
                Score
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Promoters (5★): {ratingDistribution[5] || 0} | Passives (4★):{' '}
              {ratingDistribution[4] || 0} | Detractors (1-2★):{' '}
              {(ratingDistribution[1] || 0) + (ratingDistribution[2] || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Row: Top Pain Points */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 font-serif-title">
              Top Customer Pain Points &amp; Friction Analysis
            </h3>
          </div>
          <span className="text-xs text-slate-400">Ranked by severity &amp; volume</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {topPainPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : item.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}
                  >
                    {item.severity} Severity
                  </span>
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    {item.count} mentions
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                  {item.painPoint}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Segments:</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {item.customerTypes.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200 text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row: Customer Type Differences Matrix */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 font-serif-title">
              Customer Segment Differences &amp; Disparities
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Comparative analysis by Customer Type
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Customer Type</th>
                <th className="py-2.5 px-3">Share / Volume</th>
                <th className="py-2.5 px-3">Avg Rating</th>
                <th className="py-2.5 px-3">Sentiment Breakdown</th>
                <th className="py-2.5 px-3">Primary Pain Point</th>
                <th className="py-2.5 px-3">Dominant Theme</th>
                <th className="py-2.5 px-3">Strategic Diagnosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customerTypeComparison.map((seg, idx) => (
                <tr
                  key={idx}
                  onClick={() =>
                    onFilterByCustomerType && onFilterByCustomerType(seg.customerType)
                  }
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {seg.customerType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-medium text-slate-900">
                      {seg.count}
                    </span>{' '}
                    <span className="text-slate-400">({seg.percentage}%)</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <span>{seg.avgRating.toFixed(1)}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 w-28">
                      <div className="w-full h-2 rounded-full bg-slate-100 flex overflow-hidden">
                        <div
                          style={{ width: `${seg.sentiment.positive}%` }}
                          className="bg-emerald-500 h-full"
                          title={`Positive: ${seg.sentiment.positive}%`}
                        />
                        <div
                          style={{ width: `${seg.sentiment.neutral}%` }}
                          className="bg-slate-300 h-full"
                          title={`Neutral: ${seg.sentiment.neutral}%`}
                        />
                        <div
                          style={{ width: `${seg.sentiment.negative}%` }}
                          className="bg-rose-500 h-full"
                          title={`Negative: ${seg.sentiment.negative}%`}
                        />
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {seg.sentiment.positive}% Pos / {seg.sentiment.negative}% Neg
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800 max-w-xs truncate" title={seg.primaryPainPoint}>
                    {seg.primaryPainPoint}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="text-blue-700 font-medium">{seg.topTheme}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-xs leading-relaxed max-w-sm">
                    {seg.keyObservation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
