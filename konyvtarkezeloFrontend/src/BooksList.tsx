import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksList.css';

interface Book {
  id: number;
  author: string;
  title: string;
  year: number;
  genre: string;
  pages: number;
  available: boolean;
  imageUrl: string;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<string>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    author: '',
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    pages: 0,
    available: false,
    imageUrl: ''
  });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    axios.get<{ books: Book[], total: number }>(`http://localhost:3000/books?page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
      .then((response) => {
        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
          setTotalBooks(response.data.total);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the books!', error);
      });
  }, [page, limit, sort, order]);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
        setTotalBooks(totalBooks - 1);
      })
      .catch((error) => {
        console.error('There was an error deleting the book!', error);
      });
  };

  const handleSave = () => {
    if (selectedBook) {
      axios.patch<Book>(`http://localhost:3000/books/${selectedBook.id}`, selectedBook)
        .then((response) => {
          setBooks(books.map(book => book.id === selectedBook.id ? response.data : book));
          setShowModal(false);
          setSelectedBook(null);
        })
        .catch((error) => {
          console.error('There was an error updating the book!', error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(totalBooks / limit);

  function handleSaveNewBook(): void {
    // Your code here
  }

  return (
    <div className="container">
      <h1 className="my-4">Books Library</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">
            Sort by:
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="year">Year</option>
              <option value="genre">Genre</option>
              <option value="pages">Pages</option>
              <option value="available">Available</option>
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Order:
            <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>
      <div className="row">
        {books.map(book => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={book.imageUrl} className="card-img-top small-image" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.author} - {book.title}</h5>
                <p className="card-text">Year: {book.year}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">Pages: {book.pages}</p>
                <p className="card-text">Available: {book.available ? 'Yes' : 'No'}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between my-4">
        <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
      </div>

      {showModal && selectedBook && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Book</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-control" value={selectedBook.author} onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" value={selectedBook.title} onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input type="number" className="form-control" value={selectedBook.year} onChange={(e) => setSelectedBook({ ...selectedBook, year: parseInt(e.target.value) })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genre</label>
                  <input type="text" className="form-control" value={selectedBook.genre} onChange={(e) => setSelectedBook({ ...selectedBook, genre: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pages</label>
                  <input type="number" className="form-control" value={selectedBook.pages} onChange={(e) => setSelectedBook({ ...selectedBook, pages: parseInt(e.target.value) })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Available</label>
                  <select className="form-select" value={selectedBook.available ? 'Yes' : 'No'} onChange={(e) => setSelectedBook({ ...selectedBook, available: e.target.value === 'Yes' })}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Book</h5>
                <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={newBook.year}
                  onChange={(e) => setNewBook({ ...newBook, year: parseInt(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Genre"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Pages"
                  value={newBook.pages}
                  onChange={(e) => setNewBook({ ...newBook, pages: parseInt(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newBook.imageUrl}
                  onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
                />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={newBook.available}
                    onChange={(e) => setNewBook({ ...newBook, available: e.target.checked })}
                  />
                  <label className="form-check-label">Available</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveNewBook}>Add Book</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;