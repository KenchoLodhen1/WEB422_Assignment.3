import { getToken } from 'next-auth/jwt';
import { books } from '../../../lib/bookStore';

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  const book = books.find(b => b._id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (req.method === 'POST') {
    if (book.borrowedBy) {
      return res.status(400).json({ error: 'Book already borrowed' });
    }
    book.borrowedBy = token.email || token.name || 'Unknown User';
    return res.status(200).json(book);
  }

  if (req.method === 'DELETE') {
    if (!book.borrowedBy) {
      return res.status(400).json({ error: 'Book is not borrowed' });
    }
    book.borrowedBy = null;
    return res.status(200).json(book);
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
