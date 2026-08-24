import os
import json
from typing import Dict, Any, List
from app.preprocessing.cleaner import clean_text
from app.prediction.rule_engine import RuleBasedFraudEngine
from app.prediction.ml_engine import CustomTfidfVectorizer, CustomLogisticRegression
from app.schemas import JobPredictResponse, FraudIndicatorItem

class FraudPredictor:
    """
    Inference coordinator combining pure TF-IDF + Logistic Regression ML predictions
    with deterministic linguistic fraud feature extraction and Explainable AI.
    """
    def __init__(self, models_dir: str = "app/models"):
        self.models_dir = models_dir
        self.model: CustomLogisticRegression = None
        self.vectorizer: CustomTfidfVectorizer = None
        self.rule_engine = RuleBasedFraudEngine()
        self._load_artifacts()

    def _load_artifacts(self):
        model_path = os.path.join(self.models_dir, "model.json")
        vec_path = os.path.join(self.models_dir, "vectorizer.json")

        if os.path.exists(model_path) and os.path.exists(vec_path):
            try:
                vec = CustomTfidfVectorizer()
                vec.load(vec_path)
                clf = CustomLogisticRegression()
                clf.load(model_path)
                self.vectorizer = vec
                self.model = clf
                print("[SafeHire ML] Trained TF-IDF vectorizer and Logistic Regression model loaded.")
            except Exception as e:
                print(f"[SafeHire ML] Artifact loading error: {e}")
                self.model = None
                self.vectorizer = None
        else:
            print("[SafeHire ML] Model artifacts not found. Generating initial training artifacts...")
            try:
                from app.training.train import train_all_models
                train_all_models(self.models_dir)
                self._load_artifacts()
            except Exception as e:
                print(f"[SafeHire ML] Auto-training fallback error: {e}")

    def predict(self, job_data: Dict[str, Any]) -> JobPredictResponse:
        title = job_data.get("title", "")
        company = job_data.get("companyName", "")
        description = job_data.get("description", "")
        salary = job_data.get("salary", "")
        emp_type = job_data.get("employmentType", "")

        # 1. Run rule engine
        rule_risk_score, indicators, rule_summary, rule_rec = self.rule_engine.analyze(job_data)

        # 2. Run statistical ML Model
        if self.model is not None and self.vectorizer is not None:
            combined_text = clean_text(f"{title} {company} {description} {salary} {emp_type}")
            vec_matrix = self.vectorizer.transform([combined_text])
            probas = self.model.predict_proba(vec_matrix)[0]
            fraud_prob = float(probas[1])
            ml_risk_score = int(fraud_prob * 100)

            # Check if critical indicators present
            has_critical = any(ind.get("severity") == "CRITICAL" for ind in indicators)
            if has_critical:
                final_risk_score = max(ml_risk_score, rule_risk_score)
            else:
                # 60% ML probability + 40% rule features
                final_risk_score = int(round(0.60 * ml_risk_score + 0.40 * rule_risk_score))

            final_risk_score = min(98, max(6, final_risk_score))
            confidence = int(max(probas) * 100)
            model_name = "TF-IDF + Logistic Regression"
            model_version = "1.0.0"
        else:
            final_risk_score = rule_risk_score
            fraud_prob = round(final_risk_score / 100.0, 2)
            confidence = 86
            model_name = "Rule-Engine NLP Baseline"
            model_version = "1.0.0"

        if final_risk_score >= 60:
            classification = "LIKELY_FRAUDULENT"
        elif final_risk_score >= 30:
            classification = "NEEDS_CAUTION"
        else:
            classification = "LIKELY_GENUINE"

        indicator_items = [
            FraudIndicatorItem(
                type=item["type"],
                severity=item["severity"],
                title=item["title"],
                explanation=item["explanation"],
                evidence=item.get("evidence", "")
            )
            for item in indicators
        ]

        return JobPredictResponse(
            prediction=classification,
            probability=round(fraud_prob, 2),
            riskScore=final_risk_score,
            modelName=model_name,
            modelVersion=model_version,
            indicators=indicator_items,
            explanation=rule_summary,
            recommendation=rule_rec,
            features={
                "titleLength": len(title),
                "descriptionWordCount": len(description.split()),
                "hasSalary": bool(salary),
                "hasWebsite": bool(job_data.get("companyWebsite", ""))
            }
        )
