import { Router } from 'express';
import Book from '../models/Book.js';

const router = Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ (all)
router.get('/', async (_req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// READ (one)
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;