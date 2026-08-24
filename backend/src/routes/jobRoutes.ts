import { Router } from 'express';
import { JobPost } from '../models/JobPost';
import { authenticateJWT, optionalAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/jobs', optionalAuth, async (req, res) => {
  try {
    const jobs = await JobPost.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: jobs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: 'Job not found' });
      return;
    }
    res.json({ success: true, data: job });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
