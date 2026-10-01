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
  FileText,
  Terminal,
  HelpCircle,
} from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structured' | 'raw'>('structured');
  
  // Form State
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

  // Raw text input state
  const [rawText, setRawText] = useState('');

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

  const handleRawTextParse = () => {
    if (!rawText.trim()) return;
    
    // Simple heuristic parser for raw pasted listings
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length > 0) {
      if (!title) setTitle(lines[0].substring(0, 60));
      if (lines.length > 1 && !companyName) setCompanyName(lines[1].substring(0, 50));
      setDescription(rawText);
      setActiveTab('structured');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let finalTitle = title;
    let finalCompany = companyName;
    let finalDescription = description;

    if (activeTab === 'raw') {
      if (!rawText.trim() || rawText.trim().length < 20) {
        setError('Please paste the complete job posting text (minimum 20 characters).');
        return;
      }
      finalTitle = title || 'Unspecified Job Role';
      finalCompany = companyName || 'Company Under Investigation';
      finalDescription = rawText;
    } else {
      if (!title.trim() || !companyName.trim() || !description.trim()) {
        setError('Please provide Job Title, Company Name, and Job Description.');
        return;
      }
      if (description.trim().length < 15) {
        setError('Job description must be at least 15 characters to run forensic heuristic analysis.');
        return;
      }
    }

    setIsScanning(true);

    try {
      const [res] = await Promise.all([
        analysisService.analyze({
          title: finalTitle,
          companyName: finalCompany,
          description: finalDescription,
          location,
          salary,
          employmentType,
          companyWebsite,
          contactEmail,
          jobUrl,
          recruiterContact,
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)), // Allow scan sequence animation to be visible
      ]);

      if (res.success && res.analysis) {
        const id = res.analysis.id || (res.analysis as any)._id;
        navigate(`/results/${id}`);
      } else {
        setIsScanning(false);
        setError('Failed to parse scan dossier. Please try again.');
      }
    } catch (err: any) {
      setIsScanning(false);
      setError(err.response?.data?.message || 'Analysis processing failed. Please verify server connection.');
    }
  };

  if (isScanning) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnalysisProgress />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>SECURITY INVESTIGATION TERMINAL</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          Analyze Job Authenticity
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Submit any job posting or recruiter message to scan for linguistic red flags, fee extraction schemes, domain spoofing, and advance-fee scam vectors.
        </p>
      </div>

      {/* Pre-configured Sample Selector */}
      <SamplePicker onSelect={handleSelectSample} />

      {/* Main Analysis Form Container */}
      <div className="rounded-2xl bg-[#0D121D] border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Tab Selector Bar */}
        <div className="flex items-center border-b border-slate-800 bg-[#080B11] px-4 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('structured')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold border-b-2 transition ${
              activeTab === 'structured'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Structured Field Inspection
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2.5 text-xs font-mono font-semibold border-b-2 transition ${
              activeTab === 'raw'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Job Text / Paste Mode
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'raw' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-300 flex items-center justify-between">
                  <span>Paste Complete Job Posting or Email Text *</span>
                  <span className="text-[10px] text-slate-500">Includes requirements, emails, links</span>
                </label>
                <textarea
                  rows={10}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste the full job posting description, recruiter email, or Telegram interview offer message here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans leading-relaxed resize-y"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">
                    Job Title (Optional if in text)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Remote Data Specialist"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">
                    Company Name (Optional if in text)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Primary Required Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                    <span>Job Title *</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-sky-400" />
                    <span>Hiring Entity / Company *</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Stripe, Inc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>Job Description & Requirements *</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans">Min. 15 characters</span>
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Paste the full job post details, duties, requirements, and hiring instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-sans resize-y leading-relaxed"
                  required
                />
              </div>

              {/* Secondary Telemetry Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800/60">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote (US)"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salary / Compensation</span>
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. $140k - $160k or $50/hr"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>Employment Type</span>
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Domain & Contact Verification Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>Company Website URL</span>
                  </label>
                  <input
                    type="text"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="e.g. https://company.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Recruiter Contact Email</span>
                  </label>
                  <input
                    type="text"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>Job Posting Link (URL)</span>
                  </label>
                  <input
                    type="text"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="e.g. https://linkedin.com/jobs/view/12345"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Recruiter Handle (Telegram/WhatsApp/Name)</span>
                  </label>
                  <input
                    type="text"
                    value={recruiterContact}
                    onChange={(e) => setRecruiterContact(e.target.value)}
                    placeholder="e.g. @recruiter_hr on Telegram or Sarah Chen"
                    className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-slate-800 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Heuristic Rule Engine + BERT Semantic Classification</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm font-sans"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Launch Forensic Scan</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
