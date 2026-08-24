import re
import html
from typing import Dict, Any

def clean_text(text: str) -> str:
    """
    Cleans raw text for NLP processing and TF-IDF extraction.
    """
    if not text or not isinstance(text, str):
        return ""
    
    # Unescape HTML entities
    cleaned = html.unescape(text)
    
    # Remove HTML tags
    cleaned = re.sub(r'<[^>]+>', ' ', cleaned)
    
    # Normalize whitespaces
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    
    return cleaned

def extract_metadata_stats(title: str, company: str, description: str, **kwargs) -> Dict[str, Any]:
    """
    Extracts text statistics and signal metrics.
    """
    full_text = f"{title} {company} {description} {kwargs.get('salary', '')} {kwargs.get('location', '')}"
    
    # Uppercase ratio
    caps_count = sum(1 for c in description if c.isupper())
    caps_ratio = round((caps_count / max(1, len(description))), 3)
    
    # Exclamation & question mark count
    exclamation_count = description.count('!') + title.count('!')
    dollar_count = full_text.count('$') + full_text.count('USD') + full_text.count('EUR')
    
    # Word count
    words = description.split()
    word_count = len(words)
    
    return {
        "word_count": word_count,
        "caps_ratio": caps_ratio,
        "exclamation_count": exclamation_count,
        "currency_symbol_count": dollar_count,
        "char_length": len(description)
    }
