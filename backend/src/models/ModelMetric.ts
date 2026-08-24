import mongoose, { Schema, Document } from 'mongoose';

export interface IModelMetric extends Document {
  modelName: string;
  modelVersion: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc?: number;
  confusionMatrix?: number[][];
  datasetSize: number;
  trainedAt: Date;
}

const ModelMetricSchema = new Schema<IModelMetric>(
  {
    modelName: {
      type: String,
      required: true,
    },
    modelVersion: {
      type: String,
      required: true,
      default: '1.0.0',
    },
    accuracy: {
      type: Number,
      required: true,
    },
    precision: {
      type: Number,
      required: true,
    },
    recall: {
      type: Number,
      required: true,
    },
    f1Score: {
      type: Number,
      required: true,
    },
    rocAuc: {
      type: Number,
      default: 0,
    },
    confusionMatrix: {
      type: [[Number]],
      default: [[0, 0], [0, 0]],
    },
    datasetSize: {
      type: Number,
      required: true,
    },
    trainedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ModelMetricSchema.index({ modelName: 1, trainedAt: -1 });

export const ModelMetric = mongoose.model<IModelMetric>('ModelMetric', ModelMetricSchema);
