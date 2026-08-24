import re
from typing import Dict, Any, List, Tuple
from app.preprocessing.cleaner import extract_metadata_stats
from app.preprocessing.feature_extractor import LinguisticFeatureExtractor

class RuleBasedFraudEngine:
    """
    Deterministic rule-based fraud detection engine.
    Used for explainable feature attribution, demo mode, and baseline risk scoring.
    """
    
    def __init__(self):
        self.extractor = LinguisticFeatureExtractor()
        
    def analyze(self, job_data: Dict[str, Any]) -> Tuple[int, List[Dict[str, str]], str, str]:
        """
        Analyzes job posting attributes and content.
        Returns:
            - risk_score: 0 to 100
            - indicators: list of fraud indicator dicts
            - explanation: human readable summary
            - recommendation: actionable guidance checklist
        """
        title = job_data.get("title", "")
        company = job_data.get("companyName", "")
        desc = job_data.get("description", "")
        salary = job_data.get("salary", "")
        website = job_data.get("companyWebsite", "")
        email = job_data.get("contactEmail", "")
        recruiter = job_data.get("recruiterContact", "")
        emp_type = job_data.get("employmentType", "")
        
        indicators: List[Dict[str, str]] = []
        base_score = 10 # Baseline low risk
        
        # 1. Feature Extraction
        features = self.extractor.extract_features(
            title=title,
            company=company,
            description=desc,
            salary=salary,
            companyWebsite=website,
            contactEmail=email,
            recruiterContact=recruiter
        )
        stats = extract_metadata_stats(title, company, desc, salary=salary)
        
        # 2. Payment & Upfront Fees (Critical Severity)
        if features["payment_hits"]:
            hits_str = ", ".join(features["payment_hits"][:3])
            base_score += 45
            indicators.append({
                "type": "PAYMENT_REQUEST",
                "severity": "CRITICAL",
                "title": "Upfront Payment or Financial Request Detected",
                "explanation": "Legitimate employers never require job seekers to pay registration fees, application charges, or provide banking details before formal employment.",
                "evidence": f"Detected phrases: {hits_str}"
            })
            
        # 3. Urgency & Instant Offers (High Severity)
        if features["urgency_hits"]:
            hits_str = ", ".join(features["urgency_hits"][:3])
            base_score += 25
            indicators.append({
                "type": "URGENCY_LANGUAGE",
                "severity": "HIGH",
                "title": "High-Pressure Urgency or Guaranteed Income Claims",
                "explanation": "Fraudulent postings frequently use high-pressure tactics ('immediate joining', 'no interview', 'guaranteed income') to bypass critical evaluation.",
                "evidence": f"Detected phrases: {hits_str}"
            })
            
        # 4. Informal Recruiter Communication Channels (Medium / High Severity)
        if features["chat_hits"]:
            hits_str = ", ".join(features["chat_hits"][:2])
            base_score += 20
            indicators.append({
                "type": "UNOFFICIAL_COMMUNICATION",
                "severity": "HIGH",
                "title": "Off-Platform / Encrypted Chat Channels",
                "explanation": "Redirecting candidates to Telegram or WhatsApp for job interviews is a major indicator of recruitment impersonation schemes.",
                "evidence": f"Detected channel references: {hits_str}"
            })
            
        # 5. Free / Inconsistent Email Domain (Medium Severity)
        if features["is_free_email"]:
            domain = email.split('@')[-1] if '@' in email else 'public email'
            base_score += 18
            indicators.append({
                "type": "FREE_EMAIL_DOMAIN",
                "severity": "MEDIUM",
                "title": "Free Public Email Used for Corporate Hiring",
                "explanation": "The recruiter contact uses a free email provider rather than a verified corporate business domain.",
                "evidence": f"Recruiter contact domain: @{domain}"
            })
            
        # 6. Unrealistic Salary / Compensation Pattern (High Severity)
        salary_lower = salary.lower()
        desc_lower = desc.lower()
        if any(term in salary_lower or term in desc_lower for term in ['$5000/week', '$5,000/week', '$1000/day', '$1,000/day', '$100/hour entry', '$150/hr data entry', '$80/hr data entry']):
            base_score += 25
            indicators.append({
                "type": "UNREALISTIC_COMPENSATION",
                "severity": "HIGH",
                "title": "Unrealistically High Compensation for Role",
                "explanation": "Compensation figures significantly exceed industry standard benchmarks for the stated entry-level or administrative role.",
                "evidence": f"Salary listing: {salary if salary else 'Disproportionate hourly claim in description'}"
            })
            
        # 7. Low Description Quality or Excessive Caps / Exclamations (Low Severity)
        if stats["caps_ratio"] > 0.25 and stats["char_length"] > 100:
            base_score += 12
            indicators.append({
                "type": "EXCESSIVE_CAPITALIZATION",
                "severity": "LOW",
                "title": "Unprofessional Text Formatting & Excessive Caps",
                "explanation": "Post contains an unusually high ratio of capital letters and informal formatting atypical of verified recruitment notices.",
                "evidence": f"Caps ratio: {int(stats['caps_ratio'] * 100)}% of total description length"
            })
            
        if stats["word_count"] < 35:
            base_score += 10
            indicators.append({
                "type": "VAGUE_DESCRIPTION",
                "severity": "MEDIUM",
                "title": "Extremely Vague Job Description",
                "explanation": "The posting lacks detailed role requirements, team structure, or clear responsibilities.",
                "evidence": f"Only {stats['word_count']} words provided in description"
            })
            
        # 8. Missing Company Details (Low / Medium Severity)
        if not website and not email and not features["has_contact"]:
            base_score += 15
            indicators.append({
                "type": "MISSING_VERIFICATION_DETAILS",
                "severity": "MEDIUM",
                "title": "Missing Company Contact & Verification Data",
                "explanation": "No official website or verifiable contact details provided to authenticate the hiring entity.",
                "evidence": "No website URL or official contact specified"
            })
            
        # 9. Suspicious Web Domain
        if features["has_suspicious_domain"]:
            base_score += 20
            indicators.append({
                "type": "SUSPICIOUS_DOMAIN",
                "severity": "HIGH",
                "title": "High-Risk Domain Extension",
                "explanation": "The company website uses top-level domain extensions frequently associated with disposable scam hosting.",
                "evidence": f"Website: {website}"
            })

        # Cap score between 5 and 99
        risk_score = min(98, max(5, base_score))
        
        # If no indicators triggered, give clean genuine indicators
        if not indicators:
            risk_score = min(20, risk_score)
            indicators.append({
                "type": "STANDARD_SPECIFICATION",
                "severity": "LOW",
                "title": "Standard Professional Job Description",
                "explanation": "The job description follows typical professional conventions, clear skill requirements, and standard workplace terminology.",
                "evidence": "No red flag keywords or predatory financial requests detected"
            })
            
        # Generate summary and recommendation
        if risk_score >= 60:
            classification = "LIKELY_FRAUDULENT"
            summary = f"This job posting exhibits multiple critical red flags commonly associated with employment scams, including {indicators[0]['title'].lower()}."
            recommendation = "Do NOT apply, transfer funds, or provide sensitive identification/banking documents. Independently contact the company via their official career portal."
        elif risk_score >= 30:
            classification = "NEEDS_CAUTION"
            summary = f"This job posting contains potential warning indicators ({indicators[0]['title'].lower()}) that warrant independent verification before sharing personal information."
            recommendation = "Proceed with caution. Verify the hiring manager on LinkedIn, review the official company website, and ensure no upfront fee is requested."
        else:
            classification = "LIKELY_GENUINE"
            summary = "The job posting aligns with standard hiring practices. No high-risk fraud patterns or predatory recruitment keywords were identified."
            recommendation = "Post appears consistent with standard listings. As standard security practice, never disclose passwords or financial credentials during hiring."
            
        return risk_score, indicators, summary, recommendation
