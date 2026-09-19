# AI Customer Voice & Product Insights

> **Executive-grade customer feedback intelligence platform that turns raw user reviews into strategic business insights, prioritized product roadmaps, and technology opportunities using Gemini.**

Designed for business leaders, product managers, and MBA students, this platform bridges the gap between unstructured Voice of Customer (VoC) data and executive decision-making. It categorizes customer friction points, identifies retention risks, and formulates evidence-based action plans without inventing unsupported numerical claims.

---

## 📌 Executive Overview

In multi-sided marketplaces and consumer platforms, customer feedback is often high-volume, fragmented, and emotionally charged. Traditional sentiment analysis only provides superficial positive/negative counts. 

This platform performs **multi-dimensional strategic analysis** to extract:
1. **Operational Themes & Root Causes**: Categorizing feedback into operational domains (e.g., *Delivery & Fleet Logistics*, *Food Quality & Packaging*, *Pricing & Platform Fees*, *App UX & Payment Flow*).
2. **Segment Sensitivities**: Identifying how pain points differ across customer tiers (*Premium Members*, *Regular Customers*, and *New Customers*).
3. **Prioritized Action Roadmaps**: Generating concrete P0/P1/P2 initiatives with explicit customer evidence, implementation steps, and functional ownership.
4. **Strategic Tech & AI Opportunities**: Evaluating feasibility, architecture, and expected efficiency gains for AI and automation investments.

---

## 🚀 Key Features & Dashboard Modules

### 1. Executive Summary & Sentiment KPIs
- **Net Sentiment Score**: Calculated as `(% Positive - % Negative)` across all analyzed reviews, serving as a pulse on overall platform brand equity.
- **Aggregated Ratings**: Average customer satisfaction rating across the complete dataset (no hardcoded review limits).
- **Segment Breakdown**: Interactive distribution of customer types and rating volume.

### 2. Strategic Insights (MBA Frameworks)
- **Customer Segment Disparities**: Uncovers divergence in expectations between subscription members, habitual repeat users, and first-time buyers.
- **Churn Risks**: Catalogs operational vulnerabilities that directly threaten customer lifetime value (LTV).
- **Satisfaction Drivers**: Identifies high-leverage delight factors that defend brand loyalty.

### 3. Recommended Actions
- **Prioritization Matrix**: Organized into *Immediate (P0)*, *Near-term (P1)*, and *Medium-term (P2)* initiatives.
- **Categorization**: *Quick Wins*, *Product Roadmaps*, *Customer Success & Support*, and *Strategic Policy*.
- **Evidence-Based Grounding**: Each initiative directly quotes observed customer feedback and outlines a pragmatic execution plan without fabricated metrics.

### 4. Technology & AI Opportunities
- Strategic evaluation of modern AI, LLM, automation, and predictive dispatch capabilities.
- Detailed assessment of problem addressed, proposed technical solution, implementation feasibility (1–4 weeks, 1–2 months, 3+ months), and recommended architectural approach.

### 5. Review Analysis Grid
- Full paginated table displaying every analyzed customer review.
- Multi-parameter filtering by **Sentiment** (*Positive*, *Neutral*, *Negative*), **Customer Segment**, and **Operational Theme**.
- Full-text search across customer IDs, reviews, and pain points.
- One-click **CSV Export** for offline spreadsheet analysis and slide deck preparation.
- Detailed modal inspection showing underlying metadata, priority tags, and suggested operational actions.

### 6. Interactive MBA Dataset Guide
- A built-in educational reference module detailing:
  - The economics of 3-sided marketplaces (Consumers, Merchants, Riders).
  - Mapping to classic MBA frameworks: **4Ps of Marketing**, **Customer Journey Touchpoints**, and **Unit Economics**.
  - Row and column architectural guides explaining how each attribute informs decision-making.

### 7. Executive Report Export
- Formatted, printable/downloadable executive summary for leadership briefings, case studies, and investor presentations.

---

## 📊 Dataset Schema & Column Architecture

The platform processes customer review datasets with the following schema:

| Column | Data Type | Business Meaning | Strategic Relevance |
| :--- | :--- | :--- | :--- |
| `customerId` | String | Unique customer identifier | Links feedback to user purchase history and account age for cohort analysis. |
| `customerType` | Category | Commercial customer segment (`Premium Member`, `Regular Customer`, `New Customer`) | Measures segment sensitivity to pricing, delivery speed, and support response. |
| `rating` | Number (1–5) | Customer satisfaction score | Quantitative CSAT baseline. |
| `review` | Text | Qualitative Voice of Customer narrative | Unfiltered user feedback used for qualitative root-cause discovery. |
| `customerTheme` | Category | Operational business domain | Assigns accountability to specific business units (Operations, Product, Support). |
| `painPoint` | Text | Identified user friction or service failure | Pinpoints exact failure points along the customer journey. |
| `featureRequest` | Text | User enhancement demand | Feeds into feature backlog and product roadmap planning. |
| `priority` | Category | Urgency tier (`Critical`, `High`, `Medium`, `Low`) | Powers Eisenhower impact-effort triage. |
| `recommendedAction` | Text | Direct operational next step | Actionable resolution assigned to departmental owners. |

---

## 🛠️ Technology Stack

- **Frontend**:
  - [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/) - Lightning-fast frontend build tooling
  - [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling with custom typographic scales
  - [Motion](https://motion.dev/) - Fluid micro-interactions and modal transitions
  - [Lucide React](https://lucide.dev/) - Modern UI iconography
  - [PapaParse](https://www.papaparse.com/) - Robust in-browser CSV parsing
- **Backend & AI Service**:
  - [Express](https://expressjs.com/) - Server middleware for secure API routing
  - [@google/genai SDK](https://github.com/google/generative-ai-js) - Native Gemini 3.8 Flash model integration
  - Intelligent Chunking & Heuristic Fallback Engine - Guarantees 100% uptime and resilience against transient network disruptions

---

## 📁 Repository Structure

```
├── .env.example              # Environment variables template
├── metadata.json             # AI Studio applet metadata & capabilities
├── package.json              # Project dependencies and lifecycle scripts
├── server.ts                 # Express backend & Gemini AI analysis service
├── vite.config.ts            # Vite & Tailwind build configuration
├── public/                   # Static assets and icons
└── src/
    ├── main.tsx              # Application client entry point
    ├── App.tsx               # Root component, state management & tab routing
    ├── index.css             # Global styles and Tailwind imports
    ├── types.ts              # TypeScript interfaces for reviews & insights
    ├── data/
    │   └── sampleReviews.ts  # Default 50-review food delivery marketplace dataset
    ├── utils/
    │   └── csvParser.ts      # CSV ingestion, validation, and normalization
    └── components/
        ├── Header.tsx                    # Executive brand header & analysis triggers
        ├── ExecutiveDashboard.tsx        # High-level KPIs, sentiment cards & charts
        ├── BusinessInsightsSection.tsx   # Segment disparities, churn risks & drivers
        ├── RecommendedActionsSection.tsx # Evidence-grounded action roadmaps
        ├── TechnologyOpportunitiesSection.tsx # Tech & AI innovation initiatives
        ├── ReviewDataTable.tsx           # Paginated feedback grid with search & filters
        ├── ReviewDetailModal.tsx         # Detailed single-review inspection drawer
        ├── MbaDatasetGuide.tsx           # Strategic business guide & MBA framework docs
        ├── ExecutiveReportView.tsx       # Printable executive briefing report
        └── UploadModal.tsx               # Custom CSV file uploader & drag-and-drop
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory (referencing `.env.example`):
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
# Build frontend and bundle server
npm run build

# Start the compiled production server
npm start
```

---

## 🎓 MBA Strategic Frameworks Applied

| Framework | How It Is Implemented in the Platform |
| :--- | :--- |
| **3-Sided Marketplace Dynamics** | Evaluates the interplay between Consumers (demanding hot meals & fair pricing), Merchants (packaging integrity & menu accuracy), and Riders (weather delays & routing). |
| **Unit Economics & LTV Defense** | Highlights how high platform fee stacking increases churn risk on low-margin small basket sizes, while checkout bugs destroy Premium Member LTV. |
| **Customer Journey Mapping** | Tracks failure modes across 5 sequential touchpoints: *Discovery & Search* → *Checkout & Payment* → *Kitchen Preparation* → *Last-Mile Dispatch* → *Post-Delivery Recovery*. |
| **4Ps of Marketing Analysis** | Segregates operational feedback into **Product** (food temperature, portion), **Price** (platform fee transparency), **Place** (delivery radius, weather buffers), and **Promotion** (discount codes, subscription perks). |
| **Eisenhower Priority Triage** | Categorizes business responses into Immediate (P0), Near-term (P1), and Medium-term (P2) initiatives to assist leadership resource allocation. |

---

## 🔒 Security & Data Integrity Principles

- **No Fabricated Metrics**: Recommendations are strictly grounded in observable customer text. Where quantitative proof is unavailable, qualitative statements (*"could improve retention"*, *"may reduce support tickets"*) are used.
- **Server-Side API Key Isolation**: All Gemini API interactions occur in `server.ts`; API keys are never exposed to client browsers.
- **Idempotency & Resilience**: Built-in chunking handles large feedback batches smoothly, supported by heuristic fallbacks if external API rate limits are encountered.

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
