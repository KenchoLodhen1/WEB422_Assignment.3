import { getToken } from 'next-auth/jwt';
import { books } from '../../../lib/bookStore';

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  const idx = books.findIndex(b => b._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  if (req.method === 'PUT') {
    const { title, author, isbn } = req.body || {};
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required' });
    }
    books[idx] = { ...books[idx], title, author, isbn };
    return res.status(200).json(books[idx]);
  }

  if (req.method === 'DELETE') {
    const [removed] = books.splice(idx, 1);
    return res.status(200).json(removed);
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
