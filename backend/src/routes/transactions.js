import { Router } from 'express';
import Book from '../models/Book.js';
import Transaction from '../models/Transaction.js';

const router = Router();

// Borrow a book
router.post('/borrow', async (req, res) => {
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ error: 'bookId required' });

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  // ensure not already borrowed by same user without returning
  const openTx = await Transaction.findOne({ bookId, userId: req.user.sub, returnDate: null });
  if (openTx) return res.status(400).json({ error: 'Already borrowed and not returned' });

  const tx = await Transaction.create({ bookId, userId: req.user.sub });
  res.status(201).json(tx);
});

// Return a book
router.post('/return', async (req, res) => {
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ error: 'bookId required' });

  const tx = await Transaction.findOne({ bookId, userId: req.user.sub, returnDate: null });
  if (!tx) return res.status(400).json({ error: 'No open borrow transaction found' });

  tx.returnDate = new Date();
  await tx.save();
  res.json(tx);
});

export default router;