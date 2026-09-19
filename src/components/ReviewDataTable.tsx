import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { AnalyzedReview } from '../types';

interface ReviewDataTableProps {
  reviews: AnalyzedReview[];
  onSelectReview: (review: AnalyzedReview) => void;
  onExportCSV: () => void;
  initialThemeFilter?: string;
  initialCustomerTypeFilter?: string;
}

export const ReviewDataTable: React.FC<ReviewDataTableProps> = ({
  reviews,
  onSelectReview,
  onExportCSV,
  initialThemeFilter = 'All',
  initialCustomerTypeFilter = 'All',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState(initialCustomerTypeFilter);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'rating-asc' | 'rating-desc' | 'priority-desc' | 'id-asc'>('priority-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Derive unique customer types
  const customerTypes = useMemo(() => {
    const set = new Set<string>();
    reviews.forEach((r) => set.add(r.customerType));
    return ['All', ...Array.from(set)];
  }, [reviews]);

  // Filter & sort reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (sentimentFilter !== 'All' && r.sentiment !== sentimentFilter) return false;
      if (typeFilter !== 'All' && r.customerType !== typeFilter) return false;
      if (priorityFilter !== 'All' && r.priority !== priorityFilter) return false;

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesReview = r.review.toLowerCase().includes(query);
        const matchesId = r.customerId.toLowerCase().includes(query);
        const matchesTheme = r.customerTheme.toLowerCase().includes(query);
        const matchesPain = r.painPoint.toLowerCase().includes(query);
        const matchesAction = r.recommendedAction.toLowerCase().includes(query);
        if (!matchesReview && !matchesId && !matchesTheme && !matchesPain && !matchesAction) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      if (sortBy === 'priority-desc') {
        const weight: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      }
      if (sortBy === 'id-asc') return a.customerId.localeCompare(b.customerId);
      return 0;
    });
  }, [reviews, searchTerm, sentimentFilter, typeFilter, priorityFilter, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Negative':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header & Search Controls */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-serif-title">
              Granular Customer Feedback &amp; AI Analysis Grid
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredReviews.length} of {reviews.length} analyzed reviews with Gemini classification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by text, ID, pain point, theme..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Sentiment Filter */}
          <div>
            <select
              value={sentimentFilter}
              onChange={(e) => {
                setSentimentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden text-slate-700"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>

          {/* Customer Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden text-slate-700"
            >
              <option value="All">All Customer Types</option>
              {customerTypes
                .filter((t) => t !== 'All')
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden text-slate-700 font-medium"
            >
              <option value="priority-desc">Sort: Highest Priority</option>
              <option value="rating-desc">Sort: Highest Rating</option>
              <option value="rating-asc">Sort: Lowest Rating</option>
              <option value="id-asc">Sort: Customer ID</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3.5">Customer</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3">Sentiment</th>
              <th className="py-3 px-3.5">Theme</th>
              <th className="py-3 px-3.5">Voice / Review</th>
              <th className="py-3 px-3.5">Pain Point</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3.5">Recommended Action</th>
              <th className="py-3 px-2 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedReviews.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  No customer reviews matching current filter criteria.
                </td>
              </tr>
            ) : (
              paginatedReviews.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectReview(r)}
                >
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="font-mono font-semibold text-slate-900 block">
                      {r.customerId}
                    </span>
                    <span className="text-[10px] text-slate-500 px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200/60 inline-block mt-0.5">
                      {r.customerType}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <span>{r.rating}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${getSentimentBadge(
                        r.sentiment
                      )}`}
                    >
                      {r.sentiment}
                    </span>
                  </td>

                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {r.customerTheme}
                    </span>
                  </td>

                  <td className="py-3 px-3.5 max-w-xs">
                    <p className="line-clamp-2 text-slate-700 leading-relaxed italic text-xs">
                      "{r.review}"
                    </p>
                  </td>

                  <td className="py-3 px-3.5 max-w-xs">
                    {r.painPoint && r.painPoint.toLowerCase() !== 'none' ? (
                      <span className="text-rose-700 font-medium line-clamp-1">
                        {r.painPoint}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">None noted</span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getPriorityBadge(
                        r.priority
                      )}`}
                    >
                      {r.priority}
                    </span>
                  </td>

                  <td className="py-3 px-3.5 max-w-xs">
                    <p className="line-clamp-2 text-slate-800 font-medium text-xs leading-relaxed">
                      {r.recommendedAction}
                    </p>
                  </td>

                  <td className="py-3 px-2 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="p-1 rounded text-slate-400 group-hover:text-blue-600 transition-colors"
                      title="Inspect full details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing page <span className="font-semibold text-slate-800">{currentPage}</span> of{' '}
          <span className="font-semibold text-slate-800">{totalPages}</span> ({filteredReviews.length} records)
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono font-medium text-slate-700">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
