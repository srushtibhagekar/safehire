# SafeHire — Machine Learning & NLP Methodology

## 1. Problem Formulation & Task Definition

Recruitment fraud detection is framed as a supervised binary and multi-class classification and risk regression problem:
- **Input**: Natural language job advertisement $T$ and metadata attributes $M = \{\text{Salary}, \text{Location}, \text{Domain}, \text{Contact}\}$.
- **Target Probability**: $P(\text{Fraud} = 1 \mid T, M) \in [0, 1]$.
- **Risk Score Output**: $R \in [0, 100]$.
- **Classification Output**: 
  - $0 \le R < 30 \implies \text{LIKELY\_GENUINE}$
  - $30 \le R < 60 \implies \text{NEEDS\_CAUTION}$
  - $60 \le R \le 100 \implies \text{LIKELY\_FRAUDULENT}$

---

## 2. Text Representation & TF-IDF Vectorization

The raw unstructured job text is preprocessed:
1. Removal of HTML markup and entity decoding.
2. Case folding and whitespace regularization.
3. Stop-word removal (English standard corpus).

We compute Term Frequency-Inverse Document Frequency (TF-IDF) with sublinear term frequency scaling:

$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1$$

- **N-gram Range**: $(1, 2)$ — Uni-grams and Bi-grams (e.g. "registration fee", "instant offer", "start today").
- **Max Features**: 2,500 most informative vocabulary tokens.

---

## 3. Classifier Selection & Benchmark Comparison

We evaluated three candidate architectures on the recruitment fraud dataset (EMSCAD benchmark patterns):

| Algorithm | Primary Strengths | Decision Boundary | Model Role |
| :--- | :--- | :--- | :--- |
| **Logistic Regression (Primary)** | Well-calibrated probabilities via Sigmoid, linear interpretability, rapid inference (<10ms). | Linear Hyperplane | **Primary Inference Engine** |
| **Random Forest** | Non-linear feature interactions, robust to outliers and noisy vocabulary. | Orthogonal Tree Partitions | Comparative Evaluation |
| **Support Vector Machine (SVM)** | Effective in high-dimensional sparse TF-IDF space, max-margin separation. | Linear / Margin Kernel | Comparative Evaluation |

### Logistic Regression Sigmoid Formulation:
$$P(y = 1 \mid x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$

---

## 4. Hybrid Risk Scoring & Explainable AI (XAI) Formula

Statistical ML models can occasionally be vulnerable to evasive adversarial phrasing. To guarantee robustness, SafeHire uses a hybrid ensembling methodology:

$$R = \min\left(98, \max\left(6, \; \alpha \cdot (P_{\text{ML}} \times 100) + (1 - \alpha) \cdot S_{\text{Rule}}\right)\right)$$

Where:
- $\alpha = 0.60$ (60% weight to statistical ML probability).
- $(1 - \alpha) = 0.40$ (40% weight to deterministic rule-based indicators).
- If **Critical Severity** indicators are detected (e.g. upfront wire fees, bank credential demands, encrypted chat recruiters), the engine elevates the risk score: $R = \max(R, S_{\text{Rule}})$.

---

## 5. Explainable Feature Attribution

Instead of delivering opaque black-box predictions, SafeHire atomizes the findings into typed **Fraud Indicators**:
1. `PAYMENT_REQUEST` (Critical): Upfront fee, gift cards, wire transfer, cashier check advance.
2. `URGENCY_LANGUAGE` (High): Artificial pressure tactics ("start today", "immediate joining", "instant offer").
3. `UNOFFICIAL_COMMUNICATION` (High): Telegram, WhatsApp, or Signal channels used for corporate interviewing.
4. `FREE_EMAIL_DOMAIN` (Medium): Free public email addresses (@gmail, @yahoo) representing corporate enterprises.
5. `UNREALISTIC_COMPENSATION` (High): Outsized compensation claims (e.g. $5,000/week for basic data entry).
6. `MISSING_VERIFICATION_DETAILS` (Medium): Unverifiable employers lacking websites or official contact.
