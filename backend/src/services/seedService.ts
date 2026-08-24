import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { JobPost } from '../models/JobPost';
import { Analysis } from '../models/Analysis';
import { FraudIndicator } from '../models/FraudIndicator';
import { ModelMetric } from '../models/ModelMetric';

export const seedInitialData = async (): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return; // Already seeded
    }

    console.log('[SafeHire Seed] Seeding initial users, baseline models, and demo job analyses...');

    // 1. Create Admin & Demo Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('Admin@123456', salt);
    const userPassword = await bcrypt.hash('User@123456', salt);

    const admin = await User.create({
      name: 'SafeHire Security Admin',
      email: 'admin@safehire.io',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    });

    const user = await User.create({
      name: 'Alex Johnson',
      email: 'user@safehire.io',
      passwordHash: userPassword,
      role: 'USER',
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    });

    // 2. Create Baseline Model Metrics
    await ModelMetric.create([
      {
        modelName: 'LogisticRegression',
        modelVersion: '1.0.0',
        accuracy: 0.985,
        precision: 0.980,
        recall: 0.975,
        f1Score: 0.977,
        rocAuc: 0.992,
        confusionMatrix: [[355, 5], [4, 236]],
        datasetSize: 600,
        trainedAt: new Date(),
      },
      {
        modelName: 'RandomForest',
        modelVersion: '1.0.0',
        accuracy: 0.978,
        precision: 0.982,
        recall: 0.965,
        f1Score: 0.973,
        rocAuc: 0.989,
        confusionMatrix: [[353, 7], [6, 234]],
        datasetSize: 600,
        trainedAt: new Date(),
      },
      {
        modelName: 'SVM',
        modelVersion: '1.0.0',
        accuracy: 0.981,
        precision: 0.979,
        recall: 0.970,
        f1Score: 0.974,
        rocAuc: 0.990,
        confusionMatrix: [[354, 6], [5, 235]],
        datasetSize: 600,
        trainedAt: new Date(),
      },
    ]);

    // 3. Sample 1: LIKELY GENUINE
    const jobGenuine = await JobPost.create({
      userId: user._id,
      title: 'Senior Frontend Engineer (React/TypeScript)',
      companyName: 'Stripe',
      description: 'We are seeking an experienced Frontend Engineer to design and build mission-critical checkout flows used by millions worldwide. You will partner with our product and design teams to deliver high-performance, accessible, and delightful web interfaces. Required: 4+ years of professional React experience, strong TypeScript skills, and experience with modern CSS and state management systems.',
      location: 'San Francisco, CA / Remote',
      employmentType: 'Full-time',
      salary: '$150,000 - $185,000 / year',
      companyWebsite: 'https://stripe.com',
      contactEmail: 'careers@stripe.com',
    });

    const analysisGenuine = await Analysis.create({
      jobPostId: jobGenuine._id,
      userId: user._id,
      riskScore: 12,
      classification: 'LIKELY_GENUINE',
      confidence: 94,
      modelName: 'TF-IDF + Logistic Regression',
      modelVersion: '1.0.0',
      summary: 'The posting follows standard enterprise hiring practices with clear role expectations and verified corporate domain.',
      recommendation: 'Listing appears legitimate. Maintain standard security hygiene and apply via official career portals.',
    });

    await FraudIndicator.create({
      analysisId: analysisGenuine._id,
      type: 'STANDARD_SPECIFICATION',
      severity: 'LOW',
      title: 'Standard Professional Job Description',
      explanation: 'Clear job responsibilities, transparent salary bands, and standard business communication channels.',
      evidence: 'Domain stripe.com aligns with registered enterprise brand',
    });

    // 4. Sample 2: NEEDS CAUTION
    const jobCaution = await JobPost.create({
      userId: user._id,
      title: 'Remote Project Coordinator (Entry Level)',
      companyName: 'Apex Digital Solutions',
      description: 'We are hiring a remote coordinator to handle scheduling and document preparation. Flexible hours, part-time or full-time available. No prior corporate experience strictly required, full training provided. Please email resume to apexjobs2026@gmail.com.',
      location: 'Remote',
      employmentType: 'Part-time',
      salary: '$45 - $55 / hour',
      companyWebsite: '',
      contactEmail: 'apexjobs2026@gmail.com',
    });

    const analysisCaution = await Analysis.create({
      jobPostId: jobCaution._id,
      userId: user._id,
      riskScore: 48,
      classification: 'NEEDS_CAUTION',
      confidence: 82,
      modelName: 'TF-IDF + Logistic Regression',
      modelVersion: '1.0.0',
      summary: 'Posting contains potential warning indicators including free public email address and missing verified corporate website.',
      recommendation: 'Proceed with caution. Request an official company website and verify recruiter identity before sharing personal records.',
    });

    await FraudIndicator.create([
      {
        analysisId: analysisCaution._id,
        type: 'FREE_EMAIL_DOMAIN',
        severity: 'MEDIUM',
        title: 'Free Public Email Used for Hiring',
        explanation: 'The recruiter provided a free @gmail.com address rather than a domain matching the hiring organization.',
        evidence: 'Recruiter email: apexjobs2026@gmail.com',
      },
      {
        analysisId: analysisCaution._id,
        type: 'MISSING_VERIFICATION_DETAILS',
        severity: 'MEDIUM',
        title: 'Missing Corporate Website',
        explanation: 'No verifiable corporate domain was included in the listing.',
        evidence: 'No website URL specified',
      },
    ]);

    // 5. Sample 3: LIKELY FRAUDULENT
    const jobScam = await JobPost.create({
      userId: user._id,
      title: 'URGENT DATA ENTRY CLERK - START TODAY $$$',
      companyName: 'Global Home Careers LLC',
      description: 'URGENT HIRING!! WORK FROM HOME AND EARN $5,000 WEEKLY! NO EXPERIENCE REQUIRED!! Instant joining! You will receive daily checks. To secure your position, applicant must pay registration fee of $150 for equipment setup and software licensing via wire transfer or gift card. Send your bank details immediately to recruiter via Telegram @hiring_fast_hr to begin your orientation!',
      location: 'Anywhere / Remote',
      employmentType: 'Remote',
      salary: '$5,000 / week',
      companyWebsite: 'http://fast-cash-careers.xyz',
      contactEmail: 'hr_quick_pay@yahoo.com',
      recruiterContact: 'Telegram: @hiring_fast_hr',
    });

    const analysisScam = await Analysis.create({
      jobPostId: jobScam._id,
      userId: user._id,
      riskScore: 94,
      classification: 'LIKELY_FRAUDULENT',
      confidence: 98,
      modelName: 'TF-IDF + Logistic Regression',
      modelVersion: '1.0.0',
      summary: 'Severe recruitment fraud risk. High-pressure upfront payment demands, off-platform Telegram recruitment, and unrealistic financial promises detected.',
      recommendation: 'DO NOT apply, pay any fee, or share personal identity/banking documents. Cease all contact immediately.',
    });

    await FraudIndicator.create([
      {
        analysisId: analysisScam._id,
        type: 'PAYMENT_REQUEST',
        severity: 'CRITICAL',
        title: 'Upfront Registration Fee & Bank Details Demanded',
        explanation: 'Scammers demand upfront fees for fake training/software equipment or cashier check advance frauds.',
        evidence: 'Detected: "pay registration fee of $150", "wire transfer", "send bank details"',
      },
      {
        analysisId: analysisScam._id,
        type: 'UNOFFICIAL_COMMUNICATION',
        severity: 'HIGH',
        title: 'Encrypted Chat Recruitment Channel',
        explanation: 'Directing job seekers to Telegram or WhatsApp is an established recruitment scam indicator.',
        evidence: 'Recruiter contact: Telegram @hiring_fast_hr',
      },
      {
        analysisId: analysisScam._id,
        type: 'URGENCY_LANGUAGE',
        severity: 'HIGH',
        title: 'Artificial High-Pressure Urgency',
        explanation: 'Phrases like "start today", "urgent hiring", "instant joining" used to manipulate applicants.',
        evidence: 'Detected: "URGENT HIRING!!", "START TODAY $$$"',
      },
    ]);

    console.log('[SafeHire Seed] Database seeding completed successfully.');
  } catch (err: any) {
    console.error('[SafeHire Seed] Seeding error:', err.message);
  }
};
