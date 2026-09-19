import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  Zap,
  Cpu,
  TableProperties,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { RawReview, AnalyzedReview, FullAnalysisResult } from './types';
import { SAMPLE_REVIEWS } from './data/sampleReviews';
import { computeDashboardStats } from './utils/analytics';
import { exportAnalyzedReviewsToCSV } from './utils/csv';
import { Header } from './components/Header';
import { UploadModal } from './components/UploadModal';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { BusinessInsightsSection } from './components/BusinessInsightsSection';
import { RecommendedActionsSection } from './components/RecommendedActionsSection';
import { TechnologyOpportunitiesSection } from './components/TechnologyOpportunitiesSection';
import { ReviewDataTable } from './components/ReviewDataTable';
import { ReviewDetailModal } from './components/ReviewDetailModal';
import { ExecutiveReportView } from './components/ExecutiveReportView';

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<{
    stage: string;
    percent: number;
  } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FullAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'insights' | 'actions' | 'technology' | 'data-grid'
  >('dashboard');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedReviewForDetail, setSelectedReviewForDetail] =
    useState<AnalyzedReview | null>(null);
  const [isReportView, setIsReportView] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterTheme, setFilterTheme] = useState<string | undefined>(undefined);
  const [filterCustomerType, setFilterCustomerType] = useState<string | undefined>(undefined);

  // Compute live dashboard metrics
  const dashboardStats = useMemo(() => {
    return computeDashboardStats(analysisResult?.analyzedReviews || []);
  }, [analysisResult]);

  // Execute full Gemini analysis pipeline
  const runAnalysis = async (reviews: RawReview[]) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisProgress({ stage: 'Sending feedback batches to Gemini 3.8 Flash...', percent: 25 });

    try {
      // Step 1: Analyze each review
      const analyzeResponse = await fetch('/api/analyze-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews }),
      });

      if (!analyzeResponse.ok) {
        throw new Error(`Review analysis failed: ${analyzeResponse.statusText}`);
      }

      const analyzeData = await analyzeResponse.json();
      const analyzedReviews: AnalyzedReview[] = analyzeData.reviews || [];

      setAnalysisProgress({
        stage: 'Synthesizing executive business insights & tech roadmap...',
        percent: 65,
      });

      // Step 2: Generate Business Insights, Actions, and Tech Opportunities
      const insightsResponse = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analyzedReviews }),
      });

      if (!insightsResponse.ok) {
        throw new Error(`Strategic insight synthesis failed: ${insightsResponse.statusText}`);
      }

      const insightsData = await insightsResponse.json();

      setAnalysisProgress({ stage: 'Finalizing intelligence models...', percent: 95 });

      setAnalysisResult({
        analyzedReviews,
        executiveInsights: insightsData.executiveInsights,
        recommendedActions: insightsData.recommendedActions,
        techOpportunities: insightsData.techOpportunities,
        analyzedAt: new Date().toISOString(),
      });

      setAnalysisProgress(null);
      setIsAnalyzing(false);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(
        err.message || 'An error occurred during Gemini analysis. Please try again.'
      );
      setIsAnalyzing(false);
      setAnalysisProgress(null);
    }
  };

  // Initial load: analyze sample reviews on mount so user sees immediate live data
  useEffect(() => {
    runAnalysis(SAMPLE_REVIEWS);
  }, []);

  const handleLoadSample = () => {
    runAnalysis(SAMPLE_REVIEWS);
  };

  const handleConfirmUpload = (reviews: RawReview[], filename: string) => {
    runAnalysis(reviews);
  };

  const handleExportCSV = () => {
    if (analysisResult && analysisResult.analyzedReviews.length > 0) {
      exportAnalyzedReviewsToCSV(analysisResult.analyzedReviews);
    }
  };

  const handleFilterByTheme = (theme: string) => {
    setFilterTheme(theme);
    setActiveTab('data-grid');
  };

  const handleFilterByCustomerType = (type: string) => {
    setFilterCustomerType(type);
    setActiveTab('data-grid');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        onOpenUpload={() => setIsUploadModalOpen(true)}
        onLoadSample={handleLoadSample}
        onExportCSV={handleExportCSV}
        onPrintReport={() => setIsReportView(true)}
        isAnalyzing={isAnalyzing}
        totalReviews={analysisResult?.analyzedReviews.length || 0}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Analysis Execution Notice</span>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => handleLoadSample()}
              className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded font-medium text-xs transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Progress Bar */}
        {isAnalyzing && (
          <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span>{analysisProgress?.stage || 'Processing customer voice analysis...'}</span>
              </div>
              <span className="font-mono text-blue-700 font-bold">
                {analysisProgress?.percent || 30}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                style={{ width: `${analysisProgress?.percent || 30}%` }}
                className="h-full bg-blue-600 transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Evaluating sentiment, customer theme, pain points, feature requests &amp; strategic actions</span>
              <span className="font-mono text-slate-400">Gemini 3.8 Flash</span>
            </p>
          </div>
        )}

        {/* If in Report Mode */}
        {isReportView && analysisResult ? (
          <ExecutiveReportView
            analysis={analysisResult}
            stats={dashboardStats}
            onBack={() => setIsReportView(false)}
          />
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200/90 pb-2 overflow-x-auto gap-4">
              <nav className="flex items-center gap-1 sm:gap-2">
                <button
                  id="tab-dashboard"
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Executive Dashboard</span>
                </button>

                <button
                  id="tab-insights"
                  type="button"
                  onClick={() => setActiveTab('insights')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'insights'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Business Insights</span>
                </button>

                <button
                  id="tab-actions"
                  type="button"
                  onClick={() => setActiveTab('actions')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'actions'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Recommended Actions</span>
                  {analysisResult?.recommendedActions && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      activeTab === 'actions' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {analysisResult.recommendedActions.length}
                    </span>
                  )}
                </button>

                <button
                  id="tab-technology"
                  type="button"
                  onClick={() => setActiveTab('technology')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'technology'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tech &amp; AI Opportunities</span>
                  {analysisResult?.techOpportunities && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      activeTab === 'technology' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {analysisResult.techOpportunities.length}
                    </span>
                  )}
                </button>

                <button
                  id="tab-data-grid"
                  type="button"
                  onClick={() => setActiveTab('data-grid')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'data-grid'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <TableProperties className="w-3.5 h-3.5" />
                  <span>Review Analysis Grid</span>
                  {analysisResult?.analyzedReviews && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      activeTab === 'data-grid' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {analysisResult.analyzedReviews.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Content Views */}
            {analysisResult && (
              <>
                {activeTab === 'dashboard' && (
                  <ExecutiveDashboard
                    reviews={analysisResult.analyzedReviews}
                    stats={dashboardStats}
                    onFilterByTheme={handleFilterByTheme}
                    onFilterByCustomerType={handleFilterByCustomerType}
                  />
                )}

                {activeTab === 'insights' && (
                  <BusinessInsightsSection
                    insights={analysisResult.executiveInsights}
                  />
                )}

                {activeTab === 'actions' && (
                  <RecommendedActionsSection
                    actions={analysisResult.recommendedActions}
                  />
                )}

                {activeTab === 'technology' && (
                  <TechnologyOpportunitiesSection
                    opportunities={analysisResult.techOpportunities}
                  />
                )}

                {activeTab === 'data-grid' && (
                  <ReviewDataTable
                    reviews={analysisResult.analyzedReviews}
                    onSelectReview={(rev) => setSelectedReviewForDetail(rev)}
                    onExportCSV={handleExportCSV}
                    initialThemeFilter={filterTheme || 'All'}
                    initialCustomerTypeFilter={filterCustomerType || 'All'}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Upload CSV Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirmUpload={handleConfirmUpload}
      />

      {/* Review Inspector Modal */}
      <ReviewDetailModal
        review={selectedReviewForDetail}
        onClose={() => setSelectedReviewForDetail(null)}
      />

      {/* Minimal Consulting Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">
              AI Customer Voice &amp; Product Insights
            </span>
            <span>•</span>
            <span>Powered by Gemini 3.8 Flash</span>
          </div>
          <div>
            Built for product leaders, executive strategy &amp; customer success teams
          </div>
        </div>
      </footer>
    </div>
  );
}
