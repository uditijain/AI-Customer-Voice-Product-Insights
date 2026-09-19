import React from 'react';
import {
  X,
  Star,
  Sparkles,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { AnalyzedReview } from '../types';

interface ReviewDetailModalProps {
  review: AnalyzedReview | null;
  onClose: () => void;
}

export const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({
  review,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!review) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Customer ID: ${review.customerId} (${review.customerType})\nRating: ${review.rating}/5\nReview: "${review.review}"\nSentiment: ${review.sentiment}\nTheme: ${review.customerTheme}\nPain Point: ${review.painPoint}\nFeature Request: ${review.featureRequest}\nPriority: ${review.priority}\nRecommended Action: ${review.recommendedAction}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-slate-900 text-sm">
              {review.customerId}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-xs font-semibold">
              {review.customerType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 transition-colors text-xs flex items-center gap-1"
              title="Copy analysis details"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Rating & Sentiment Header */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Customer Rating:</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-900 text-sm">
                  {review.rating}/5
                </span>
                <div className="flex items-center text-amber-400 ml-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= review.rating ? 'fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                  review.sentiment === 'Positive'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : review.sentiment === 'Negative'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {review.sentiment} Sentiment
              </span>

              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                  review.priority === 'Critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : review.priority === 'High'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}
              >
                {review.priority}
              </span>
            </div>
          </div>

          {/* Original Review Text */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Verbatim Feedback Text
            </label>
            <div className="p-3.5 rounded-lg bg-slate-50/80 border border-slate-200 text-xs text-slate-800 leading-relaxed italic font-serif">
              "{review.review}"
            </div>
          </div>

          {/* AI Intelligence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-slate-200/70 bg-white">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Customer Theme
              </span>
              <p className="text-xs font-bold text-slate-900">
                {review.customerTheme}
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200/70 bg-white">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Identified Pain Point
              </span>
              <p className="text-xs font-medium text-rose-700">
                {review.painPoint}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200/70 bg-white">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Feature Request / Product Need
            </span>
            <p className="text-xs text-slate-800 font-medium">
              {review.featureRequest}
            </p>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-lg bg-blue-50/80 border border-blue-200 text-xs text-blue-950">
            <span className="font-bold text-blue-900 block mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Recommended Business / Product Action
            </span>
            <p className="leading-relaxed text-blue-900">
              {review.recommendedAction}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
