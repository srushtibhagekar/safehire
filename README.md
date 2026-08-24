# SafeHire — AI-Powered Recruitment Fraud Detection System

> **Verify Before You Apply.**
> 
> *A full-stack cybersecurity & decision-support intelligence platform utilizing Natural Language Processing (NLP), statistical Machine Learning, and Explainable AI (XAI) to protect job seekers from employment scams, identity theft, and advance-fee fraud.*

---

## 📌 Project Overview & Problem Statement

Online job search platforms have democratized employment opportunities but have simultaneously become a major vector for fraudulent job postings. Scammers imitate legitimate enterprise opportunities to harvest personal identification (SSN, national IDs, passports), demand fraudulent upfront registration/equipment fees, execute fake check schemes, or divert applicants into malicious Telegram networks.

**SafeHire** addresses this challenge through automated Natural Language Processing and Machine Learning classification. The system analyzes raw job text and attributes, calculates a calibrated 0–100 risk score, classifies the posting as **Likely Genuine**, **Needs Caution**, or **Likely Fraudulent**, and provides explainable warning indicators with cited evidence to empower safe applicant decisions.

---

## 🏗️ System Architecture

```text
USER (Browser)
  │
  ▼
React + TypeScript + Tailwind CSS (Vite Frontend)
  │
  ▼ REST API (JWT Bearer Auth + Helmet + Rate Limiter)
Node.js + Express + TypeScript Gateway
  │
  ├──► MongoDB Atlas / Local MongoDB (Mongoose Models)
  │
  └──► FastAPI Python ML Microservice (Port 8000)
         │
         ├── Text Cleaning & Normalization
         ├── Linguistic & NLP Feature Extraction
         ├── TF-IDF Vectorizer (Bi-gram, Sublinear TF)
         ├── Logistic Regression / Random Forest / SVM Classifiers
         ├── Hybrid Risk Scoring Engine (0-100 Scale)
         └── Explainable AI (XAI) Indicator Synthesis
```

---

## 💻 Technology Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Dark Cybersecurity & Light Mode Theme
- **Data Visualization**: Recharts (Donut, Histogram, Trend Line, Horizontal Bar)
- **Animation & Icons**: Framer Motion, Lucide React
- **HTTP Client**: Axios with JWT Interceptors

### Backend & API
- **Runtime**: Node.js, Express.js (TypeScript)
- **Database ODM**: Mongoose (MongoDB)
- **Security**: JWT Authentication, bcryptjs, Helmet, CORS, Express-Rate-Limit, Zod validation
- **Architecture**: Decoupled Controllers, RBAC Middleware, Resilient Fallback Engine

### Machine Learning Microservice
- **Framework**: Python 3.13, FastAPI, Uvicorn
- **Data & ML**: scikit-learn, pandas, numpy, joblib, Pydantic
- **Techniques**: TF-IDF N-Gram Vectorizer, Logistic Regression (Primary), Random Forest & SVM (Comparative Benchmark)
- **Dataset Alignment**: EMSCAD (Employment Scam Aegean Dataset) benchmark patterns

---

## 🚀 Quick Setup & Local Execution

### 1. Prerequisites
- **Node.js**: v18+ or v20+ (LTS)
- **Python**: v3.10+ or v3.13+
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/safehire`) or MongoDB Atlas URI.

---

### 2. Fast 1-Click Startup (Windows)
Run `start_all.bat` or launch services independently:

```bash
# 1. Start Python ML Microservice (Port 8000)
cd ml-service
python -m pip install -r requirements.txt
python -m app.training.train
python -m uvicorn app.main:app --port 8000 --reload

# 2. Start Backend API Gateway (Port 5000)
cd backend
npm install
npm run dev

# 3. Start Frontend Client (Port 5173)
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🔑 Pre-Configured Presentation Accounts

The database automatically seeds default demonstration accounts with sample analyses on first startup:

| Account Type | Email | Password | Role & Permissions |
| :--- | :--- | :--- | :--- |
| **Security Admin** | `admin@safehire.io` | `Admin@123456` | Full Access: User Management, DB Audit Logs, ML Retraining & Telemetry |
| **Standard User** | `user@safehire.io` | `User@123456` | Job Scanning, Analysis History, Bookmarks, Audit Certificates |

*Or register your own custom account directly from the `/register` page.*

---

## 🎯 Demonstration Job Postings (1-Click Presets)

On the `/analyze` page, test our 1-click sample presets:

1. **Genuine Job Example (Score: ~12/100 — Likely Genuine)**
   - *Senior Frontend Engineer at Stripe* (Clear technical requirements, verified domain `stripe.com`, transparent compensation).
2. **Suspicious Job Example (Score: ~48/100 — Needs Caution)**
   - *Remote Project Coordinator at Apex Solutions* (Free public email `apexjobs2026@gmail.com`, missing company website).
3. **Fraudulent Scam Example (Score: ~94/100 — Likely Fraudulent)**
   - *Urgent Data Entry Clerk at Global Home Careers* (Demands $150 registration fee via wire transfer, Telegram interview handle `@hiring_fast_hr`, artificial urgency).

---

## 🛡️ Risk Classification Scale

| Risk Score | Classification | Security Action |
| :--- | :--- | :--- |
| **0 – 29** | **LIKELY GENUINE** | Listing follows standard enterprise conventions. Safe to proceed with normal application. |
| **30 – 59** | **NEEDS CAUTION** | Warning signals identified (unverified email/website). Independently verify recruiter before sharing data. |
| **60 – 100** | **LIKELY FRAUDULENT** | Critical red flags (upfront fee, wire money, Telegram interview). **Do NOT apply or transfer funds.** |

---

## 📂 Repository File Structure

```text
SafeHire/
├── frontend/                     # React + TypeScript + Vite + Tailwind Client
│   ├── src/
│   │   ├── components/           # UI, Layout, Analyzer (RiskGauge, Progress, Cards), Charts
│   │   ├── contexts/             # AuthContext, ThemeContext
│   │   ├── pages/                # Landing, About, HowItWorks, Auth, Dashboard, Analyze, Results, Admin
│   │   ├── services/             # Axios API clients
│   │   └── types/                # TypeScript Interfaces
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express + TypeScript Gateway
│   ├── src/
│   │   ├── config/               # DB & Environment Config
│   │   ├── controllers/          # Auth, Job, Analysis, Admin, Report
│   │   ├── middleware/           # JWT Auth, Admin RBAC, Error Handler
│   │   ├── models/               # User, JobPost, Analysis, FraudIndicator, SavedAnalysis, ModelMetric, Report
│   │   ├── services/             # MLClient, DemoFraudEngine, SeedService
│   │   └── server.ts             # Express Server Entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── ml-service/                   # FastAPI Python ML Microservice
│   ├── app/
│   │   ├── models/               # Saved joblib classifiers & metrics.json
│   │   ├── preprocessing/        # Text cleaner & linguistic feature extractor
│   │   ├── prediction/           # Predictor, explainability, rule engine
│   │   ├── training/             # EMSCAD dataset generator & train.py pipeline
│   │   ├── schemas.py            # Pydantic Schemas
│   │   └── main.py               # FastAPI App
│   └── requirements.txt
│
├── docs/                         # Academic & Technical Documentation
│   ├── Architecture.md           # System Architecture & Component Interactions
│   ├── ML_Methodology.md         # TF-IDF, Classifiers & Risk Scoring Formulas
│   ├── API_Spec.md               # REST Endpoints Specification
│   └── Viva_QnA_Guide.md         # 25+ Viva / Review Defense Questions & Answers
│
├── .env.example                  # Root Environment Template
└── README.md                     # Master Documentation
```

---

## ⚖️ Decision-Support Disclaimer

**SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate. Users should independently verify employers through trusted sources and should never make payments or share sensitive personal information solely based on a SafeHire result.**
