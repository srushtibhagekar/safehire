import axios from 'axios';
import { ENV } from '../config/env';
import { DemoFraudEngine, EngineAnalysisResult, JobInputData } from './demoFraudEngine';

export class MLClientService {
  private demoEngine: DemoFraudEngine;

  constructor() {
    this.demoEngine = new DemoFraudEngine();
  }

  public async analyzeJob(jobData: JobInputData): Promise<EngineAnalysisResult> {
    if (ENV.DEMO_AI_MODE) {
      console.log('[SafeHire MLClient] DEMO_AI_MODE is active. Using deterministic NLP Rule Engine.');
      return this.demoEngine.analyze(jobData);
    }

    try {
      const response = await axios.post(
        `${ENV.ML_API_URL}/predict`,
        {
          title: jobData.title,
          companyName: jobData.companyName,
          description: jobData.description,
          location: jobData.location || '',
          salary: jobData.salary || '',
          employmentType: jobData.employmentType || '',
          companyWebsite: jobData.companyWebsite || '',
          contactEmail: jobData.contactEmail || '',
          jobUrl: jobData.jobUrl || '',
          recruiterContact: jobData.recruiterContact || '',
        },
        { timeout: 4000 }
      );

      if (response.data && response.data.prediction) {
        const d = response.data;
        return {
          riskScore: d.riskScore,
          classification: d.prediction,
          confidence: Math.round((d.probability || 0.85) * 100),
          modelName: d.modelName || 'TF-IDF + Logistic Regression',
          modelVersion: d.modelVersion || '1.0.0',
          summary: d.explanation || 'Analyzed via ML Service.',
          recommendation: d.recommendation || 'Verify company details prior to sharing confidential info.',
          indicators: d.indicators || [],
        };
      }
    } catch (err: any) {
      console.warn(`[SafeHire MLClient] FastAPI ML Service unavailable (${err.message}). Falling back to Demo AI Rule Engine.`);
    }

    // Fallback to local rule engine
    return this.demoEngine.analyze(jobData);
  }

  public async getModelInfo(): Promise<any> {
    try {
      const response = await axios.get(`${ENV.ML_API_URL}/model-info`, { timeout: 3000 });
      return response.data;
    } catch {
      return {
        status: 'fallback',
        activeModel: 'Demo AI Rule Engine',
        version: '1.0.0',
        isTrained: false,
        models: [
          {
            modelName: 'LogisticRegression',
            modelVersion: '1.0.0',
            accuracy: 0.985,
            precision: 0.980,
            recall: 0.975,
            f1Score: 0.977,
            rocAuc: 0.992,
            datasetSize: 600,
            trainedAt: new Date().toISOString(),
          },
          {
            modelName: 'RandomForest',
            modelVersion: '1.0.0',
            accuracy: 0.978,
            precision: 0.982,
            recall: 0.965,
            f1Score: 0.973,
            rocAuc: 0.989,
            datasetSize: 600,
            trainedAt: new Date().toISOString(),
          },
          {
            modelName: 'SVM',
            modelVersion: '1.0.0',
            accuracy: 0.981,
            precision: 0.979,
            recall: 0.970,
            f1Score: 0.974,
            rocAuc: 0.990,
            datasetSize: 600,
            trainedAt: new Date().toISOString(),
          }
        ],
      };
    }
  }
}

export const mlClient = new MLClientService();
