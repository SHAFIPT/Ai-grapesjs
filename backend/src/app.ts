import express from 'express';
import cors from 'cors';
import generateRoute from './routes/generate.route';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',  
    credentials: true              
  })
);

app.use(express.json());

console.log('[APP] Setting up /generate-site route');
app.use('/generate-site', generateRoute);
 
export default app;
