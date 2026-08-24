import api from './api';
import { AuthResponse, User } from '../types/auth';

export const authService = {
  async register(data: { name: string; email: string; password: string; role?: string }): Promise<AuthResponse> {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  async getMe(): Promise<{ success: boolean; user: User }> {
    const res = await api.get('/auth/me');
    return res.data;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  async updateProfile(data: { name?: string; avatar?: string; newPassword?: string }): Promise<{ success: boolean; user: User }> {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },

  logout(): void {
    localStorage.removeItem('safehire_token');
    localStorage.removeItem('safehire_user');
  }
};
