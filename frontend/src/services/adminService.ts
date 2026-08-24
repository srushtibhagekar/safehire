import api from './api';
import { AdminStats, AdminCharts, AdminUserItem, ModelMetricData } from '../types/admin';

export const adminService = {
  async getStats(): Promise<{ success: boolean; stats: AdminStats; charts: AdminCharts }> {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  async getUsers(params?: { page?: number; limit?: number; search?: string }): Promise<{
    success: boolean;
    data: AdminUserItem[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const res = await api.get('/admin/users', { params });
    return res.data;
  },

  async toggleUserStatus(userId: string): Promise<{ success: boolean; message: string; user: any }> {
    const res = await api.patch(`/admin/users/${userId}/status`);
    return res.data;
  },

  async getJobs(params?: { page?: number; limit?: number }): Promise<{
    success: boolean;
    data: any[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const res = await api.get('/admin/jobs', { params });
    return res.data;
  },

  async getModelMetrics(): Promise<{ success: boolean; metrics: ModelMetricData[] }> {
    const res = await api.get('/admin/model-metrics');
    return res.data;
  },

  async retrainModels(): Promise<{ success: boolean; message: string }> {
    const res = await api.post('/admin/retrain');
    return res.data;
  }
};
