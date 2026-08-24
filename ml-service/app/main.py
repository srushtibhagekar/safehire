import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

from app.schemas import JobPredictRequest, JobPredictResponse, ModelInfoResponse, ModelMetricItem
from app.prediction.predictor import FraudPredictor
from app.training.train import train_all_models

app = FastAPI(
    title="SafeHire AI Recruitment Fraud Detection Service",
    description="NLP and Machine Learning service for analyzing recruitment fraud indicators, risk scoring, and text features.",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = FraudPredictor(models_dir="app/models")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "SafeHire ML Service",
        "version": "1.0.0",
        "modelLoaded": predictor.model is not None
    }

@app.get("/model-info", response_model=ModelInfoResponse)
def get_model_info():
    metrics_path = "app/models/model_metrics.json"
    is_trained = os.path.exists(metrics_path) and (predictor.model is not None)
    
    models_data = []
    if os.path.exists(metrics_path):
        try:
            with open(metrics_path, "r") as f:
                raw_list = json.load(f)
                for item in raw_list:
                    models_data.append(ModelMetricItem(**item))
        except Exception as e:
            print(f"[SafeHire ML] Failed to read metrics file: {e}")
            
    return ModelInfoResponse(
        status="ready" if is_trained else "untrained",
        activeModel="TF-IDF + Logistic Regression",
        version="1.0.0",
        isTrained=is_trained,
        models=models_data
    )

@app.post("/predict", response_model=JobPredictResponse)
def predict_job(payload: JobPredictRequest):
    try:
        data_dict = payload.model_dump()
        result = predictor.predict(data_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/train")
def trigger_training():
    try:
        metrics = train_all_models(models_dir="app/models")
        # Reload artifacts in predictor
        predictor._load_artifacts()
        return {
            "status": "success",
            "message": "Models trained successfully.",
            "metrics": metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Training error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
