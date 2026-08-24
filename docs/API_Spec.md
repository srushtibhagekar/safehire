# SafeHire — REST API Specification

**Base URL**: `http://localhost:5000/api`

All protected endpoints require the `Authorization` header:
```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 1. Authentication Endpoints

### `POST /auth/register`
Creates a new user account.
- **Request Body**:
```json
{
  "name": "Alex Johnson",
  "email": "user@safehire.io",
  "password": "User@123456",
  "role": "USER"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": {
    "id": "665f...",
    "name": "Alex Johnson",
    "email": "user@safehire.io",
    "role": "USER"
  }
}
```

### `POST /auth/login`
Authenticates existing credentials.
- **Request Body**:
```json
{
  "email": "user@safehire.io",
  "password": "User@123456"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": { ... }
}
```

### `GET /auth/me`
Fetches current session profile. (Protected)

---

## 2. Job Analysis Endpoints

### `POST /analyze`
Submits a job advertisement for NLP & ML risk inspection.
- **Request Body**:
```json
{
  "title": "Data Entry Clerk",
  "companyName": "Fast Careers LLC",
  "description": "Urgent hiring! Earn $5000 weekly. Pay $150 registration fee via Telegram @hiring_hr",
  "location": "Remote",
  "salary": "$5000/week",
  "employmentType": "Remote",
  "companyWebsite": "",
  "contactEmail": "jobs@gmail.com",
  "recruiterContact": "Telegram: @hiring_hr"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "analysis": {
    "id": "665f123...",
    "jobPostId": "665f456...",
    "riskScore": 94,
    "classification": "LIKELY_FRAUDULENT",
    "confidence": 98,
    "modelName": "TF-IDF + Logistic Regression",
    "summary": "Severe recruitment fraud risk...",
    "recommendation": "DO NOT apply or pay fees...",
    "indicators": [
      {
        "type": "PAYMENT_REQUEST",
        "severity": "CRITICAL",
        "title": "Upfront Registration Fee Demanded",
        "explanation": "Legitimate employers never charge candidates.",
        "evidence": "Detected: pay registration fee of $150"
      }
    ]
  }
}
```

### `GET /analyses`
Retrieves paginated scan history. Query parameters:
- `page`: Page index (default: `1`)
- `limit`: Items per page (default: `10`)
- `classification`: `LIKELY_GENUINE` | `NEEDS_CAUTION` | `LIKELY_FRAUDULENT` | `ALL`
- `search`: Search query string

### `GET /analyses/:id`
Retrieves detailed analysis result by ID.

### `DELETE /analyses/:id`
Deletes an analysis record. (Protected)

---

## 3. Saved Analysis Bookmarks

- `POST /saved/:analysisId`: Bookmark an analysis.
- `DELETE /saved/:analysisId`: Remove bookmark.
- `GET /saved`: List saved analyses for current user.

---

## 4. Reports & Certificates

### `GET /reports/:analysisId`
Generates or retrieves the formal timestamped audit certificate with unique verification code (`SH-YYYY-XXXXXX`).

---

## 5. Administration Endpoints (RBAC Protected: ADMIN role only)

- `GET /admin/stats`: Aggregate system telemetry and chart metrics.
- `GET /admin/users`: User directory with scan count and active status.
- `PATCH /admin/users/:id/status`: Toggle user account activation.
- `GET /admin/jobs`: System-wide audit log of all scanned postings.
- `GET /admin/model-metrics`: Model performance metrics (Accuracy, Precision, Recall, F1, ROC-AUC, Confusion Matrix).
- `POST /admin/retrain`: Trigger model retraining on Python FastAPI service.
