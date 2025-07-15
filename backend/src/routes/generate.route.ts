import { Router } from 'express';
import { GenerateService } from '../services/generate.service';
import { handleGenerateRequest } from '../controllers/generate.controller';

const router = Router();
const generateService = new GenerateService();

console.log('[ROUTER] Registering POST /generate-site with DI');
router.post('/', handleGenerateRequest(generateService));

export default router;