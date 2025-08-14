export default function BookList({ books, onEdit, onDelete }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Author</th>
          <th className="p-2 border">ISBN</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((b) => (
          <tr key={b._id}>
            <td className="p-2 border">{b.title}</td>
            <td className="p-2 border">{b.author}</td>
            <td className="p-2 border">{b.isbn}</td>
            <td className="p-2 border space-x-2">
              <button className="px-3 py-1 border" onClick={() => onEdit(b)}>Edit</button>
              <button className="px-3 py-1 border" onClick={() => onDelete(b._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}