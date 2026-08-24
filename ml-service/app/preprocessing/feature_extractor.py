import re
from typing import Dict, Any, List

class LinguisticFeatureExtractor:
    """
    Extracts high-level NLP signals and domain-specific fraud features.
    """
    
    PAYMENT_TERMS = [
        r'\bregistration fee\b', r'\bprocessing fee\b', r'\bupfront fee\b',
        r'\bapplication fee\b', r'\bbank details\b', r'\bbank account\b',
        r'\bwire transfer\b', r'\bcrypto\b', r'\bbitcoin\b', r'\bgift card\b',
        r'\bsecurity deposit\b', r'\btraining fee\b', r'\bpay upfront\b',
        r'\bsend money\b', r'\bcheck deposit\b', r'\bcashiers check\b'
    ]
    
    URGENCY_TERMS = [
        r'\burgent hiring\b', r'\bimmediate joining\b', r'\binstant offer\b',
        r'\bno interview\b', r'\bstart today\b', r'\blimited slots\b',
        r'\bact fast\b', r'\bhiring immediately\b', r'\bno experience needed\b',
        r'\bguaranteed income\b', r'\bwork 1 hour earn\b', r'\bearn \$\d+ daily\b'
    ]
    
    FREE_EMAIL_DOMAINS = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'yopmail.com', 'protonmail.com', 'mail.com', 'aol.com'
    ]
    
    COMMUNICATION_APPS = [
        r'\btelegram\b', r'\bwhatsapp\b', r'\bsignal\b', r'\bgoogle hangouts\b',
        r't\.me\/', r'wa\.me\/'
    ]

    def extract_features(self, title: str, company: str, description: str, **kwargs) -> Dict[str, Any]:
        combined_text = f"{title} {company} {description} {kwargs.get('salary', '')} {kwargs.get('contactEmail', '')} {kwargs.get('recruiterContact', '')}".lower()
        
        # Check payment keywords
        payment_hits = []
        for pattern in self.PAYMENT_TERMS:
            matches = re.findall(pattern, combined_text)
            if matches:
                payment_hits.extend(matches)
                
        # Check urgency keywords
        urgency_hits = []
        for pattern in self.URGENCY_TERMS:
            matches = re.findall(pattern, combined_text)
            if matches:
                urgency_hits.extend(matches)
                
        # Check suspicious chat recruiters
        chat_hits = []
        for pattern in self.COMMUNICATION_APPS:
            matches = re.findall(pattern, combined_text)
            if matches:
                chat_hits.extend(matches)
                
        # Check contact email domain
        contact_email = kwargs.get('contactEmail', '') or ''
        is_free_email = False
        if '@' in contact_email:
            domain = contact_email.split('@')[-1].strip().lower()
            if domain in self.FREE_EMAIL_DOMAINS:
                is_free_email = True
                
        # Check company website validity
        website = kwargs.get('companyWebsite', '') or ''
        has_suspicious_domain = False
        if website and ('.xyz' in website or '.top' in website or '.tk' in website or '.buzz' in website):
            has_suspicious_domain = True
            
        return {
            "payment_hits": list(set(payment_hits)),
            "urgency_hits": list(set(urgency_hits)),
            "chat_hits": list(set(chat_hits)),
            "is_free_email": is_free_email,
            "has_suspicious_domain": has_suspicious_domain,
            "has_website": bool(website.strip()),
            "has_contact": bool(contact_email.strip() or kwargs.get('recruiterContact', ''))
        }
