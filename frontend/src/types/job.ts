export interface JobPost {
  id?: string;
  _id?: string;
  userId?: string;
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
  createdAt?: string;
  updatedAt?: string;
}
