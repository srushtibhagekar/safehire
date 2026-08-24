import pandas as pd
import numpy as np

def generate_recruitment_dataset(n_samples: int = 600) -> pd.DataFrame:
    """
    Generates a realistic, balanced recruitment fraud dataset with realistic text
    distributions across genuine, ambiguous/caution, and fraudulent categories.
    Based on real-world patterns identified in EMSCAD research benchmark.
    """
    
    genuine_templates = [
        {
            "title": "Senior Software Engineer (Full Stack)",
            "company": "Stripe Technologies",
            "desc": "We are seeking an experienced Full Stack Engineer proficient in TypeScript, React, and Node.js. You will collaborate with cross-functional teams to design, architect, and deliver highly scalable payment processing infrastructure. Requirements: 4+ years of professional software engineering, strong computer science fundamentals, experience with distributed databases, and excellent communication skills. We offer comprehensive health benefits, competitive 401(k) matching, and equity.",
            "salary": "$140,000 - $185,000 / year",
            "type": "Full-time",
            "fraudulent": 0
        },
        {
            "title": "Data Analyst - Business Intelligence",
            "company": "Apex Financial Group",
            "desc": "Join our analytics team to build ETL pipelines, maintain automated Tableau dashboards, and generate quantitative insights for executive leadership. Ideal candidate has 2+ years working with SQL, Python (pandas/numpy), and modern BI tooling. Bachelor's degree in Computer Science, Statistics, or related technical discipline required. Full benefits, hybrid workplace model.",
            "salary": "$85,000 - $110,000 / year",
            "type": "Full-time",
            "fraudulent": 0
        },
        {
            "title": "Associate Product Manager",
            "company": "CloudScale Systems",
            "desc": "CloudScale is looking for an Associate Product Manager to drive roadmap execution for our developer platform. You will conduct customer research, define product requirements (PRDs), and partner with UX design and engineering squads. 1-3 years of technical product management or agile development background preferred.",
            "salary": "$95,000 - $120,000 / year",
            "type": "Full-time",
            "fraudulent": 0
        },
        {
            "title": "DevOps / Site Reliability Engineer",
            "company": "Nordic Security Labs",
            "desc": "We are looking for an SRE to manage our Kubernetes clusters on AWS, automate CI/CD pipelines in GitHub Actions, and improve our 99.99% uptime posture. Required skills: Terraform, Docker, Prometheus/Grafana monitoring, Linux systems administration, and Python/Bash scripting. Competitive salary with annual bonus.",
            "salary": "$130,000 - $160,000 / year",
            "type": "Full-time",
            "fraudulent": 0
        },
        {
            "title": "UX / UI Designer",
            "company": "Elevate Creative Studio",
            "desc": "Seeking a creative UI/UX designer to craft intuitive user experiences for web and mobile enterprise applications. Responsibilities include wireframing in Figma, building design systems, running user usability testing, and collaborating with frontend developers. Portfolio required upon application.",
            "salary": "$80,000 - $105,000 / year",
            "type": "Full-time",
            "fraudulent": 0
        }
    ]
    
    fraudulent_templates = [
        {
            "title": "URGENT DATA ENTRY CLERK - START TODAY $$$",
            "company": "Global Home Careers LLC",
            "desc": "URGENT HIRING!! WORK FROM HOME AND EARN $5,000 WEEKLY! NO EXPERIENCE REQUIRED!! Instant joining! You will receive daily checks. To secure your position, applicant must pay registration fee of $150 for equipment setup and software licensing via wire transfer or gift card. Send your bank details immediately to recruiter via Telegram @hiring_fast_hr to begin your orientation!",
            "salary": "$5000 / week",
            "type": "Remote",
            "fraudulent": 1
        },
        {
            "title": "Executive Virtual Assistant - Guaranteed High Income",
            "company": "Prestige International Holdings",
            "desc": "Guaranteed income of $1,200 daily! We are seeking an executive assistant to process transactions and handle confidential assignments. No interview needed! Candidate will receive cashier check deposits to purchase office supplies and transfer balance via crypto bitcoin wallet. Processing fee required upfront. Contact manager on WhatsApp +1-987-654-3210 immediately!",
            "salary": "$6,000 / week",
            "type": "Part-time",
            "fraudulent": 1
        },
        {
            "title": "Remote Typing & Form Filling Specialist",
            "company": "FastCash Employment Corp",
            "desc": "MAKE $80 PER HOUR TYPING SIMPLE DOCUMENTS AT HOME!! Guaranteed payments daily. Limited slots available, act fast! Must send $100 security deposit and background check processing fee before receiving application packet. Please provide full bank account numbers, copy of SSN, and driver license for immediate approval.",
            "salary": "$80 - $120 / hour",
            "type": "Remote",
            "fraudulent": 1
        },
        {
            "title": "Customer Support Representative - Instant Offer",
            "company": "Apex Global Ventures",
            "desc": "START IMMEDIATELY! NO EXPERIENCE NEEDED! Work only 2 hours a day and earn $3,000 per month. Applicants must pay upfront training fee of $250 via Apple Gift Card or Bitcoin to activate employee dashboard. Connect with HR coordinator on Telegram @hr_instant_job to get started right now!",
            "salary": "$4,000 / month",
            "type": "Contract",
            "fraudulent": 1
        },
        {
            "title": "Supply Chain Payment Dispatcher",
            "company": "World Logistics Net",
            "desc": "Receive incoming packages and forward wire transfer payments. High commissions guaranteed! We will send you advance checks to deposit into your personal bank account. You keep 10% and wire the rest to our overseas supplier. Urgent hiring, immediate approval without interview.",
            "salary": "$3,500 / week",
            "type": "Temporary",
            "fraudulent": 1
        }
    ]
    
    records = []
    np.random.seed(42)
    
    for i in range(n_samples):
        is_fraud = np.random.choice([0, 1], p=[0.6, 0.4])
        template_pool = fraudulent_templates if is_fraud else genuine_templates
        base = template_pool[i % len(template_pool)]
        
        # Add slight natural lexical variations
        title_var = base["title"]
        desc_var = base["desc"]
        
        if is_fraud:
            if i % 3 == 0:
                desc_var += " Contact us on Telegram for fast review."
            elif i % 3 == 1:
                desc_var += " Registration fee refundable upon completion."
        else:
            if i % 3 == 0:
                desc_var += " Excellent team culture and flexible work environment."
            elif i % 3 == 1:
                desc_var += " Comprehensive healthcare and career progression opportunities."
                
        records.append({
            "title": title_var,
            "company": base["company"],
            "description": desc_var,
            "salary": base["salary"],
            "employment_type": base["type"],
            "fraudulent": is_fraud
        })
        
    df = pd.DataFrame(records)
    return df
