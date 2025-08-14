import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { apiClient } from '../lib/api';

export default function Borrow() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      (async () => {
        const client = await apiClient();
        const { data } = await client.get('/api/books');
        setBooks(data);
      })();
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') {
    return <button onClick={() => signIn('ibm-app-id')}>Login</button>;
  }

  async function doBorrow() {
    try {
      const client = await apiClient();
      const { data } = await client.post(`/api/borrow/${selected}`);
      setMessage(`Borrowed "${data.title}" at ${new Date().toLocaleString()}`);
      setBooks(prev => prev.map(b => b._id === selected ? data : b));
    } catch (err) {
      setMessage(err?.response?.data?.error || 'Error borrowing book');
    }
  }

  async function doReturn() {
    try {
      const client = await apiClient();
      const { data } = await client.delete(`/api/borrow/${selected}`);
      setMessage(`Returned "${data.title}" at ${new Date().toLocaleString()}`);
      setBooks(prev => prev.map(b => b._id === selected ? data : b));
    } catch (err) {
      setMessage(err?.response?.data?.error || 'Error returning book');
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Borrow / Return</h1>

      <select
        className="border p-2 text-white bg-black"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select a book</option>
        {books.map((b) => (
          <option key={b._id} value={b._id}>
            {b.title} — {b.author} {b.borrowedBy ? `(Borrowed by ${b.borrowedBy})` : ''}
          </option>
        ))}
      </select>

      <div className="space-x-2">
        <button
          className="px-3 py-1 border"
          onClick={doBorrow}
          disabled={!selected}
        >
          Borrow
        </button>
        <button
          className="px-3 py-1 border"
          onClick={doReturn}
          disabled={!selected}
        >
          Return
        </button>
      </div>

      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
