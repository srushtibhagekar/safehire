import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReport extends Document {
  analysisId: Types.ObjectId;
  userId?: Types.ObjectId;
  reportCode: string;
  format: string; // 'HTML', 'PDF', 'JSON'
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    reportCode: {
      type: String,
      required: true,
      unique: true,
    },
    format: {
      type: String,
      default: 'HTML',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

ReportSchema.index({ analysisId: 1 });
ReportSchema.index({ reportCode: 1 });

export const Report = mongoose.model<IReport>('Report', ReportSchema);
