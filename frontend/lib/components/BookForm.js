import { useState } from 'react';

export default function BookForm({ onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [isbn, setIsbn] = useState(initial?.isbn || '');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, author, isbn });
      }}
      className="space-y-2"
    >
      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input className="border p-2 w-full" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <button className="bg-black text-white px-4 py-2" type="submit">Save</button>
    </form>
  );
}