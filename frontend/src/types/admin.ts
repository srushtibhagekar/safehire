export interface AdminStats {
  totalUsers: number;
  totalAnalyses: number;
  genuineCount: number;
  cautionCount: number;
  fraudCount: number;
  averageRiskScore: number;
  fraudRatio: number;
}

export interface AdminCharts {
  distribution: { name: string; value: number; color: string }[];
  riskRanges: { range: string; count: number }[];
  topIndicators: { type: string; count: number; severity: string }[];
  trends: { _id: string; total: number; fraud: number; genuine: number }[];
}

export interface ModelMetricData {
  _id?: string;
  modelName: string;
  modelVersion: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc?: number;
  confusionMatrix?: number[][];
  datasetSize: number;
  trainedAt: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  scanCount: number;
}
