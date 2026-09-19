import React, { useState } from 'react';
import {
  GraduationCap,
  Layers,
  TableProperties,
  LayoutDashboard,
  FileText,
  Zap,
  Cpu,
  HelpCircle,
  TrendingUp,
  Users,
  DollarSign,
  Truck,
  Utensils,
  Headphones,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface MbaDatasetGuideProps {
  onNavigateTab: (tabId: string) => void;
  onFilterTheme?: (theme: string) => void;
}

export const MbaDatasetGuide: React.FC<MbaDatasetGuideProps> = ({
  onNavigateTab,
  onFilterTheme,
}) => {
  const [activeGuideSection, setActiveGuideSection] = useState<
    'dataset-overview' | 'columns-rows' | 'sections-guide' | 'mba-frameworks'
  >('dataset-overview');

  return (
    <div className="space-y-6">
      {/* MBA Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              <span>MBA Management Consulting &amp; Case Study Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif-title">
              Hyperlocal Food Delivery: Dataset &amp; Strategic Dashboard Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed specifically for MBA students, product managers, and business strategists to master customer voice analytics, unit economics, cohort retention, and operational service recovery.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Open Dashboard</span>
            </button>
            <button
              onClick={() => onNavigateTab('data-grid')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>Inspect All 50 Rows</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveGuideSection('dataset-overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeGuideSection === 'dataset-overview'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Dataset Business Context</span>
          </button>

          <button
            onClick={() => setActiveGuideSection('columns-rows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeGuideSection === 'columns-rows'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>2. Rows &amp; Columns Deep Dive</span>
          </button>

          <button
            onClick={() => setActiveGuideSection('sections-guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeGuideSection === 'sections-guide'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Dashboard Sections &amp; Usage</span>
          </button>

          <button
            onClick={() => setActiveGuideSection('mba-frameworks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeGuideSection === 'mba-frameworks'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>4. MBA Strategic Frameworks</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: DATASET BUSINESS CONTEXT */}
      {activeGuideSection === 'dataset-overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-2 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-indigo-600" />
              The Business Model: 3-Sided Hyperlocal Marketplace
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              This dataset captures <strong>50 authentic customer reviews (SYN-CUST-001 to SYN-CUST-050)</strong> from a major food delivery marketplace (comparable to Swiggy, Zomato, DoorDash, or UberEats). In an MBA operational analysis, this marketplace coordinates three interdependent economic actors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                  <Users className="w-4 h-4" />
                  <span>1. Consumers (Eaters)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Demand convenience, accurate delivery ETAs, hot food, and fair, transparent pricing without excessive hidden service charges or packaging fees.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                  <Utensils className="w-4 h-4" />
                  <span>2. Restaurant Merchants</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prepare the food, manage menu availability, packaging durability, and recipe customisation (e.g. less spicy, Jain options, extra chutney).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                  <Truck className="w-4 h-4" />
                  <span>3. Delivery Fleet (Riders)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Execute the physical last-mile fulfillment under weather constraints (rain, traffic), gate entry delays, and map routing accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Cohort Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Customer Segmentation (Who is reviewing?)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              The dataset explicitly segments customers into three core tiers. Understanding these cohorts is fundamental for Customer Lifetime Value (CLV) and churn prevention:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-900">Premium Member</span>
                  <span className="text-[10px] font-semibold bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded">High CLV</span>
                </div>
                <ul className="text-xs text-purple-950 space-y-1.5 list-disc pl-4">
                  <li>Pays an ongoing subscription fee for free delivery and discounts.</li>
                  <li>Expects top-priority service, rapid customer support, and seamless payments.</li>
                  <li><strong>Key Churn Risk:</strong> Long customer service wait times (SYN-CUST-006) and app payment timeout duplicate billing (SYN-CUST-034).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-900">Regular Customer</span>
                  <span className="text-[10px] font-semibold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded">Volume Anchor</span>
                </div>
                <ul className="text-xs text-blue-950 space-y-1.5 list-disc pl-4">
                  <li>Orders frequently for routine lunches, daily breakfasts, and dinners.</li>
                  <li>Values predictable ETAs, quick reordering, and warm meals.</li>
                  <li><strong>Key Churn Risk:</strong> Fee stacking (platform + packaging + service fee) and cold food or packaging leaks (SYN-CUST-005, SYN-CUST-018).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900">New Customer</span>
                  <span className="text-[10px] font-semibold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">Acquisition / CAC</span>
                </div>
                <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-4">
                  <li>First-time or trial users attracted by promos and introductory coupons.</li>
                  <li>Low platform loyalty; high CAC makes early drop-off expensive for the business.</li>
                  <li><strong>Key Churn Risk:</strong> Orders cancelled after payment (SYN-CUST-022) or missing human support (SYN-CUST-027).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ROWS & COLUMNS DEEP DIVE */}
      {activeGuideSection === 'columns-rows' && (
        <div className="space-y-6">
          {/* Row Concept */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-1 flex items-center gap-2">
              <TableProperties className="w-4 h-4 text-indigo-600" />
              What Does Each Row Represent?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Each row in the dataset represents a <strong>discrete completed or attempted order event</strong> accompanied by a customer feedback submission. It couples qualitative verbatim text (the user's voice) with quantitative attributes (Rating, Segment).
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <span><strong>Sample Size:</strong> 50 rows (SYN-CUST-001 to SYN-CUST-050)</span>
              <span><strong>Time Window:</strong> Recent operational cycle</span>
              <span><strong>Data Quality:</strong> 100% complete; zero null values</span>
            </div>
          </div>

          {/* Raw Input Columns Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif-title mb-1">
              Part A: Raw Input Columns (The Uploaded CSV)
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              These 4 columns are provided directly in the raw CSV file:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Column Name</th>
                    <th className="py-2.5 px-3">Data Type</th>
                    <th className="py-2.5 px-3">MBA Business Interpretation</th>
                    <th className="py-2.5 px-3">Example from Dataset</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">Customer ID</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">String (Unique)</td>
                    <td className="py-2.5 px-3">Anonymized unique primary key. Prevents data leakage while allowing cohort tracking and customer service audit trails.</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">SYN-CUST-001</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">Review</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">Unstructured Text</td>
                    <td className="py-2.5 px-3">Qualitative customer voice (VoC). Contains the emotional tone, explicit operational praise, and root-cause grievances.</td>
                    <td className="py-2.5 px-3 italic text-slate-600">"Delivered hot and 12 minutes earlier than estimate..."</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">Rating</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">Integer (1 to 5)</td>
                    <td className="py-2.5 px-3">CSAT (Customer Satisfaction) metric. Ratings 1-2 = Detractor (churn hazard); 3 = Passive; 4-5 = Promoter (high retention).</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-700">5 / 5 Stars</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">Customer Type</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">Categorical</td>
                    <td className="py-2.5 px-3">Strategic cohort segment (Premium Member, Regular Customer, New Customer). Determines Customer Lifetime Value (CLV) and churn cost.</td>
                    <td className="py-2.5 px-3 font-semibold text-purple-700">Premium Member</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI-Derived Analytical Columns */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-serif-title mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Part B: AI-Enriched Derived Columns (Consulting Intelligence)
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              These 6 columns are computed by the AI consulting pipeline to turn unstructured text into structured operational management data:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Enriched Column</th>
                    <th className="py-2.5 px-3">Classification Values</th>
                    <th className="py-2.5 px-3">Why an MBA Manager Needs It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Sentiment</td>
                    <td className="py-2.5 px-3">Positive | Neutral | Negative</td>
                    <td className="py-2.5 px-3">Classifies emotional valence to compute Net Sentiment Score (% Positive minus % Negative).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Customer Theme</td>
                    <td className="py-2.5 px-3">Logistics, Food Quality, Fees, UX, etc.</td>
                    <td className="py-2.5 px-3">Routes problems to operational owners (Supply Chain, Product, CX, Partner Management).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Pain Point</td>
                    <td className="py-2.5 px-3">Discrete friction statement</td>
                    <td className="py-2.5 px-3">Pinpoints the exact root-cause failure (e.g. "Order marked delivered before rider reached building").</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Feature Request</td>
                    <td className="py-2.5 px-3">Explicit/Implied user need</td>
                    <td className="py-2.5 px-3">Feeds into the Product Roadmap (e.g. "Dynamic rain ETA buffer", "Item out-of-stock live menu sync").</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Priority</td>
                    <td className="py-2.5 px-3">Critical | High | Medium | Low</td>
                    <td className="py-2.5 px-3">Operational triage. Critical items represent direct churn or payment failure risks.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">Recommended Action</td>
                    <td className="py-2.5 px-3">Concrete operational step</td>
                    <td className="py-2.5 px-3">Prescribes the exact next step for frontline staff or engineering teams.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DASHBOARD SECTIONS & USAGE */}
      {activeGuideSection === 'sections-guide' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-2">
              Navigating the Strategic Sections of the Tool
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Here is how each section of this platform is structured to support management reviews and executive briefings:
            </p>

            <div className="space-y-4">
              {/* Section 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">1. Executive Dashboard (The Macro Cockpit)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('dashboard')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Go to view <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What it displays:</strong> High-level quantitative KPIs including Net Sentiment Score (-100 to +100), Average Rating, CSAT Star Breakdown, Top Thematic Buckets, and Segment Cross-Tabulation.<br />
                  <strong>MBA Application:</strong> Use this for weekly management check-ins to monitor whether operational changes (e.g. new packaging or delivery policies) are shifting sentiment.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">2. Business Insights (Strategic Synthesis)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('insights')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Go to view <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What it displays:</strong> Executive narrative, Top Churn Hazards, Core Satisfaction Anchors, and Segment Disparities (e.g. New Customers struggling with pricing transparency vs. Premium Members experiencing support latency).<br />
                  <strong>MBA Application:</strong> Prepares the narrative for C-suite meetings and identifies strategic trade-offs across cohorts.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">3. Recommended Actions (Prioritized Strategic Initiatives)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('actions')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Go to view <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What it displays:</strong> Categorized recommendations (Quick Wins, Product Roadmap, Customer Success/Ops, Strategic Policy) prioritized by P0/P1/P2 with explicit customer feedback quotes and functional owners.<br />
                  <strong>MBA Application:</strong> Translates diagnostic insights into an operational execution plan with accountability.
                </p>
              </div>

              {/* Section 4 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">4. Tech &amp; AI Opportunities (Digital Transformation)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('technology')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Go to view <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What it displays:</strong> Practical automation and AI interventions (e.g. Dynamic Rain ETA Buffer Engine, Automated Payment Reconciliation Webhooks, Packaging Audit Workflows).<br />
                  <strong>MBA Application:</strong> Demonstrates technology feasibility, operational efficiency gains, and ROI without speculative fabricated metrics.
                </p>
              </div>

              {/* Section 5 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">5. Review Analysis Grid (Granular Micro Explorer)</h4>
                  </div>
                  <button
                    onClick={() => onNavigateTab('data-grid')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Go to view <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>What it displays:</strong> The full 50-row interactive data grid with multi-filter search (Customer Type, Operational Theme, Sentiment, Priority) and single-click drill-down inspector modal.<br />
                  <strong>MBA Application:</strong> Allows management to inspect raw verbatim evidence, verifying that macro insights correspond to actual customer words.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MBA STRATEGIC FRAMEWORKS */}
      {activeGuideSection === 'mba-frameworks' && (
        <div className="space-y-6">
          {/* Customer Journey Framework */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Framework 1: Customer Journey Touchpoint Analysis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Map every customer review from this 50-item dataset onto the 5 stages of the hyperlocal food delivery lifecycle:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">1. Discovery</span>
                <p className="text-slate-600 text-[11px] mb-2">Search filters, menu accuracy, dietary options.</p>
                <div className="p-2 bg-white rounded border border-slate-100 text-[11px]">
                  <span className="text-emerald-700 font-semibold block">Success:</span>
                  SYN-CUST-019 (Jain filter worked perfectly)
                  <span className="text-rose-700 font-semibold block mt-1">Friction:</span>
                  SYN-CUST-048 (Item unavailable, menu not synced)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">2. Checkout &amp; Pay</span>
                <p className="text-slate-600 text-[11px] mb-2">Pricing transparency, platform fees, payment gateway.</p>
                <div className="p-2 bg-white rounded border border-slate-100 text-[11px]">
                  <span className="text-emerald-700 font-semibold block">Success:</span>
                  SYN-CUST-012 (Promo code worked smoothly)
                  <span className="text-rose-700 font-semibold block mt-1">Friction:</span>
                  SYN-CUST-034 (Payment timeout &amp; charged twice)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">3. Fulfillment</span>
                <p className="text-slate-600 text-[11px] mb-2">Kitchen prep, custom notes, rider dispatch.</p>
                <div className="p-2 bg-white rounded border border-slate-100 text-[11px]">
                  <span className="text-emerald-700 font-semibold block">Success:</span>
                  SYN-CUST-004 (Less-spicy custom note followed)
                  <span className="text-rose-700 font-semibold block mt-1">Friction:</span>
                  SYN-CUST-009 (Received completely wrong curry)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">4. Last-Mile</span>
                <p className="text-slate-600 text-[11px] mb-2">Delivery speed, weather delays, packaging seal.</p>
                <div className="p-2 bg-white rounded border border-slate-100 text-[11px]">
                  <span className="text-emerald-700 font-semibold block">Success:</span>
                  SYN-CUST-001 (Delivered 12 min early, hot paneer)
                  <span className="text-rose-700 font-semibold block mt-1">Friction:</span>
                  SYN-CUST-020 (Spilled thali gravies, poor packing)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">5. Support</span>
                <p className="text-slate-600 text-[11px] mb-2">Customer service resolution, refunds, ticket SLA.</p>
                <div className="p-2 bg-white rounded border border-slate-100 text-[11px]">
                  <span className="text-emerald-700 font-semibold block">Success:</span>
                  SYN-CUST-017 (Fast refund without repeating issue)
                  <span className="text-rose-700 font-semibold block mt-1">Friction:</span>
                  SYN-CUST-006 (Support replied after nearly an hour)
                </div>
              </div>
            </div>
          </div>

          {/* 4Ps of Food Delivery Operations */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif-title mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              Framework 2: The 4Ps Applied to Food Delivery Service Operations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Product (Food Integrity &amp; Experience)</span>
                <p className="text-slate-600 leading-relaxed">
                  Food delivery is not just software; the core product is the hot meal arriving in ready-to-eat condition. Packaging failure (leaks in bags, cold rotis) completely ruins customer satisfaction even if the delivery rider was punctual.
                </p>
                <span className="text-indigo-700 font-semibold block text-[11px]">
                  Observed in data: SYN-CUST-005 (leaked gulab jamun), SYN-CUST-011 (cold roti), SYN-CUST-033 (plastic waste).
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Price (Fee Architecture &amp; Fairness Perception)</span>
                <p className="text-slate-600 leading-relaxed">
                  "Drip pricing" (adding delivery fee, service charge, platform fee, and packaging charge at checkout) causes severe checkout drop-off and customer resentment. Customers perceive this as dishonest markup.
                </p>
                <span className="text-indigo-700 font-semibold block text-[11px]">
                  Observed in data: SYN-CUST-018 (fee stacking on small snack), SYN-CUST-046 (bill increased noticeably with fees).
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Place (Last-Mile Fulfillment &amp; ETA Precision)</span>
                <p className="text-slate-600 leading-relaxed">
                  Customers forgive bad weather (rain, traffic) when ETAs are updated proactively, but become infuriated when the app displays outdated delivery promises or riders prematurely mark orders as delivered.
                </p>
                <span className="text-indigo-700 font-semibold block text-[11px]">
                  Observed in data: SYN-CUST-015 (rain delay without updated ETA), SYN-CUST-039 (marked delivered before reaching).
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Promotion (Subscription &amp; Coupon Trust)</span>
                <p className="text-slate-600 leading-relaxed">
                  Promotions must be transparent. When Premium Members discover unexpected restaurant exclusions, or New Customers experience price changes after adding items to cart, trust is damaged.
                </p>
                <span className="text-indigo-700 font-semibold block text-[11px]">
                  Observed in data: SYN-CUST-024 (subscription discount exclusions unclear), SYN-CUST-036 (price changed in cart).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
