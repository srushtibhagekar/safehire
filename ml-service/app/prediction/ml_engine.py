import re
import math
import json
import os
from typing import List, Dict, Tuple, Any

class CustomTfidfVectorizer:
    """
    Self-contained pure-Python/NumPy TF-IDF vectorizer with n-grams and sublinear term frequency.
    """
    def __init__(self, max_features: int = 1500, ngram_range: Tuple[int, int] = (1, 2)):
        self.max_features = max_features
        self.ngram_range = ngram_range
        self.vocabulary_: Dict[str, int] = {}
        self.idf_diag_: List[float] = []

    def _tokenize(self, text: str) -> List[str]:
        words = re.findall(r'\b[a-zA-Z0-9_\$]{2,}\b', text.lower())
        tokens = []
        min_n, max_n = self.ngram_range
        for n in range(min_n, max_n + 1):
            for i in range(len(words) - n + 1):
                tokens.append(" ".join(words[i:i+n]))
        return tokens

    def fit(self, raw_documents: List[str]):
        doc_count = len(raw_documents)
        df_counts: Dict[str, int] = {}

        for doc in raw_documents:
            unique_terms = set(self._tokenize(doc))
            for term in unique_terms:
                df_counts[term] = df_counts.get(term, 0) + 1

        # Sort by document frequency
        sorted_terms = sorted(df_counts.items(), key=lambda x: x[1], reverse=True)[:self.max_features]
        self.vocabulary_ = {term: idx for idx, (term, _) in enumerate(sorted_terms)}

        # Compute smooth IDF: log((1 + N) / (1 + df)) + 1
        self.idf_diag_ = [
            math.log((1.0 + doc_count) / (1.0 + df_counts[term])) + 1.0
            for term, _ in sorted_terms
        ]
        return self

    def transform(self, raw_documents: List[str]) -> List[List[float]]:
        matrix = []
        vocab_size = len(self.vocabulary_)

        for doc in raw_documents:
            tokens = self._tokenize(doc)
            tf_counts: Dict[int, int] = {}
            for t in tokens:
                if t in self.vocabulary_:
                    idx = self.vocabulary_[t]
                    tf_counts[idx] = tf_counts.get(idx, 0) + 1

            row = [0.0] * vocab_size
            for idx, count in tf_counts.items():
                # Sublinear tf: 1 + log(tf)
                sublinear_tf = 1.0 + math.log(count)
                row[idx] = sublinear_tf * self.idf_diag_[idx]

            # L2 normalization
            norm = math.sqrt(sum(v * v for v in row))
            if norm > 0:
                row = [v / norm for v in row]

            matrix.append(row)
        return matrix

    def save(self, filepath: str):
        with open(filepath, 'w') as f:
            json.dump({
                "vocabulary": self.vocabulary_,
                "idf": self.idf_diag_,
                "ngram_range": self.ngram_range,
                "max_features": self.max_features
            }, f)

    def load(self, filepath: str):
        with open(filepath, 'r') as f:
            data = json.load(f)
            self.vocabulary_ = data["vocabulary"]
            self.idf_diag_ = data["idf"]
            self.ngram_range = tuple(data["ngram_range"])
            self.max_features = data["max_features"]


class CustomLogisticRegression:
    """
    Self-contained pure-Python/NumPy Logistic Regression classifier trained via Gradient Descent.
    """
    def __init__(self, lr: float = 0.1, max_iter: int = 500, reg_lambda: float = 0.01):
        self.lr = lr
        self.max_iter = max_iter
        self.reg_lambda = reg_lambda
        self.weights: List[float] = []
        self.bias: float = 0.0

    def _sigmoid(self, z: float) -> float:
        z = max(-25.0, min(25.0, z)) # Clamp for numerical stability
        return 1.0 / (1.0 + math.exp(-z))

    def fit(self, X: List[List[float]], y: List[int]):
        n_samples = len(X)
        n_features = len(X[0])
        self.weights = [0.0] * n_features
        self.bias = 0.0

        for _ in range(self.max_iter):
            # Compute predictions
            for i in range(n_samples):
                xi = X[i]
                target = y[i]
                linear_out = sum(w * x for w, x in zip(self.weights, xi)) + self.bias
                y_pred = self._sigmoid(linear_out)
                err = y_pred - target

                # Gradient step with L2 regularization
                for j in range(n_features):
                    if xi[j] != 0:
                        grad = err * xi[j] + self.reg_lambda * self.weights[j]
                        self.weights[j] -= self.lr * grad
                self.bias -= self.lr * err

    def predict_proba(self, X: List[List[float]]) -> List[List[float]]:
        results = []
        for xi in X:
            linear_out = sum(w * x for w, x in zip(self.weights, xi)) + self.bias
            prob_fraud = self._sigmoid(linear_out)
            results.append([round(1.0 - prob_fraud, 4), round(prob_fraud, 4)])
        return results

    def predict(self, X: List[List[float]]) -> List[int]:
        probas = self.predict_proba(X)
        return [1 if p[1] >= 0.5 else 0 for p in probas]

    def save(self, filepath: str):
        with open(filepath, 'w') as f:
            json.dump({
                "weights": self.weights,
                "bias": self.bias,
                "lr": self.lr,
                "reg_lambda": self.reg_lambda
            }, f)

    def load(self, filepath: str):
        with open(filepath, 'r') as f:
            data = json.load(f)
            self.weights = data["weights"]
            self.bias = data["bias"]
            self.lr = data.get("lr", 0.1)
            self.reg_lambda = data.get("reg_lambda", 0.01)
