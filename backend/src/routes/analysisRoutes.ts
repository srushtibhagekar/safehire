import { Router } from 'express';
import {
  analyzeJob,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
  saveAnalysis,
  unsaveAnalysis,
  getSavedAnalyses,
} from '../controllers/analysisController';
import { optionalAuth, authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Analysis endpoints
router.post('/analyze', optionalAuth, analyzeJob);
router.get('/analyses', optionalAuth, getAnalyses);
router.get('/analyses/:id', getAnalysisById);
router.delete('/analyses/:id', authenticateJWT, deleteAnalysis);

// Saved analysis bookmarks
router.post('/saved/:analysisId', authenticateJWT, saveAnalysis);
router.delete('/saved/:analysisId', authenticateJWT, unsaveAnalysis);
router.get('/saved', authenticateJWT, getSavedAnalyses);

export default router;
