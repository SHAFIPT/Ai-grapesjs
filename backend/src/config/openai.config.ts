// config/openai.config.ts (rename to openrouter.config.ts if preferred)
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://your-site-url.com', 
    'X-Title': 'Your App Name',
  },
});
