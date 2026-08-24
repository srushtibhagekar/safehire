import { Router } from 'express';
import {
  getAdminStats,
  getAdminUsers,
  toggleUserStatus,
  getAdminJobs,
  getModelMetrics,
  retrainModels,
} from '../controllers/adminController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';

const router = Router();

// Protect all admin routes with authentication & ADMIN role requirement
router.use(authenticateJWT, requireAdmin);

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.patch('/users/:id/status', toggleUserStatus);
router.get('/jobs', getAdminJobs);
router.get('/model-metrics', getModelMetrics);
router.post('/retrain', retrainModels);

export default router;
