import { getToken } from 'next-auth/jwt';
import { books } from '../../../lib/bookStore';

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    const { title, author, isbn } = req.body || {};
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required' });
    }

    const newBook = {
      _id: crypto.randomUUID(),
      title: String(title),
      author: String(author),
      isbn: String(isbn),
      borrowedBy: null,
    };

    books.unshift(newBook);
    return res.status(201).json(newBook);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
