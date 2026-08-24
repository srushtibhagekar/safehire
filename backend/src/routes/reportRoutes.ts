import { Router } from 'express';
import { getReportByAnalysisId } from '../controllers/reportController';

const router = Router();

router.get('/reports/:analysisId', getReportByAnalysisId);

export default router;
