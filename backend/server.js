import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/db.js';
import { authMiddleware } from './src/middleware/auth.js';
import booksRouter from './src/routes/books.js';
import txRouter from './src/routes/transactions.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Secure everything below with OIDC validation
app.use(
  '/api',
  authMiddleware({ issuer: process.env.APP_ID_ISSUER, audience: process.env.APP_ID_AUDIENCE })
);

app.use('/api/books', booksRouter);
app.use('/api', txRouter); // /api/borrow, /api/return

const port = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`🚀 API listening on :${port}`)))
  .catch((e) => {
    console.error('DB connection failed', e);
    process.exit(1);
  });