// pages/index.js
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { apiClient } from '../lib/api';
import BookForm from '../lib/components/BookForm';
import BookList from '../lib/components/BookList';

export default function Home() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthed = status === 'authenticated' && !!session?.idToken;

  // Load books once the ID token is available
  useEffect(() => {
    if (!isAuthed) return;

    (async () => {
      try {
        const client = apiClient(session.idToken); // pass token
        const { data } = await client.get('/api/books');
        setBooks(data);
      } catch (err) {
        console.error('Fetch books failed:', err?.response?.data || err?.message || err);
      }
    })();
  }, [isAuthed, session?.idToken]);

  if (status === 'loading') {
    return <p className="p-6">Loading…</p>;
  }

  if (!isAuthed) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Library Management System</h1>
        <p className="text-gray-600">Please sign in to manage and borrow books.</p>
        <button
          onClick={() => signIn('ibm-app-id')}
          className="px-4 py-2 border"
        >
          Login with IBM App ID
        </button>
      </div>
    );
  }

  async function saveBook(payload) {
    setLoading(true);
    try {
      const client = apiClient(session.idToken); // pass token
      if (editing) {
        const { data } = await client.put(`/api/books/${editing._id}`, payload);
        setBooks((prev) => prev.map((b) => (b._id === editing._id ? data : b)));
        setEditing(null);
      } else {
        const { data } = await client.post('/api/books', payload);
        setBooks((prev) => [data, ...prev]);
      }
    } catch (e) {
      console.error('Save failed:', e?.response?.status, e?.response?.data, e);
      alert('Error saving book');
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(id) {
    if (!confirm('Delete this book?')) return;
    setLoading(true);
    try {
      const client = apiClient(session.idToken); // pass token
      await client.delete(`/api/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      console.error('Delete failed:', e?.response?.data || e?.message || e);
      alert('Error deleting book');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Library Management System</h1>
          <p className="text-sm text-gray-600">
            Signed in as <b>{session?.user?.email || session?.user?.id}</b>
          </p>
        </div>
        <div className="space-x-2">
          <a className="underline" href="/borrow">
            Borrow / Return
          </a>
          <button className="px-3 py-1 border" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <section className="max-w-xl">
        <h2 className="text-lg font-semibold mb-2">
          {editing ? 'Edit Book' : 'Add New Book'}
        </h2>
        <BookForm onSave={saveBook} initial={editing} />
        {editing && (
          <button className="mt-2 text-sm underline" onClick={() => setEditing(null)}>
            Cancel edit
          </button>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">All Books</h2>
        <BookList books={books} onEdit={setEditing} onDelete={deleteBook} />
        {loading && <p className="mt-2 text-sm text-gray-500">Working…</p>}
      </section>
    </div>
  );
}
