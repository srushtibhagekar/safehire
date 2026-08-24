import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IJobPost extends Document {
  userId?: Types.ObjectId;
  title: string;
  companyName: string;
  description: string;
  location?: string;
  employmentType?: string;
  salary?: string;
  companyWebsite?: string;
  contactEmail?: string;
  jobUrl?: string;
  recruiterContact?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostSchema = new Schema<IJobPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    employmentType: {
      type: String,
      trim: true,
      default: 'Full-time',
    },
    salary: {
      type: String,
      trim: true,
      default: '',
    },
    companyWebsite: {
      type: String,
      trim: true,
      default: '',
    },
    contactEmail: {
      type: String,
      trim: true,
      default: '',
    },
    jobUrl: {
      type: String,
      trim: true,
      default: '',
    },
    recruiterContact: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
JobPostSchema.index({ userId: 1 });
JobPostSchema.index({ companyName: 1 });
JobPostSchema.index({ createdAt: -1 });

export const JobPost = mongoose.model<IJobPost>('JobPost', JobPostSchema);
