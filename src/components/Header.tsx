import React from 'react';
import { Upload, Sparkles, FileSpreadsheet, Printer, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenUpload: () => void;
  onLoadSample: () => void;
  onExportCSV: () => void;
  onPrintReport: () => void;
  isAnalyzing: boolean;
  totalReviews: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUpload,
  onLoadSample,
  onExportCSV,
  onPrintReport,
  isAnalyzing,
  totalReviews,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Consulting Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-700/80 border border-blue-400/30 flex items-center justify-center shadow-inner flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-bold tracking-tight text-white font-serif-title">
                AI Customer Voice &amp; Product Insights
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/80">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              Strategic feedback intelligence, pain point triage &amp; executive roadmap synthesis
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            id="load-sample-dataset-btn"
            type="button"
            onClick={onLoadSample}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
            title="Load 15 multi-segment B2B/B2C reviews to preview analysis"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Load Sample Data</span>
          </button>

          <button
            id="upload-csv-btn"
            type="button"
            onClick={onOpenUpload}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Feedback CSV</span>
          </button>

          {totalReviews > 0 && (
            <>
              <button
                id="export-csv-btn"
                type="button"
                onClick={onExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Download enriched feedback dataset with AI sentiment & recommendations"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                id="print-report-btn"
                type="button"
                onClick={onPrintReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Print or save executive briefing as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Print Briefing</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
