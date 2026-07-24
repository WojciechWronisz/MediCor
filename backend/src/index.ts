import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clinicRoutes from './routes/clinicRoutes.js';
import { checkDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', clinicRoutes);

app.get('/api/health', async (_req: Request, res: Response) => {
  const dbOk = await checkDb();
  res.json({
    status: 'MediCor API działa',
    bazaDanych: dbOk ? 'połączona' : 'niedostępna',
  });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
