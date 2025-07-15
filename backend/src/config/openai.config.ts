import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173/',
    'X-Title': 'AI Website Builder',
  },
});
