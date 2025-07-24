import { openRouter } from '../config/openai.config';
import { formatPrompt } from '../utils/promptFormatter';
  
export class GenerateService {
  async generateWebsite(rawPrompt: string): Promise<string> {
    const formattedPrompt = formatPrompt(rawPrompt);

    const response = await openRouter.post('/chat/completions', {
      model: 'deepseek/deepseek-r1:free',
      messages: [  
        {
          role: 'user',
          content: formattedPrompt,
        },
      ],
    });

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('No content generated.');

    return content;
  }
}
