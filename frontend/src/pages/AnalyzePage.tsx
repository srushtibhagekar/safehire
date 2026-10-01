import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analysisService } from '../services/analysisService';
import { SamplePicker, SampleJob } from '../components/analyzer/SamplePicker';
import { AnalysisProgress } from '../components/analyzer/AnalysisProgress';
import { AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let finalTitle = title;
    let finalCompany = companyName;
    let finalDescription = description;

    if (activeTab === 'raw') {
      if (!rawText.trim() || rawText.trim().length < 15) {
        setError('Please paste the complete job posting text.');
        return;
      }
      finalTitle = title || 'Unspecified Role';
      finalCompany = companyName || 'Unspecified Company';
      finalDescription = rawText;
    } else {
      if (!title.trim() || !companyName.trim() || !description.trim()) {
        setError('Please enter Job Title, Company Name, and Job Description.');
        return;
      }
      if (description.trim().length < 15) {
        setError('Job description must contain at least 15 characters.');
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
        new Promise((resolve) => setTimeout(resolve, 2200)),
      ]);

      if (res.success && res.analysis) {
        const id = res.analysis.id || (res.analysis as any)._id;
        navigate(`/results/${id}`);
      } else {
        setIsScanning(false);
        setError('Failed to analyze job posting. Please try again.');
      }
    } catch (err: any) {
      setIsScanning(false);
      setError(err.response?.data?.message || 'Analysis request failed. Please check your connection.');
    }
  };

  if (isScanning) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnalysisProgress />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 font-sans">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Analyze a Job Posting
        </h1>
        <p className="text-xs text-text-secondary">
          Check a job listing or recruiter communication for scam signals, payment demands, and domain integrity.
        </p>
      </div>

      {/* Pre-configured Samples */}
      <SamplePicker onSelect={handleSelectSample} />

      {/* Form Container */}
      <div className="rounded-lg bg-surface border border-border overflow-hidden">
        
        {/* Tab switch */}
        <div className="flex items-center border-b border-border bg-surface-subtle px-3 pt-1.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('structured')}
            className={`px-3 py-2 border-b-2 transition ${
              activeTab === 'structured'
                ? 'border-foreground text-foreground font-semibold'
                : 'border-transparent text-text-muted hover:text-foreground'
            }`}
          >
            Structured fields
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-2 border-b-2 transition ${
              activeTab === 'raw'
                ? 'border-foreground text-foreground font-semibold'
                : 'border-transparent text-text-muted hover:text-foreground'
            }`}
          >
            Paste raw text
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-2 text-xs text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'raw' ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">
                  Paste complete job description or email *
                </label>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste the full job post, recruiter message, or Telegram offer here..."
                  className="w-full p-3 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Job Title (Optional)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Remote Data Clerk"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Starlight Global"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Job Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Infrastructure Engineer"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Telemetry"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">
                  Job Description & Requirements *
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Paste the duties, requirements, and hiring instructions..."
                  className="w-full p-3 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500 font-sans leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote (US)"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Salary / Pay</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. $165k - $195k"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-zinc-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Company Website</label>
                  <input
                    type="text"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="e.g. https://apextelemetry.io"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Recruiter Email</label>
                  <input
                    type="text"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. talent@apextelemetry.io"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Job Link / URL</label>
                  <input
                    type="text"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="e.g. https://linkedin.com/jobs/view/123"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-text-secondary">Recruiter Handle / Telegram</label>
                  <input
                    type="text"
                    value={recruiterContact}
                    onChange={(e) => setRecruiterContact(e.target.value)}
                    placeholder="e.g. @recruiter on Telegram"
                    className="w-full px-3 py-1.5 rounded-md bg-surface border border-border text-xs text-foreground placeholder-text-muted focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-text-muted">
              Processed ephemerally with zero candidate PII storage.
            </span>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-foreground text-background font-medium text-xs hover:opacity-90 transition shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyze posting</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
