import { Request, Response } from 'express';
import { z } from 'zod';
import { JobPost } from '../models/JobPost';
import { Analysis } from '../models/Analysis';
import { FraudIndicator } from '../models/FraudIndicator';
import { SavedAnalysis } from '../models/SavedAnalysis';
import { mlClient } from '../services/mlClient';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const analyzeJobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  companyName: z.string().min(1, 'Company name is required'),
  description: z.string().min(15, 'Job description must be at least 15 characters'),
  location: z.string().optional(),
  salary: z.string().optional(),
  employmentType: z.string().optional(),
  companyWebsite: z.string().optional(),
  contactEmail: z.string().optional(),
  jobUrl: z.string().optional(),
  recruiterContact: z.string().optional(),
});

export const analyzeJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const validated = analyzeJobSchema.parse(req.body);
    const userId = req.user?._id;

    // 1. Run AI / NLP Analysis Engine
    const result = await mlClient.analyzeJob(validated);

    // 2. Persist JobPost
    const jobPost = await JobPost.create({
      userId,
      title: validated.title,
      companyName: validated.companyName,
      description: validated.description,
      location: validated.location || '',
      salary: validated.salary || '',
      employmentType: validated.employmentType || 'Full-time',
      companyWebsite: validated.companyWebsite || '',
      contactEmail: validated.contactEmail || '',
      jobUrl: validated.jobUrl || '',
      recruiterContact: validated.recruiterContact || '',
    });

    // 3. Persist Analysis Result
    const analysis = await Analysis.create({
      jobPostId: jobPost._id,
      userId,
      riskScore: result.riskScore,
      classification: result.classification,
      confidence: result.confidence,
      modelName: result.modelName,
      modelVersion: result.modelVersion,
      summary: result.summary,
      recommendation: result.recommendation,
    });

    // 4. Persist Fraud Indicators
    if (result.indicators && result.indicators.length > 0) {
      const indicatorsToInsert = result.indicators.map((ind) => ({
        analysisId: analysis._id,
        type: ind.type,
        severity: ind.severity,
        title: ind.title,
        explanation: ind.explanation,
        evidence: ind.evidence || '',
      }));
      await FraudIndicator.insertMany(indicatorsToInsert);
    }

    const savedIndicators = await FraudIndicator.find({ analysisId: analysis._id });

    res.status(201).json({
      success: true,
      message: 'Job analyzed successfully.',
      analysis: {
        id: analysis._id,
        jobPostId: jobPost._id,
        riskScore: analysis.riskScore,
        classification: analysis.classification,
        confidence: analysis.confidence,
        modelName: analysis.modelName,
        modelVersion: analysis.modelVersion,
        summary: analysis.summary,
        recommendation: analysis.recommendation,
        createdAt: analysis.createdAt,
        jobPost: {
          id: jobPost._id,
          title: jobPost.title,
          companyName: jobPost.companyName,
          description: jobPost.description,
          location: jobPost.location,
          salary: jobPost.salary,
          employmentType: jobPost.employmentType,
          companyWebsite: jobPost.companyWebsite,
          contactEmail: jobPost.contactEmail,
          jobUrl: jobPost.jobUrl,
          recruiterContact: jobPost.recruiterContact,
        },
        indicators: savedIndicators.map((ind) => ({
          id: ind._id,
          type: ind.type,
          severity: ind.severity,
          title: ind.title,
          explanation: ind.explanation,
          evidence: ind.evidence,
        })),
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: error.errors });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalyses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const classification = req.query.classification as string;
    const search = req.query.search as string;

    const query: any = {};

    // Filter by user if not admin or if user route
    if (req.user && req.user.role !== 'ADMIN') {
      query.userId = req.user._id;
    }

    if (classification && classification !== 'ALL') {
      query.classification = classification;
    }

    let analysesQuery = Analysis.find(query)
      .populate('jobPostId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const [analyses, total] = await Promise.all([
      analysesQuery.exec(),
      Analysis.countDocuments(query),
    ]);

    // If search term is present, filter client/query-side for populated job title/company
    let filtered = analyses;
    if (search) {
      const s = search.toLowerCase();
      filtered = analyses.filter((a: any) => {
        const job = a.jobPostId;
        return (
          job &&
          (job.title?.toLowerCase().includes(s) ||
            job.companyName?.toLowerCase().includes(s) ||
            job.description?.toLowerCase().includes(s))
        );
      });
    }

    res.json({
      success: true,
      data: filtered,
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

export const getAnalysisById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const analysis = await Analysis.findById(id).populate('jobPostId');

    if (!analysis) {
      res.status(404).json({ success: false, message: 'Analysis result not found.' });
      return;
    }

    const indicators = await FraudIndicator.find({ analysisId: analysis._id });

    res.json({
      success: true,
      analysis: {
        id: analysis._id,
        jobPostId: analysis.jobPostId?._id,
        userId: analysis.userId,
        riskScore: analysis.riskScore,
        classification: analysis.classification,
        confidence: analysis.confidence,
        modelName: analysis.modelName,
        modelVersion: analysis.modelVersion,
        summary: analysis.summary,
        recommendation: analysis.recommendation,
        createdAt: analysis.createdAt,
        jobPost: analysis.jobPostId,
        indicators,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAnalysis = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const query: any = { _id: id };
    if (req.user && req.user.role !== 'ADMIN') {
      query.userId = req.user._id;
    }

    const analysis = await Analysis.findOne(query);
    if (!analysis) {
      res.status(404).json({ success: false, message: 'Analysis not found or permission denied.' });
      return;
    }

    await Promise.all([
      Analysis.findByIdAndDelete(id),
      FraudIndicator.deleteMany({ analysisId: id }),
      SavedAnalysis.deleteMany({ analysisId: id }),
      JobPost.findByIdAndDelete(analysis.jobPostId),
    ]);

    res.json({ success: true, message: 'Analysis record deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveAnalysis = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required to save results.' });
      return;
    }

    const { analysisId } = req.params;
    const existing = await SavedAnalysis.findOne({
      userId: req.user._id,
      analysisId,
    });

    if (existing) {
      res.json({ success: true, message: 'Analysis already in saved collection.' });
      return;
    }

    await SavedAnalysis.create({
      userId: req.user._id,
      analysisId,
    });

    res.status(201).json({ success: true, message: 'Analysis saved successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unsaveAnalysis = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { analysisId } = req.params;
    await SavedAnalysis.findOneAndDelete({
      userId: req.user._id,
      analysisId,
    });

    res.json({ success: true, message: 'Analysis removed from saved list.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSavedAnalyses = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const saved = await SavedAnalysis.find({ userId: req.user._id })
      .populate({
        path: 'analysisId',
        populate: { path: 'jobPostId' },
      })
      .sort({ createdAt: -1 });

    const results = saved
      .filter((s) => s.analysisId)
      .map((s: any) => ({
        savedId: s._id,
        savedAt: s.createdAt,
        analysis: s.analysisId,
      }));

    res.json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
