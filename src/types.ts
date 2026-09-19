export interface RawReview {
  customerId: string;
  review: string;
  rating: number;
  customerType: string;
}

export interface AnalyzedReview {
  id: string;
  customerId: string;
  review: string;
  rating: number;
  customerType: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  customerTheme: string;
  painPoint: string;
  featureRequest: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  recommendedAction: string;
}

export interface DashboardStats {
  totalReviews: number;
  avgRating: number;
  sentimentCounts: { positive: number; neutral: number; negative: number };
  sentimentPercentages: { positive: number; neutral: number; negative: number };
  netSentimentScore: number;
  ratingDistribution: Record<number, number>;
  topPainPoints: TopPainPoint[];
  commonThemes: CommonTheme[];
  customerTypeComparison: CustomerTypeComparison[];
}

export interface TopPainPoint {
  painPoint: string;
  count: number;
  customerTypes: string[];
  severity: 'Critical' | 'High' | 'Medium';
}

export interface CommonTheme {
  theme: string;
  count: number;
  percentage: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
}

export interface CustomerTypeComparison {
  customerType: string;
  count: number;
  percentage: number;
  avgRating: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  primaryPainPoint: string;
  topTheme: string;
  keyObservation: string;
}

export interface ExecutiveInsights {
  executiveSummary: string;
  netSentimentScore: number;
  criticalHighlights: string[];
  churnRisks: string[];
  satisfactionDrivers: string[];
  segmentDisparities: {
    segment: string;
    finding: string;
    implication: string;
  }[];
}

export interface RecommendedActionItem {
  id: string;
  title: string;
  category: 'Quick Win' | 'Product Roadmap' | 'Customer Success & Support' | 'Strategic Policy';
  priority: 'Immediate (P0)' | 'Near-term (P1)' | 'Medium-term (P2)';
  targetSegment: string;
  observedCustomerEvidence?: string;
  rationale?: string;
  implementationPlan: string;
  expectedBusinessImpact: string;
  ownerFunction: string;
}

export interface TechAIOpportunityItem {
  id: string;
  title: string;
  category: 'GenAI & LLM' | 'Intelligent Automation' | 'Predictive Analytics' | 'Workflow Modernization';
  customerProblemAddressed: string;
  proposedSolution: string;
  expectedEfficiencyOrRoi: string;
  implementationFeasibility: 'High (1-4 weeks)' | 'Moderate (1-2 months)' | 'Strategic (3+ months)';
  recommendedApproach: string;
}

export interface FullAnalysisResult {
  analyzedReviews: AnalyzedReview[];
  executiveInsights: ExecutiveInsights;
  recommendedActions: RecommendedActionItem[];
  techOpportunities: TechAIOpportunityItem[];
  analyzedAt: string;
}
