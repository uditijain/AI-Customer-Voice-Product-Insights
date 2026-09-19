import { AnalyzedReview, DashboardStats, CustomerTypeComparison, TopPainPoint, CommonTheme } from '../types';

export function computeDashboardStats(reviews: AnalyzedReview[]) {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      avgRating: 0,
      sentimentCounts: { positive: 0, neutral: 0, negative: 0 },
      sentimentPercentages: { positive: 0, neutral: 0, negative: 0 },
      netSentimentScore: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      topPainPoints: [],
      commonThemes: [],
      customerTypeComparison: [],
    };
  }

  // Sentiment & Ratings
  let totalRatingSum = 0;
  let positive = 0;
  let neutral = 0;
  let negative = 0;
  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((r) => {
    totalRatingSum += r.rating;
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    ratingDistribution[star] = (ratingDistribution[star] || 0) + 1;

    if (r.sentiment === 'Positive') positive++;
    else if (r.sentiment === 'Negative') negative++;
    else neutral++;
  });

  const avgRating = Number((totalRatingSum / totalReviews).toFixed(1));
  const posPct = Math.round((positive / totalReviews) * 100);
  const neuPct = Math.round((neutral / totalReviews) * 100);
  const negPct = Math.round((negative / totalReviews) * 100);
  const netSentimentScore = Math.round(((positive - negative) / totalReviews) * 100);

  // Common Themes
  const themeMap: Record<string, { count: number; pos: number; neu: number; neg: number }> = {};
  reviews.forEach((r) => {
    const theme = r.customerTheme || 'General';
    if (!themeMap[theme]) {
      themeMap[theme] = { count: 0, pos: 0, neu: 0, neg: 0 };
    }
    themeMap[theme].count++;
    if (r.sentiment === 'Positive') themeMap[theme].pos++;
    else if (r.sentiment === 'Negative') themeMap[theme].neg++;
    else themeMap[theme].neu++;
  });

  const commonThemes: CommonTheme[] = Object.entries(themeMap)
    .map(([theme, data]) => ({
      theme,
      count: data.count,
      percentage: Math.round((data.count / totalReviews) * 100),
      positivePct: Math.round((data.pos / data.count) * 100),
      neutralPct: Math.round((data.neu / data.count) * 100),
      negativePct: Math.round((data.neg / data.count) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Top Pain Points (exclude 'None' and 'N/A')
  const painMap: Record<
    string,
    { count: number; types: Set<string>; priorities: Record<string, number> }
  > = {};

  reviews.forEach((r) => {
    const pain = r.painPoint?.trim();
    if (!pain || pain.toLowerCase() === 'none' || pain.toLowerCase() === 'n/a' || pain.toLowerCase() === 'no pain point') {
      return;
    }
    if (!painMap[pain]) {
      painMap[pain] = { count: 0, types: new Set(), priorities: {} };
    }
    painMap[pain].count++;
    painMap[pain].types.add(r.customerType);
    painMap[pain].priorities[r.priority] = (painMap[pain].priorities[r.priority] || 0) + 1;
  });

  const topPainPoints: TopPainPoint[] = Object.entries(painMap)
    .map(([painPoint, data]) => {
      let severity: 'Critical' | 'High' | 'Medium' = 'Medium';
      if ((data.priorities['Critical'] || 0) > 0) severity = 'Critical';
      else if ((data.priorities['High'] || 0) > 0) severity = 'High';

      return {
        painPoint,
        count: data.count,
        customerTypes: Array.from(data.types),
        severity,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Customer Type Comparisons
  const segmentMap: Record<
    string,
    {
      reviews: AnalyzedReview[];
      totalScore: number;
      pos: number;
      neu: number;
      neg: number;
      pains: Record<string, number>;
      themes: Record<string, number>;
    }
  > = {};

  reviews.forEach((r) => {
    const type = r.customerType || 'Other';
    if (!segmentMap[type]) {
      segmentMap[type] = {
        reviews: [],
        totalScore: 0,
        pos: 0,
        neu: 0,
        neg: 0,
        pains: {},
        themes: {},
      };
    }
    segmentMap[type].reviews.push(r);
    segmentMap[type].totalScore += r.rating;
    if (r.sentiment === 'Positive') segmentMap[type].pos++;
    else if (r.sentiment === 'Negative') segmentMap[type].neg++;
    else segmentMap[type].neu++;

    if (r.painPoint && r.painPoint.toLowerCase() !== 'none') {
      segmentMap[type].pains[r.painPoint] = (segmentMap[type].pains[r.painPoint] || 0) + 1;
    }
    if (r.customerTheme) {
      segmentMap[type].themes[r.customerTheme] = (segmentMap[type].themes[r.customerTheme] || 0) + 1;
    }
  });

  const customerTypeComparison: CustomerTypeComparison[] = Object.entries(segmentMap).map(
    ([customerType, data]) => {
      const segCount = data.reviews.length;
      const segAvgRating = Number((data.totalScore / segCount).toFixed(1));

      // find top pain point
      const sortedPains = Object.entries(data.pains).sort((a, b) => b[1] - a[1]);
      const primaryPainPoint = sortedPains.length > 0 ? sortedPains[0][0] : 'None recorded';

      // find top theme
      const sortedThemes = Object.entries(data.themes).sort((a, b) => b[1] - a[1]);
      const topTheme = sortedThemes.length > 0 ? sortedThemes[0][0] : 'General';

      let keyObservation = '';
      if (segAvgRating >= 4.0) {
        keyObservation = 'High satisfaction segment; retention risk is low; primary opportunity in team expansion.';
      } else if (segAvgRating <= 2.5) {
        keyObservation = 'Elevated churn vulnerability; contract risk centered on technical or contractual constraints.';
      } else {
        keyObservation = 'Moderate satisfaction; key friction revolves around onboarding and pricing tiers.';
      }

      return {
        customerType,
        count: segCount,
        percentage: Math.round((segCount / totalReviews) * 100),
        avgRating: segAvgRating,
        sentiment: {
          positive: Math.round((data.pos / segCount) * 100),
          neutral: Math.round((data.neu / segCount) * 100),
          negative: Math.round((data.neg / segCount) * 100),
        },
        primaryPainPoint,
        topTheme,
        keyObservation,
      };
    }
  ).sort((a, b) => b.count - a.count);

  return {
    totalReviews,
    avgRating,
    sentimentCounts: { positive, neutral, negative },
    sentimentPercentages: { positive: posPct, neutral: neuPct, negative: negPct },
    netSentimentScore,
    ratingDistribution,
    topPainPoints,
    commonThemes,
    customerTypeComparison,
  };
}
