import express from 'express';
import cors from 'cors';
import generateRoute from './routes/generate.route';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ai-grapesjs.vercel.app'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/generate-site', generateRoute);
 
export default app;
