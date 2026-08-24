from typing import List, Dict, Any

def generate_detailed_explanation(
    prediction: str,
    probability: float,
    risk_score: int,
    indicators: List[Dict[str, str]],
    model_name: str
) -> Dict[str, Any]:
    """
    Synthesizes ML model prediction and extracted fraud indicators
    into a cohesive, defensible Explainable AI report.
    """
    
    critical_count = sum(1 for ind in indicators if ind.get("severity") == "CRITICAL")
    high_count = sum(1 for ind in indicators if ind.get("severity") == "HIGH")
    medium_count = sum(1 for ind in indicators if ind.get("severity") == "MEDIUM")
    low_count = sum(1 for ind in indicators if ind.get("severity") == "LOW")
    
    key_findings = [ind["title"] for ind in indicators if ind.get("severity") in ["CRITICAL", "HIGH"]]
    if not key_findings:
        key_findings = [ind["title"] for ind in indicators[:2]]
        
    return {
        "modelName": model_name,
        "modelVersion": "1.0.0",
        "severityBreakdown": {
            "critical": critical_count,
            "high": high_count,
            "medium": medium_count,
            "low": low_count
        },
        "keyFindings": key_findings,
        "disclaimer": "SafeHire provides decision-support risk scoring based on NLP and statistical pattern recognition. This does not constitute legal proof of legitimacy or fraud."
    }
