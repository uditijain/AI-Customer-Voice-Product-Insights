import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle, Download, Sparkles } from 'lucide-react';
import { parseCSVString, ParseResult } from '../utils/csv';
import { SAMPLE_CSV_CONTENT } from '../data/sampleReviews';
import { RawReview } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpload: (reviews: RawReview[], filename: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpload,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && !file.name.endsWith('.txt')) {
      setErrorMessage('Please upload a standard CSV file (.csv).');
      return;
    }

    setSelectedFileName(file.name);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        setErrorMessage('File appears to be empty.');
        return;
      }
      const result = parseCSVString(text);
      if (result.errors.length > 0 && result.data.length === 0) {
        setErrorMessage(result.errors.join(' '));
        setParseResult(null);
      } else {
        setParseResult(result);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file from disk.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Customer_Feedback_Template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    if (parseResult && parseResult.data.length > 0) {
      onConfirmUpload(parseResult.data, selectedFileName || 'Uploaded_Feedback.csv');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-serif-title">
              Upload Customer Feedback CSV
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Required columns: <span className="font-semibold text-slate-700">Customer ID</span>,{' '}
              <span className="font-semibold text-slate-700">Review</span>,{' '}
              <span className="font-semibold text-slate-700">Rating</span> (1-5), and{' '}
              <span className="font-semibold text-slate-700">Customer Type</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-7 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-800">
              Drag &amp; drop your CSV file here, or{' '}
              <span className="text-blue-600 font-semibold underline">browse files</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports UTF-8 encoded .csv files up to 10MB
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">CSV Verification Issue</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success / Parsed Summary */}
          {parseResult && parseResult.data.length > 0 && (
            <div className="rounded-lg bg-emerald-50/60 border border-emerald-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Successfully verified {parseResult.data.length} feedback records in{' '}
                    <span className="font-mono text-emerald-800">{selectedFileName}</span>
                  </span>
                </div>
              </div>

              {/* Sample preview table */}
              <div className="border border-emerald-200/80 rounded bg-white overflow-hidden text-xs">
                <div className="bg-slate-100/80 px-3 py-1.5 font-semibold text-slate-700 border-b border-slate-200 flex justify-between">
                  <span>Data Preview (First 3 Rows)</span>
                  <span className="text-slate-500 font-normal">
                    {parseResult.data.length} rows total
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {parseResult.data.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="p-2.5 text-slate-700 flex flex-col gap-1">
                      <div className="flex items-center gap-2 font-medium text-slate-900">
                        <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {item.customerId}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px]">
                          {item.customerType}
                        </span>
                        <span className="text-amber-600 text-[11px]">
                          ★ {item.rating}/5
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs italic line-clamp-1">
                        "{item.review}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Template helper */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Don't have a file ready?</span>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download sample CSV template</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            id="start-ai-analysis-btn"
            disabled={!parseResult || parseResult.data.length === 0}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>
              Analyze with Gemini ({parseResult?.data.length || 0} Reviews)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
