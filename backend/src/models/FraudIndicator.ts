import mongoose, { Schema, Document, Types } from 'mongoose';

export type SeverityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface IFraudIndicator extends Document {
  analysisId: Types.ObjectId;
  type: string;
  severity: SeverityType;
  title: string;
  explanation: string;
  evidence?: string;
  createdAt: Date;
}

const FraudIndicatorSchema = new Schema<IFraudIndicator>(
  {
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    evidence: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes
FraudIndicatorSchema.index({ analysisId: 1 });
FraudIndicatorSchema.index({ type: 1 });
FraudIndicatorSchema.index({ severity: 1 });

export const FraudIndicator = mongoose.model<IFraudIndicator>('FraudIndicator', FraudIndicatorSchema);
