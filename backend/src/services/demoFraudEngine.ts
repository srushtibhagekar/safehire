export interface FraudIndicatorResult {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  explanation: string;
  evidence: string;
}

export interface EngineAnalysisResult {
  riskScore: number;
  classification: 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT';
  confidence: number;
  modelName: string;
  modelVersion: string;
  summary: string;
  recommendation: string;
  indicators: FraudIndicatorResult[];
}

export interface JobInputData {
  title: string;
  companyName: string;
  description: string;
  location?: string;
  salary?: string;
  employmentType?: string;
  companyWebsite?: string;
  contactEmail?: string;
  jobUrl?: string;
  recruiterContact?: string;
}

export class DemoFraudEngine {
  private paymentKeywords = [
    'registration fee', 'processing fee', 'upfront fee', 'application fee',
    'bank details', 'bank account', 'wire transfer', 'crypto', 'bitcoin',
    'gift card', 'security deposit', 'training fee', 'pay upfront',
    'send money', 'cashiers check', 'check deposit'
  ];

  private urgencyKeywords = [
    'urgent hiring', 'immediate joining', 'instant offer', 'no interview',
    'start today', 'limited slots', 'act fast', 'hiring immediately',
    'no experience needed', 'guaranteed income', 'earn $5000 weekly',
    'work 1 hour earn', 'daily checks', 'earn $1200 daily'
  ];

  private chatChannels = ['telegram', 'whatsapp', 'signal', 'google hangouts', 't.me/', 'wa.me/'];

  private freeEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'yopmail.com', 'protonmail.com', 'mail.com', 'aol.com'
  ];

  public analyze(job: JobInputData): EngineAnalysisResult {
    const combinedText = `${job.title} ${job.companyName} ${job.description} ${job.salary || ''} ${job.contactEmail || ''} ${job.recruiterContact || ''}`.toLowerCase();
    const indicators: FraudIndicatorResult[] = [];
    let baseScore = 10; // Baseline genuine

    // 1. Check Payment Keywords
    const matchedPayment = this.paymentKeywords.filter(k => combinedText.includes(k));
    if (matchedPayment.length > 0) {
      baseScore += 45;
      indicators.push({
        type: 'PAYMENT_REQUEST',
        severity: 'CRITICAL',
        title: 'Upfront Payment or Sensitive Banking Request',
        explanation: 'Legitimate employers do not demand application fees, registration charges, or banking credentials before issuing a formal employment agreement.',
        evidence: `Detected phrases: "${matchedPayment.slice(0, 3).join('", "')}"`,
      });
    }

    // 2. Check Urgency Keywords
    const matchedUrgency = this.urgencyKeywords.filter(k => combinedText.includes(k));
    if (matchedUrgency.length > 0) {
      baseScore += 25;
      indicators.push({
        type: 'URGENCY_LANGUAGE',
        severity: 'HIGH',
        title: 'High-Pressure Urgency or Guaranteed Compensation Claims',
        explanation: 'Scammers frequently create artificial urgency ("start today", "instant offer", "no interview") to bypass candidate scrutiny.',
        evidence: `Detected phrases: "${matchedUrgency.slice(0, 3).join('", "')}"`,
      });
    }

    // 3. Check Chat Recruiters
    const matchedChat = this.chatChannels.filter(c => combinedText.includes(c));
    if (matchedChat.length > 0) {
      baseScore += 22;
      indicators.push({
        type: 'UNOFFICIAL_COMMUNICATION',
        severity: 'HIGH',
        title: 'Informal or Encrypted Messaging Channels',
        explanation: 'Directing applicants to conduct interviews or submit personal data over Telegram or WhatsApp is a classic marker of impersonation fraud.',
        evidence: `Mentioned channels: "${matchedChat.slice(0, 2).join('", "')}"`,
      });
    }

    // 4. Check Email Domain
    const email = (job.contactEmail || '').trim().toLowerCase();
    if (email && email.includes('@')) {
      const domain = email.split('@')[1];
      if (this.freeEmailDomains.includes(domain)) {
        baseScore += 18;
        indicators.push({
          type: 'FREE_EMAIL_DOMAIN',
          severity: 'MEDIUM',
          title: 'Free Public Email Used for Corporate Recruitment',
          explanation: 'The recruiter contact uses a public domain (e.g. Gmail/Yahoo) rather than an official corporate email domain.',
          evidence: `Contact email domain: @${domain}`,
        });
      }
    }

    // 5. Check Unrealistic Salary Claims
    const salaryText = (job.salary || '').toLowerCase();
    if (
      salaryText.includes('$5000/week') ||
      salaryText.includes('$5,000') ||
      salaryText.includes('$1000/day') ||
      salaryText.includes('$100/hr') ||
      salaryText.includes('$150/hr') ||
      combinedText.includes('$5,000 weekly')
    ) {
      baseScore += 22;
      indicators.push({
        type: 'UNREALISTIC_COMPENSATION',
        severity: 'HIGH',
        title: 'Unrealistically High Compensation for Role',
        explanation: 'The advertised compensation dramatically exceeds typical industry compensation bands for remote entry-level or administrative tasks.',
        evidence: `Advertised salary: "${job.salary || 'Outsized hourly rate in description'}"`,
      });
    }

    // 6. Check Description Quality / Caps
    const capsCount = (job.description.match(/[A-Z]/g) || []).length;
    const capsRatio = capsCount / Math.max(1, job.description.length);
    if (capsRatio > 0.22 && job.description.length > 80) {
      baseScore += 12;
      indicators.push({
        type: 'EXCESSIVE_CAPITALIZATION',
        severity: 'LOW',
        title: 'Unprofessional Formatting & Capitalization',
        explanation: 'The text contains an abnormally high proportion of all-caps words, common in spam advertisements.',
        evidence: `Caps ratio: ${(capsRatio * 100).toFixed(0)}% of total characters`,
      });
    }

    // 7. Check Missing Verification Details
    const hasWebsite = Boolean(job.companyWebsite && job.companyWebsite.trim().length > 3);
    const hasContact = Boolean(job.contactEmail || job.recruiterContact);
    if (!hasWebsite && !hasContact) {
      baseScore += 15;
      indicators.push({
        type: 'MISSING_VERIFICATION_DETAILS',
        severity: 'MEDIUM',
        title: 'Missing Official Company Verification Details',
        explanation: 'No verifiable corporate website or official email address was supplied with this posting.',
        evidence: 'No company website URL or verified recruiter address provided',
      });
    }

    // Calculate Final Risk Score (bounded 5 to 98)
    const riskScore = Math.min(98, Math.max(6, baseScore));

    // Fallback indicator if clean
    if (indicators.length === 0) {
      indicators.push({
        type: 'STANDARD_SPECIFICATION',
        severity: 'LOW',
        title: 'Standard Professional Job Description',
        explanation: 'The posting follows standard industry conventions with structured responsibilities and realistic expectations.',
        evidence: 'No predatory phrasing or payment keywords detected',
      });
    }

    let classification: 'LIKELY_GENUINE' | 'NEEDS_CAUTION' | 'LIKELY_FRAUDULENT' = 'LIKELY_GENUINE';
    let summary = '';
    let recommendation = '';

    if (riskScore >= 60) {
      classification = 'LIKELY_FRAUDULENT';
      summary = `High probability of recruitment scam. Multiple critical anomalies detected, including ${indicators[0].title.toLowerCase()}.`;
      recommendation = 'DO NOT apply, pay any money, or send government IDs. Verify if this role is listed on the genuine company career website.';
    } else if (riskScore >= 30) {
      classification = 'NEEDS_CAUTION';
      summary = `Posting contains warning signals (${indicators[0].title.toLowerCase()}) that require verification prior to sharing personal details.`;
      recommendation = 'Proceed with caution. Search the employer on LinkedIn, check for official contact information, and never pay onboarding fees.';
    } else {
      classification = 'LIKELY_GENUINE';
      summary = 'Posting appears consistent with legitimate corporate hiring. No overt predatory indicators detected.';
      recommendation = 'Standard application safe. Maintain general cybersecurity hygiene and never share banking passwords.';
    }

    return {
      riskScore,
      classification,
      confidence: riskScore >= 60 ? 92 : (riskScore <= 25 ? 88 : 78),
      modelName: 'Demo AI Rule Engine',
      modelVersion: '1.0.0',
      summary,
      recommendation,
      indicators,
    };
  }
}
