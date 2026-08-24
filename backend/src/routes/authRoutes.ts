import { Router } from 'express';
import { register, login, getMe, forgotPassword, updateProfile } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateJWT, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/profile', authenticateJWT, updateProfile);
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
