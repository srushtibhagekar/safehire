import api from './api';
import { Analysis, SavedAnalysisItem } from '../types/analysis';

export interface AnalyzePayload {
  title: string;
  companyName: string;
  description: string;
  location?: string;
  salary?: string;
  employmentType?: string;
  companyWebsite?: string;
  contactEmail?: string;
  jobUrl?: string;
  recruiterContact?: string;
}

export const analysisService = {
  async analyze(data: AnalyzePayload): Promise<{ success: boolean; analysis: Analysis }> {
    const res = await api.post('/analyze', data);
    return res.data;
  },

  async getAnalyses(params?: { page?: number; limit?: number; classification?: string; search?: string }): Promise<{
    success: boolean;
    data: Analysis[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const res = await api.get('/analyses', { params });
    return res.data;
  },

  async getAnalysisById(id: string): Promise<{ success: boolean; analysis: Analysis }> {
    const res = await api.get(`/analyses/${id}`);
    return res.data;
  },

  async deleteAnalysis(id: string): Promise<{ success: boolean; message: string }> {
    const res = await api.delete(`/analyses/${id}`);
    return res.data;
  },

  async saveAnalysis(analysisId: string): Promise<{ success: boolean; message: string }> {
    const res = await api.post(`/saved/${analysisId}`);
    return res.data;
  },

  async unsaveAnalysis(analysisId: string): Promise<{ success: boolean; message: string }> {
    const res = await api.delete(`/saved/${analysisId}`);
    return res.data;
  },

  async getSavedAnalyses(): Promise<{ success: boolean; data: SavedAnalysisItem[] }> {
    const res = await api.get('/saved');
    return res.data;
  },

  async getReport(analysisId: string): Promise<{ success: boolean; report: any }> {
    const res = await api.get(`/reports/${analysisId}`);
    return res.data;
  }
};
