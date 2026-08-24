from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class JobPredictRequest(BaseModel):
    title: str = Field(..., min_length=1, description="Job title")
    companyName: str = Field(..., min_length=1, description="Company name")
    description: str = Field(..., min_length=1, description="Full job description")
    location: Optional[str] = ""
    salary: Optional[str] = ""
    employmentType: Optional[str] = ""
    companyWebsite: Optional[str] = ""
    contactEmail: Optional[str] = ""
    jobUrl: Optional[str] = ""
    recruiterContact: Optional[str] = ""

class FraudIndicatorItem(BaseModel):
    type: str
    severity: str # LOW, MEDIUM, HIGH, CRITICAL
    title: str
    explanation: str
    evidence: Optional[str] = ""

class JobPredictResponse(BaseModel):
    prediction: str # genuine, caution, fraudulent
    probability: float
    riskScore: int # 0-100
    modelName: str
    modelVersion: str
    indicators: List[FraudIndicatorItem]
    explanation: str
    recommendation: str
    features: Optional[Dict[str, Any]] = None

class ModelMetricItem(BaseModel):
    modelName: str
    modelVersion: str
    accuracy: float
    precision: float
    recall: float
    f1Score: float
    rocAuc: Optional[float] = None
    confusionMatrix: Optional[List[List[int]]] = None
    datasetSize: int
    trainedAt: str

class ModelInfoResponse(BaseModel):
    status: str
    activeModel: str
    version: str
    isTrained: bool
    models: List[ModelMetricItem]
