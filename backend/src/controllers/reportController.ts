import { Request, Response } from 'express';
import { Analysis } from '../models/Analysis';
import { FraudIndicator } from '../models/FraudIndicator';
import { Report } from '../models/Report';

export const getReportByAnalysisId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { analysisId } = req.params;
    const analysis = await Analysis.findById(analysisId).populate('jobPostId').populate('userId', 'name email');

    if (!analysis) {
      res.status(404).json({ success: false, message: 'Analysis not found.' });
      return;
    }

    const indicators = await FraudIndicator.find({ analysisId });

    // Generate or retrieve unique report code
    let report = await Report.findOne({ analysisId });
    if (!report) {
      const code = `SH-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      report = await Report.create({
        analysisId: analysis._id,
        userId: analysis.userId?._id,
        reportCode: code,
        format: 'HTML',
      });
    }

    res.json({
      success: true,
      report: {
        reportCode: report.reportCode,
        generatedAt: report.createdAt,
        analysis: {
          id: analysis._id,
          riskScore: analysis.riskScore,
          classification: analysis.classification,
          confidence: analysis.confidence,
          modelName: analysis.modelName,
          modelVersion: analysis.modelVersion,
          summary: analysis.summary,
          recommendation: analysis.recommendation,
          createdAt: analysis.createdAt,
        },
        jobPost: analysis.jobPostId,
        indicators,
        disclaimer: 'SafeHire provides an automated risk assessment and is not a legal or definitive verification service. A high-risk score does not conclusively prove fraud, and a low-risk score does not guarantee that a job is legitimate. Users should independently verify employers through trusted sources and should never make payments or share sensitive personal information solely based on a SafeHire result.',
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
