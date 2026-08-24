import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISavedAnalysis extends Document {
  userId: Types.ObjectId;
  analysisId: Types.ObjectId;
  createdAt: Date;
}

const SavedAnalysisSchema = new Schema<ISavedAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

SavedAnalysisSchema.index({ userId: 1, analysisId: 1 }, { unique: true });
SavedAnalysisSchema.index({ userId: 1, createdAt: -1 });

export const SavedAnalysis = mongoose.model<ISavedAnalysis>('SavedAnalysis', SavedAnalysisSchema);
