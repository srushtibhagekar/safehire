import { JobPost } from './job';

export type ClassificationType = 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT';
export type SeverityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface FraudIndicator {
  id?: string;
  _id?: string;
  type: string;
  severity: SeverityType;
  title: string;
  explanation: string;
  evidence?: string;
  createdAt?: string;
}

export interface Analysis {
  id?: string;
  _id?: string;
  jobPostId?: string | JobPost;
  userId?: string;
  riskScore: number; // 0 - 100
  classification: ClassificationType;
  confidence: number; // 0 - 100
  modelName: string;
  modelVersion: string;
  summary: string;
  recommendation: string;
  jobPost?: JobPost;
  indicators?: FraudIndicator[];
  createdAt: string;
  updatedAt?: string;
}

export interface SavedAnalysisItem {
  savedId: string;
  savedAt: string;
  analysis: Analysis;
}
