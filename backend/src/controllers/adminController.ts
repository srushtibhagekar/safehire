import { Request, Response } from 'express';
import axios from 'axios';
import { User } from '../models/User';
import { JobPost } from '../models/JobPost';
import { Analysis } from '../models/Analysis';
import { FraudIndicator } from '../models/FraudIndicator';
import { ModelMetric } from '../models/ModelMetric';
import { ENV } from '../config/env';

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [totalUsers, totalAnalyses, genuineCount, cautionCount, fraudCount] = await Promise.all([
      User.countDocuments(),
      Analysis.countDocuments(),
      Analysis.countDocuments({ classification: 'LIKELY_GENUINE' }),
      Analysis.countDocuments({ classification: 'NEEDS_CAUTION' }),
      Analysis.countDocuments({ classification: 'LIKELY_FRAUDULENT' }),
    ]);

    // Calculate Average Risk Score
    const avgScoreResult = await Analysis.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$riskScore' } } },
    ]);
    const averageRiskScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

    // Risk Score Histogram (0-20, 21-40, 41-60, 61-80, 81-100)
    const riskRanges = [
      { range: '0-20 (Very Low)', count: await Analysis.countDocuments({ riskScore: { $gte: 0, $lte: 20 } }) },
      { range: '21-40 (Low/Moderate)', count: await Analysis.countDocuments({ riskScore: { $gt: 20, $lte: 40 } }) },
      { range: '41-60 (Suspicious)', count: await Analysis.countDocuments({ riskScore: { $gt: 40, $lte: 60 } }) },
      { range: '61-80 (High Risk)', count: await Analysis.countDocuments({ riskScore: { $gt: 60, $lte: 80 } }) },
      { range: '81-100 (Critical Scam)', count: await Analysis.countDocuments({ riskScore: { $gt: 80, $lte: 100 } }) },
    ];

    // Indicator Frequency Aggregation
    const topIndicators = await FraudIndicator.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 }, severity: { $first: '$severity' } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    // 7-day Analysis Trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const trendAgg = await Analysis.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: 1 },
          fraud: {
            $sum: { $cond: [{ $eq: ['$classification', 'LIKELY_FRAUDULENT'] }, 1, 0] },
          },
          genuine: {
            $sum: { $cond: [{ $eq: ['$classification', 'LIKELY_GENUINE'] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalAnalyses,
        genuineCount,
        cautionCount,
        fraudCount,
        averageRiskScore,
        fraudRatio: totalAnalyses > 0 ? Math.round((fraudCount / totalAnalyses) * 100) : 0,
      },
      charts: {
        distribution: [
          { name: 'Likely Genuine', value: genuineCount, color: '#10B981' },
          { name: 'Needs Caution', value: cautionCount, color: '#F59E0B' },
          { name: 'Likely Fraudulent', value: fraudCount, color: '#EF4444' },
        ],
        riskRanges,
        topIndicators: topIndicators.map((ti) => ({
          type: ti._id,
          count: ti.count,
          severity: ti.severity,
        })),
        trends: trendAgg,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const search = req.query.search as string;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      User.countDocuments(query),
    ]);

    // Attach analysis count per user
    const usersWithStats = await Promise.all(
      users.map(async (u) => {
        const scanCount = await Analysis.countDocuments({ userId: u._id });
        return {
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          avatar: u.avatar,
          isActive: u.isActive,
          createdAt: u.createdAt,
          scanCount,
        };
      })
    );

    res.json({
      success: true,
      data: usersWithStats,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User account has been ${user.isActive ? 'activated' : 'deactivated'}.`,
      user: {
        id: user._id,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const [analyses, total] = await Promise.all([
      Analysis.find()
        .populate('jobPostId')
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Analysis.countDocuments(),
    ]);

    res.json({
      success: true,
      data: analyses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getModelMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    let metrics = await ModelMetric.find().sort({ trainedAt: -1 });

    // If none in DB, try to fetch from FastAPI ML service or fallback seed
    if (metrics.length === 0) {
      try {
        const mlRes = await axios.get(`${ENV.ML_API_URL}/model-info`, { timeout: 2000 });
        if (mlRes.data && mlRes.data.models && mlRes.data.models.length > 0) {
          for (const m of mlRes.data.models) {
            await ModelMetric.create({
              modelName: m.modelName,
              modelVersion: m.modelVersion,
              accuracy: m.accuracy,
              precision: m.precision,
              recall: m.recall,
              f1Score: m.f1Score,
              rocAuc: m.rocAuc || 0,
              confusionMatrix: m.confusionMatrix || [[0, 0], [0, 0]],
              datasetSize: m.datasetSize,
              trainedAt: m.trainedAt,
            });
          }
          metrics = await ModelMetric.find().sort({ trainedAt: -1 });
        }
      } catch {
        // Will return empty if not found
      }
    }

    res.json({
      success: true,
      metrics,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const retrainModels = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post(`${ENV.ML_API_URL}/train`, {}, { timeout: 30000 });
    if (response.data && response.data.metrics) {
      for (const m of response.data.metrics) {
        await ModelMetric.create({
          modelName: m.modelName,
          modelVersion: m.modelVersion,
          accuracy: m.accuracy,
          precision: m.precision,
          recall: m.recall,
          f1Score: m.f1Score,
          rocAuc: m.rocAuc || 0,
          confusionMatrix: m.confusionMatrix,
          datasetSize: m.datasetSize,
          trainedAt: m.trainedAt,
        });
      }
    }

    res.json({
      success: true,
      message: 'Models successfully retrained and evaluated on EMSCAD recruitment benchmark dataset.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to trigger retraining on ML service: ${error.message}`,
    });
  }
};
