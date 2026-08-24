import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { SamplePicker, SampleJob } from '../components/analyzer/SamplePicker';
import { AnalysisProgress } from '../components/analyzer/AnalysisProgress';
import {
  Sparkles,
  Building,
  Briefcase,
  DollarSign,
  MapPin,
  Globe,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');

  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const navigate = useNavigate();

  const handleSelectSample = (sample: SampleJob) => {
    setTitle(sample.title);
    setCompanyName(sample.companyName);
    setDescription(sample.description);
    setLocation(sample.location);
    setSalary(sample.salary);
    setEmploymentType(sample.employmentType || 'Full-time');
    setCompanyWebsite(sample.companyWebsite);
    setContactEmail(sample.contactEmail);
    setJobUrl(sample.jobUrl);
    setRecruiterContact(sample.recruiterContact);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !companyName.trim() || !description.trim()) {
      setError('Please provide Job Title, Company Name, and Job Description.');
      return;
    }

    if (description.trim().length < 15) {
      setError('Job Description should contain at least 15 characters for meaningful analysis.');
      return;
    }

    setIsScanning(true);

    try {
      // Simulate minimum 2.5s scanning experience for stage visualization
      const [res] = await Promise.all([
        analysisService.analyze({
          title,
          companyName,
          description,
          location,
          salary,
          employmentType,
          companyWebsite,
          contactEmail,
          jobUrl,
          recruiterContact,
        }),
        new Promise((resolve) => setTimeout(resolve, 2800)),
      ]);

      if (res.success && res.analysis) {
        const id = res.analysis.id || (res.analysis as any)._id;
        navigate(`/results/${id}`);
      }
    } catch (err: any) {
      setIsScanning(false);
      setError(err.response?.data?.message || 'Analysis processing failed. Please check network connection.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> AI Recruitment Inspector
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Analyze Job Advertisement
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Paste the details of any online job posting to evaluate fraud risk, detect hidden red flags, and receive explainable verification insights.
        </p>
      </div>

      {/* 1-Click Sample Preset Buttons */}
      <SamplePicker onSelect={handleSelectSample} />

      {/* Live AI Processing Overlay Modal */}
      {isScanning ? (
        <div className="py-12">
          <AnalysisProgress />
        </div>
      ) : (
        /* Submission Form */
        <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Required Primary Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer, Data Entry Assistant"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Stripe, Global Home Careers LLC"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Job Description (Required) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Full Job Description & Responsibilities <span className="text-red-400">*</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {description.length} characters
                </span>
              </div>
              <textarea
                required
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste the full job advertisement description, requirements, benefits, and instructions here..."
                className="w-full p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition leading-relaxed"
              />
            </div>

            {/* Secondary Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote, San Francisco, CA"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Salary / Compensation
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. $140,000 / yr, $5,000 / week"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Verification Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Company Website URL
                </label>
                <input
                  type="text"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Recruiter Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="recruiter@company.com or hr@gmail.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                  Job Posting URL
                </label>
                <input
                  type="text"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://linkedin.com/jobs/view/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  Recruiter Chat Handle (e.g. Telegram, WhatsApp)
                </label>
                <input
                  type="text"
                  value={recruiterContact}
                  onChange={(e) => setRecruiterContact(e.target.value)}
                  placeholder="e.g. Telegram @recruiter_name"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Analyze with SafeHire AI</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
