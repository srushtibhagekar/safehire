import mongoose, { Schema, Document, Types } from 'mongoose';

export type ClassificationType = 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT';

export interface IAnalysis extends Document {
  jobPostId: Types.ObjectId;
  userId?: Types.ObjectId;
  riskScore: number; // 0 to 100
  classification: ClassificationType;
  confidence: number; // 0 to 100 percentage
  modelName: string;
  modelVersion: string;
  summary: string;
  recommendation: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>(
  {
    jobPostId: {
      type: Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    classification: {
      type: String,
      enum: ['LIKELY_GENUINE', 'NEEDS_CAUTION', 'LIKELY_FRAUDULENT'],
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    modelName: {
      type: String,
      default: 'TF-IDF + Logistic Regression',
    },
    modelVersion: {
      type: String,
      default: '1.0.0',
    },
    summary: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
AnalysisSchema.index({ userId: 1 });
AnalysisSchema.index({ jobPostId: 1 });
AnalysisSchema.index({ classification: 1 });
AnalysisSchema.index({ riskScore: 1 });
AnalysisSchema.index({ createdAt: -1 });

export const Analysis = mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
