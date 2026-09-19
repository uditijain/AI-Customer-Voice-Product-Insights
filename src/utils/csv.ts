import Papa from 'papaparse';
import { RawReview, AnalyzedReview } from '../types';

export interface ParseResult {
  data: RawReview[];
  errors: string[];
  totalRowsFound: number;
}

export function parseCSVString(csvContent: string): ParseResult {
  const errors: string[] = [];
  const parsed = Papa.parse<Record<string, any>>(csvContent.trim(), {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim().toLowerCase(),
  });

  if (parsed.errors.length > 0) {
    parsed.errors.forEach((err) => {
      errors.push(`Row ${err.row}: ${err.message}`);
    });
  }

  const rawRows = parsed.data;
  if (!rawRows || rawRows.length === 0) {
    return { data: [], errors: ['No data rows found in CSV.'], totalRowsFound: 0 };
  }

  // Detect header keys
  const firstRow = rawRows[0];
  const keys = Object.keys(firstRow);

  const customerIdKey = keys.find((k) =>
    ['customer id', 'customerid', 'cust_id', 'id', 'user id', 'client id'].includes(k)
  ) || keys.find((k) => k.includes('customer') || k.includes('id'));

  const reviewKey = keys.find((k) =>
    ['review', 'feedback', 'text', 'comment', 'review text', 'customer review'].includes(k)
  ) || keys.find((k) => k.includes('review') || k.includes('feedback') || k.includes('comment'));

  const ratingKey = keys.find((k) =>
    ['rating', 'score', 'stars', 'satisfaction', 'nps'].includes(k)
  ) || keys.find((k) => k.includes('rating') || k.includes('score'));

  const customerTypeKey = keys.find((k) =>
    ['customer type', 'customertype', 'type', 'segment', 'tier', 'plan', 'account type'].includes(k)
  ) || keys.find((k) => k.includes('type') || k.includes('segment') || k.includes('tier'));

  if (!reviewKey) {
    return {
      data: [],
      errors: [
        `Could not find a 'Review' column. Found columns: ${keys.join(', ')}. Please include a column named 'Review'.`,
      ],
      totalRowsFound: rawRows.length,
    };
  }

  const validReviews: RawReview[] = [];

  rawRows.forEach((row, index) => {
    const rawReviewText = String(row[reviewKey] || '').trim();
    if (!rawReviewText) return; // skip blank reviews

    const rawCustId = customerIdKey ? String(row[customerIdKey] || '').trim() : '';
    const rawType = customerTypeKey ? String(row[customerTypeKey] || '').trim() : 'Standard';
    const parsedRating = ratingKey ? parseFloat(String(row[ratingKey])) : 3;
    const rating = isNaN(parsedRating) ? 3 : Math.min(5, Math.max(1, Math.round(parsedRating)));

    validReviews.push({
      customerId: rawCustId || `CUST-${1000 + index + 1}`,
      customerType: rawType || 'General',
      rating,
      review: rawReviewText,
    });
  });

  return {
    data: validReviews,
    errors,
    totalRowsFound: rawRows.length,
  };
}

export function exportAnalyzedReviewsToCSV(reviews: AnalyzedReview[], filename = 'AI_Customer_Voice_Analysis.csv') {
  const exportData = reviews.map((r) => ({
    'Customer ID': r.customerId,
    'Customer Type': r.customerType,
    'Rating': r.rating,
    'Review': r.review,
    'Sentiment': r.sentiment,
    'Customer Theme': r.customerTheme,
    'Pain Point': r.painPoint,
    'Feature Request': r.featureRequest,
    'Priority': r.priority,
    'Recommended Action': r.recommendedAction,
  }));

  const csv = Papa.unparse(exportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
