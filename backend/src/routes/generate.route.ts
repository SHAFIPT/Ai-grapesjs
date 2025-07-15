import { Router } from 'express';
import { GenerateService } from '../services/generate.service';
import { handleGenerateRequest } from '../controllers/generate.controller';

const router = Router();
const generateService = new GenerateService();
router.post('/', handleGenerateRequest(generateService));

export default router;