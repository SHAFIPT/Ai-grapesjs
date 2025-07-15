import { Request, Response } from 'express';
import { GenerateService } from '../services/generate.service';
import { STATUS } from '../constants/statusCodes';
import { MESSAGES } from '../constants/messages';

export const handleGenerateRequest =
  (service: GenerateService) =>
  async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {;
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ error: MESSAGES.MISSING_PROMPT });
    }
    try {
      const htmlOutput = await service.generateWebsite(prompt);
      return res.status(STATUS.OK).send(htmlOutput);
    } catch (error) {
      console.error('[OpenAI Error]', error);
      return res
        .status(STATUS.INTERNAL_ERROR)
        .json({ error: MESSAGES.GENERATION_FAILED });
    }
  };