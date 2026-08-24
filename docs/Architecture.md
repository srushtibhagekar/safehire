# SafeHire — System Architecture Document

## 1. High-Level Architecture Overview

SafeHire is built upon a resilient, modular, and decoupled multi-tier architecture designed for high scalability, fault tolerance, and security.

```text
┌─────────────────────────────────────────────────────────────┐
│                      Client Tier                            │
│  React 18 + TypeScript + Vite + Tailwind CSS + Recharts     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST (JWT Bearer)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway & Backend                     │
│  Express.js (TypeScript) + Helmet + Rate Limiter + Mongoose │
│  - Authentication (bcrypt + JWT)                            │
│  - RBAC Middleware (USER vs ADMIN)                          │
│  - Orchestration & Resilient Fallback Engine                │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌─────────────────────────────┐
│        Database Tier         │ │       ML Service Tier       │
│  MongoDB Atlas               │ │  FastAPI Python Service     │
│  - User, JobPost, Analysis   │ │  - Text Cleaner & NLP Token │
│  - FraudIndicator, Report    │ │  - TF-IDF Vectorizer        │
│  - ModelMetric, SavedAnalysis│ │  - Logistic Regression / RF │
└──────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Component Design & Responsibility

### 2.1 Web Frontend (`frontend/`)
- **Technology**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Recharts.
- **Role**: Delivers an interactive, cybersecurity-themed user experience for job submission, multi-step progress animation, Explainable AI visualizer, SVG risk gauge, and admin telemetry dashboards.
- **State Management**: React Context (`AuthContext`, `ThemeContext`) with local storage token persistence.

### 2.2 API Server (`backend/`)
- **Technology**: Node.js, Express, TypeScript, Mongoose ODM, JWT, bcrypt.
- **Security Middlewares**:
  - `Helmet`: Sets HTTP security headers (CSP, X-Frame-Options, HSTS).
  - `CORS`: Restricts cross-origin resource sharing.
  - `express-rate-limit`: Prevents brute-force attacks and abuse.
  - `RBAC Middleware`: Strict server-side route guards ensuring normal users cannot access administrative endpoints (`/api/admin/*`).
- **Resilience Engine**: Communicates with the Python ML microservice via HTTP; if the ML service is offline or `DEMO_AI_MODE=true` is enabled, the backend seamlessly falls back to the internal TypeScript rule-engine without throwing uncaught exceptions.

### 2.3 Machine Learning Microservice (`ml-service/`)
- **Technology**: Python 3.13, FastAPI, Uvicorn, scikit-learn, pandas, numpy, joblib.
- **Pipeline**:
  1. Input sanitization and HTML tag stripping.
  2. Statistical NLP feature extraction (uppercase ratios, punctuation count, payment keywords, urgency phrases, encrypted chat handles).
  3. Sublinear TF-IDF bi-gram vectorization.
  4. Probabilistic inference via trained Logistic Regression model (with comparative benchmarks against Random Forest and SVM).
  5. Calibrated risk scoring and Explainable AI indicator synthesis.

### 2.4 Database Schema (`MongoDB`)
- **User**: User credentials, role (`USER` | `ADMIN`), hashed passwords, activation status.
- **JobPost**: Evaluated job metadata (Title, Company, Description, Salary, Location, Recruiter handles).
- **Analysis**: Final risk score (0-100), classification tag, AI confidence, executive summary, recommendation.
- **FraudIndicator**: Atomized warning signals with severity (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), title, explanation, and evidence quotation.
- **SavedAnalysis**: Bookmarked analyses for candidates.
- **ModelMetric**: Academic benchmark evaluations (Accuracy, Precision, Recall, F1, ROC-AUC, Confusion Matrix).
- **Report**: Unique audit verification codes (`SH-YYYY-XXXXXX`) and timestamp metadata.
