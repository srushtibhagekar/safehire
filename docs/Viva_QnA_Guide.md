# SafeHire — Final-Year Project Viva & Defense Guide

This guide contains essential technical questions and model answers for project evaluation, external viva examiners, and academic reviews.

---

### Q1: What is the core problem statement of SafeHire?
**Answer**: SafeHire solves the growing problem of recruitment fraud and employment scams. Fake job advertisements mimic genuine corporate positions to steal personal identification, demand upfront payments, or execute counterfeit check frauds. SafeHire provides an intelligent decision-support system utilizing NLP and Machine Learning to detect deceptive signals, calculate a 0–100 risk score, and provide explainable evidence before candidates apply.

---

### Q2: Why is TF-IDF + Logistic Regression chosen as the primary baseline model?
**Answer**: 
1. **Calibrated Probabilistic Output**: Logistic Regression outputs well-calibrated probabilities via the Sigmoid function, which cleanly maps into our 0–100 risk score.
2. **Interpretability & Explainability**: Linear model weights allow clear inspection of feature importances, avoiding opaque black-box decisions.
3. **Inference Latency**: TF-IDF + Logistic Regression evaluates raw job postings in under 10 milliseconds, making real-time analysis seamless.

---

### Q3: How do you handle cases where an adversarial scam posting tries to evade ML detection?
**Answer**: SafeHire uses a **Hybrid Inference Architecture**. In addition to statistical ML probability (60% weight), it incorporates a deterministic NLP rule-engine (40% weight) that checks for critical red flags (e.g. upfront wire fees, gift card purchases, Telegram redirects). If a Critical severity indicator is found, the system elevates the risk score directly to protect the candidate.

---

### Q4: What are the three risk classification thresholds?
**Answer**:
- **0 – 29: Likely Genuine**: Professional phrasing, standard skill requirements, verified business domain, no upfront payment keywords.
- **30 – 59: Needs Caution**: Ambiguous details, free public email (@gmail/@yahoo) used for enterprise recruitment, missing official website.
- **60 – 100: Likely Fraudulent**: Demands for registration fees, off-platform encrypted chat handles, high-pressure urgency ("start today"), or unrealistic compensation claims.

---

### Q5: How is Explainable AI (XAI) implemented in SafeHire?
**Answer**: Rather than returning a single classification number, SafeHire generates atomized **Fraud Indicators** that include:
1. Signal Type (e.g. `PAYMENT_REQUEST`, `UNOFFICIAL_COMMUNICATION`).
2. Severity Level (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
3. Plain-English explanation of why this pattern is dangerous.
4. Quoted textual evidence extracted directly from the candidate's input.

---

### Q6: How does the system ensure security and Role-Based Access Control (RBAC)?
**Answer**:
- **Authentication**: Passwords are encrypted using `bcryptjs` with salt rounds ($10$). Session identity is established with signed JSON Web Tokens (JWT).
- **Authorization**: Express middleware inspects decoded JWT claims (`req.user.role`). If a standard user attempts to call `/api/admin/*`, the server returns `403 Forbidden` regardless of client-side routing.
- **Defensive Headers**: `Helmet` configures HTTP protection headers (CSP, X-Frame-Options, HSTS).
- **Rate Limiting**: `express-rate-limit` prevents brute-force login and spamming attempts.

---

### Q7: What dataset was used for training and model evaluation?
**Answer**: SafeHire is modeled after patterns from the **EMSCAD (Employment Scam Aegean Dataset)** research benchmark. Synthetic and augmented data distributions reflecting genuine enterprise job specs, ambiguous listings, and high-pressure advance-fee scams are used to evaluate Logistic Regression, Random Forest, and SVM models with Confusion Matrix and ROC-AUC metrics.

---

### Q8: What is the purpose of Demo AI Mode (`DEMO_AI_MODE=true`)?
**Answer**: When deploying in environments where the Python FastAPI service is offline or dependencies are not installed, the Node.js backend seamlessly executes the embedded deterministic NLP rule engine. The application transparently displays `"Demo AI Mode"` rather than fabricating false ML metrics.

---

### Q9: Why is SafeHire categorized as a "Decision-Support System"?
**Answer**: In cybersecurity and academic ethics, automated AI should never claim absolute certainty of fraud, as legitimate small companies might occasionally use Gmail. SafeHire provides risk probability scores, warnings, and recommended verification checklists, empowering users to make informed, safe career decisions.

---

### Q10: How does MongoDB support the data architecture?
**Answer**: Mongoose schemas cleanly model relational entity structures with document flexibility:
- `JobPost` stores raw user submissions.
- `Analysis` references `JobPost` and `User` with indexed `riskScore` and `classification`.
- `FraudIndicator` records 1-to-many granular red flags for each scan.
- `ModelMetric` stores historical training benchmarks for administrator transparency.
