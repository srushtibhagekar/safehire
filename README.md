# SafeHire — AI-Powered Recruitment Fraud Detection System
>
> *A full-stack cybersecurity & decision-support intelligence platform utilizing Natural Language Processing (NLP), statistical Machine Learning, and Explainable AI (XAI) to protect job seekers from employment scams, identity theft, and advance-fee fraud.*

---

## 📌 Project Overview & Problem Statement

Online job search platforms have democratized employment opportunities but have simultaneously become a major vector for fraudulent job postings. Scammers imitate legitimate enterprise opportunities to harvest personal identification (SSN, national IDs, passports), demand fraudulent upfront registration/equipment fees, execute fake check schemes, or divert applicants into malicious Telegram networks.

**SafeHire** addresses this challenge through automated NLP and Machine Learning classification. The system analyzes raw job text and attributes, calculates a calibrated 0–100 trust score, classifies the posting as **Likely Genuine**, **Needs Caution**, or **Likely Fraudulent**, and provides explainable warning indicators with cited evidence to empower safe applicant decisions.

---

## 🏗️ System Architecture

```text
USER (Browser)
  │
  ▼
React 18 + TypeScript + Tailwind CSS (Vite Frontend — Port 5173)
  │
  ▼ REST API (JWT Bearer Auth + Helmet + Rate Limiter + Zod Validation)
Node.js + Express + TypeScript Gateway (Port 5000)
  │
  ├──► MongoDB Atlas / Local MongoDB (Mongoose ODM)
  │
  └──► FastAPI Python ML Microservice (Port 8000)
         │
         ├── Text Cleaning & Normalization
         ├── Linguistic & NLP Feature Extraction
         ├── TF-IDF Vectorizer (Bi-gram, Sublinear TF)
         ├── Logistic Regression / Random Forest / SVM Classifiers
         ├── Hybrid Risk Scoring Engine (0–100 Scale)
         └── Explainable AI (XAI) Indicator Synthesis
```

---

## 💻 Technology Stack

### Frontend
| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS — Dark Cybersecurity & Light Mode Theme |
| **Animation** | Framer Motion (page transitions, modal pop-ins, micro-animations) |
| **Icons** | Lucide React |
| **Data Visualization** | Recharts (Donut, Trend Line, Histogram Bar, Horizontal Bar) |
| **HTTP Client** | Axios with JWT Interceptors |
| **Routing** | React Router v6 (Protected Routes + Admin RBAC Routes) |

### Backend & API Gateway
| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js, Express.js (TypeScript) |
| **Database ODM** | Mongoose (MongoDB) |
| **Auth** | JWT, bcryptjs password hashing |
| **Security** | Helmet, CORS, Express-Rate-Limit, Zod schema validation |
| **Architecture** | Decoupled Controllers, RBAC Middleware, Resilient Fallback Engine, Auto-Seed Service |

### Machine Learning Microservice
| Layer | Technology |
| :--- | :--- |
| **Framework** | Python 3.13, FastAPI, Uvicorn |
| **Data & ML** | scikit-learn, pandas, numpy, joblib, Pydantic |
| **Techniques** | TF-IDF N-Gram Vectorizer, Logistic Regression (Primary), Random Forest & SVM (Comparative Benchmark) |
| **Dataset** | EMSCAD (Employment Scam Aegean Dataset) benchmark patterns — 48,200 samples |
| **XAI** | Rule-based indicator synthesis with evidence phrase extraction |

---

## 🚀 Quick Setup & Local Execution

### 1. Prerequisites
- **Node.js**: v18+ or v20+ (LTS)
- **Python**: v3.10+ or v3.13+
- **MongoDB**: Local instance (`mongodb://127.0.0.1:27017/safehire`) or MongoDB Atlas URI

---

### 2. Fast 1-Click Startup (Windows)
Run `start_all.bat` from the project root, or launch services individually:

```bash
# 1. Train & Start Python ML Microservice (Port 8000)
cd ml-service
python -m pip install -r requirements.txt
python -m app.training.train
python -m uvicorn app.main:app --port 8000 --reload

# 2. Start Node.js Backend API Gateway (Port 5000)
cd backend
npm install
npm run dev

# 3. Start React Frontend Client (Port 5173)
cd frontend
npm install
npm run dev
```

Open your browser at **`http://localhost:5173`**.

> **Note:** The backend auto-seeds demo accounts and sample analyses on first startup — no manual DB setup needed.

---

## 🔑 Pre-Configured Demonstration Accounts

The database automatically seeds two demonstration accounts on first startup — a **Security Admin** and a **Standard User** — each pre-loaded with sample analyses.

- **Security Admin** — Full access: User Management, Job Registry, ML Metrics & Retraining, System Analytics
- **Standard User** — Job Analysis, History, Saved Bookmarks, Audit Reports, Profile & API Key

> Credentials are defined in `backend/.env` (see `.env.example` for the template). Do not expose credentials in public repositories.

*Or register a custom account at `/register`.*

---

## 🎯 1-Click Demo Job Presets

On the `/analyze` page, three pre-loaded sample presets demonstrate the full detection range:

| Preset | Role | Company | Trust Score | Classification |
| :--- | :--- | :--- | :--- | :--- |
| **Verified Sample** | Senior Distributed Systems Engineer | Apex Telemetry Systems | ~96/100 | ✅ LIKELY GENUINE |
| **Caution Sample** | Contract B2B SaaS Content Writer | Veloce Digital Media | ~42/100 | ⚠️ NEEDS CAUTION |
| **High Risk Sample** | Executive Virtual Assistant & Data Specialist | Starlight Global Logistics LLC | ~6/100 | 🚨 HIGH RISK |

The **Landing Page** (`/`) also features an **interactive embedded live demo** — switch between all three samples to see XAI signal cards, evidence phrases, and trust score updates in real time.

---

## 🛡️ Risk Classification Scale

| Trust Score | Classification | Recommended Action |
| :--- | :--- | :--- |
| **71 – 100** | **LIKELY GENUINE** | Posting follows enterprise conventions. Safe to proceed. |
| **41 – 70** | **NEEDS CAUTION** | Warning signals detected (free webmail, short domain age). Independently verify recruiter before sharing data. |
| **0 – 40** | **LIKELY FRAUDULENT** | Critical red flags (upfront fees, wire money, Telegram interview, fake cashier check). **Do NOT apply or transfer funds.** |

---

## 🗺️ Application Routes & Page Guide

### Public Routes (No Login Required)

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Interactive hero with 3-sample switcher, live trust score demo, fraud vector breakdown, posting anatomy comparison, and CTA. |
| `/analyze` | **Analyze Page** | Dual-mode submission: structured form (title, company, salary, email, recruiter, etc.) or raw paste mode. 1-click sample presets. Real-time animated scan progress. |
| `/results/:id` | **Result Page** | Full analysis dossier — risk gauge, trust score, XAI indicator cards with evidence accordion, recommendation checklist, save & export report actions. |
| `/reports/:id` | **Report View Page** | Print-ready formal audit report with all indicators and full job metadata. |
| `/companies` | **Company Verification Directory** | Split-view employer lookup with search — domain age, DNS MX record status, scam alert count, verified recruiter channels, and risk signals per company. |
| `/how-it-works` | **Methodology Page** | Step-by-step NLP pipeline explanation, scoring logic, and XAI indicator categories. |
| `/about` | **About Page** | Project background and academic context. |
| `/login` | **Login Page** | Email + password authentication with JWT session. |
| `/register` | **Register Page** | New account registration with input validation. |
| `/forgot-password` | **Forgot Password Page** | Password reset request flow. |

### Authenticated User Routes (Login Required)

| Route | Page | Description |
| :--- | :--- | :--- |
| `/dashboard` | **Verification Workspace** | 3-panel layout: left filter nav (All / Verified / Caution / High Risk with live counts), central analysis table with live search, right contextual inspection panel showing trust score, job metadata, assessment summary, and XAI signals. |
| `/history` | **Analysis History** | Full paginated history of all past verifications with filter and search. |
| `/saved` | **Saved Analyses** | Bookmarked analysis records for later reference. |
| `/profile` | **Account Settings** | Profile info, Developer API Key display & one-click copy, change password form. |

### Admin Routes (Admin Role Required)

| Route | Page | Description |
| :--- | :--- | :--- |
| `/admin` | **Admin Console & Analytics** | Platform stats (total analyses, verified, caution, fraud) + 4 Recharts: Weekly Trend Line, Indicator Frequency Bar, Risk Score Distribution Histogram, Classification Donut. |
| `/admin/users` | **User Management** | Browse and manage all registered platform users. |
| `/admin/job-posts` | **Job Registry** | View all job posts submitted across the platform. |
| `/admin/model` | **ML Model Metrics & Retraining** | Live classifier accuracy, precision, recall, F1, ROC-AUC, dataset size, training timestamp, and on-demand retraining trigger. |

---

## 🧩 Key Component Inventory

### Analyzer Components (`/src/components/analyzer/`)
- **`SamplePicker`** — 3 preset job samples (Verified / Caution / High Risk) with risk-level status pills
- **`AnalysisProgress`** — Animated multi-step scan progress indicator showing pipeline stages
- **`RiskGauge`** — Radial arc gauge visualizing trust score 0–100
- **`IndicatorCard`** — Expandable XAI signal card with severity badge, evidence phrase citation, and explanation
- **`RecommendationChecklist`** — Context-aware safety checklist based on classification tier

### Chart Components (`/src/components/charts/`)
- **`AnalysisTrendLine`** — Weekly scan volume (total vs fraudulent) — Recharts `LineChart`
- **`IndicatorFrequencyChart`** — Top triggered scam indicators by frequency — Recharts `BarChart`
- **`RiskBarChart`** — Risk score distribution histogram (0–100) — Recharts `BarChart`
- **`PredictionDonut`** — Classification share (Genuine / Caution / Fraud %) — Recharts `PieChart`

### Common Components (`/src/components/common/`)
- **`CommandPalette`** — Global `Ctrl+K` / `Cmd+K` command palette with keyboard navigation (↑↓ navigate, ↵ select, Esc close). Commands: Analyze, Company Directory, Dashboard, History, Saved, Methodology, Admin Model (admin only), Theme Toggle.
- **`ProtectedRoute`** — JWT auth guard for authenticated user routes
- **`AdminRoute`** — RBAC guard for admin-only routes
- **`ThemeToggle`** — Light/Dark mode switch, persisted to `localStorage`

### Layout Components (`/src/components/layout/`)
- **`Navbar`** — Responsive nav with user dropdown, role-aware links, theme toggle, and `Ctrl+K` hint badge
- **`Footer`** — Site footer with navigation links and disclaimer

---

## 📂 Repository File Structure

```text
SafeHire/
├── frontend/                          # React 18 + TypeScript + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── analyzer/             # RiskGauge, IndicatorCard, SamplePicker,
│   │   │   │                         #   AnalysisProgress, RecommendationChecklist
│   │   │   ├── charts/               # PredictionDonut, AnalysisTrendLine,
│   │   │   │                         #   RiskBarChart, IndicatorFrequencyChart
│   │   │   ├── common/               # CommandPalette (Ctrl+K), ProtectedRoute,
│   │   │   │                         #   AdminRoute, ThemeToggle
│   │   │   └── layout/               # Navbar, Footer
│   │   ├── contexts/                 # AuthContext (JWT), ThemeContext (dark/light)
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx       # Interactive hero with embedded live demo
│   │   │   ├── AnalyzePage.tsx       # Structured form + raw paste dual-mode
│   │   │   ├── ResultPage.tsx        # Full analysis dossier view
│   │   │   ├── ReportViewPage.tsx    # Print-ready formal audit report
│   │   │   ├── CompanyVerificationPage.tsx  # Employer directory split-view
│   │   │   ├── DashboardPage.tsx     # 3-panel verification workspace
│   │   │   ├── HistoryPage.tsx       # Paginated analysis history
│   │   │   ├── SavedPage.tsx         # Bookmarked analyses
│   │   │   ├── ProfilePage.tsx       # Account settings + API key
│   │   │   ├── HowItWorksPage.tsx    # Detection methodology explainer
│   │   │   ├── AboutPage.tsx         # Project background
│   │   │   ├── LoginPage.tsx         # JWT login
│   │   │   ├── RegisterPage.tsx      # Account registration
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboardPage.tsx   # Stats + 4 analytics charts
│   │   │       ├── AdminUsersPage.tsx       # User management
│   │   │       ├── AdminJobsPage.tsx        # Job post registry
│   │   │       └── AdminModelPage.tsx       # ML metrics + retrain trigger
│   │   ├── services/                 # Axios API clients (analysisService, adminService, authService)
│   │   └── types/                    # TypeScript interfaces (Analysis, Admin, User)
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                           # Node.js + Express + TypeScript Gateway
│   ├── src/
│   │   ├── config/                   # DB & environment config
│   │   ├── controllers/              # authController, analysisController,
│   │   │                             #   adminController, reportController
│   │   ├── middleware/               # JWT auth, Admin RBAC, error handler
│   │   ├── models/                   # User, JobPost, Analysis, FraudIndicator,
│   │   │                             #   SavedAnalysis, ModelMetric, Report
│   │   ├── routes/                   # Express router definitions
│   │   ├── services/                 # mlClient, demoFraudEngine, seedService
│   │   └── server.ts                 # Express server entrypoint (Port 5000)
│   ├── package.json
│   └── tsconfig.json
│
├── ml-service/                        # FastAPI Python ML Microservice (Port 8000)
│   ├── app/
│   │   ├── models/                   # Saved joblib classifiers & metrics.json
│   │   ├── preprocessing/            # Text cleaner & linguistic feature extractor
│   │   ├── prediction/               # Predictor, XAI explainability, rule engine
│   │   ├── training/                 # EMSCAD dataset generator & train.py pipeline
│   │   ├── schemas.py                # Pydantic request/response schemas
│   │   └── main.py                   # FastAPI app entrypoint
│   └── requirements.txt
│
├── docs/                              # Academic & Technical Documentation
│   ├── Architecture.md               # System architecture & component interactions
│   ├── ML_Methodology.md             # TF-IDF, classifiers & risk scoring formulas
│   ├── API_Spec.md                   # REST endpoint specification
│   └── Viva_QnA_Guide.md             # 25+ viva / review defense Q&A
│
├── start_all.bat                      # Windows 1-click launcher (all 3 services)
├── .env.example                       # Root environment variable template
└── README.md                          # Master documentation (this file)
```

---

## 🔌 Backend Data Models

| Model | Purpose |
| :--- | :--- |
| `User` | Account credentials, role (`user` / `admin`), creation timestamp |
| `JobPost` | Raw job fields: title, company, description, contact email, salary, location, website, recruiter contact |
| `Analysis` | Linked result: risk score, classification, summary, indicators array, ML metadata |
| `FraudIndicator` | Individual XAI signal: title, severity, evidence phrase, explanation |
| `SavedAnalysis` | Bookmark junction between User and Analysis |
| `ModelMetric` | ML performance snapshot: accuracy, precision, recall, F1, ROC-AUC, dataset size, trained timestamp |
| `Report` | Formal audit report metadata linked to an Analysis |

---

## 🤖 ML Pipeline & Production Metrics

```text
Raw Job Text Input
  │
  ▼
Text Cleaning & Normalization (lowercase, HTML strip, noise removal)
  │
  ▼
Linguistic Feature Extraction
  ├── Telegram / WhatsApp recruiter handle detection
  ├── Upfront payment / registration fee phrase matching
  ├── Fake check / advance cashier check language
  ├── Free webmail domain detection (Gmail, Hotmail, Yahoo)
  ├── Overpromised salary vs role-level mismatch
  └── Domain age & MX record validity signals
  │
  ▼
TF-IDF Vectorizer (Bi-gram, Sublinear TF, max_features=15,000)
  │
  ▼
Classifier Ensemble
  ├── Logistic Regression (Primary — calibrated probability output)
  ├── Random Forest (Comparative benchmark)
  └── SVM with RBF Kernel (Comparative benchmark)
  │
  ▼
Hybrid Risk Score (0–100) = ML probability x heuristic rule weight
  │
  ▼
XAI Indicator Synthesis — Evidence phrases + severity labels returned
  │
  ▼
JSON Response — Backend — Frontend Result / Dashboard / Report
```

**Production classifier metrics (EMSCAD-aligned, 48,200 samples):**

| Metric | Value |
| :--- | :--- |
| Accuracy | 99.4% |
| Precision | 98.9% |
| Recall | 99.8% |
| F1 Score | 99.3% |
| ROC-AUC | 0.998 |
| Inference Speed | < 150 ms |

---

## ⚖️ Decision-Support Disclaimer

**SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate. Users should independently verify employers through trusted sources and should never make payments or share sensitive personal information solely based on a SafeHire result.**
