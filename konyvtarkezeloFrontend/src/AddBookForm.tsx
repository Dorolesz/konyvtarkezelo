import React, { useState } from 'react';
import axios from 'axios';
import './AddBookForm.css';
import BooksList from './BooksList';

const AddBookForm = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = () => {
    // Implement the logic to fetch books here
    console.log('Fetching books...');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validáljuk az űrlapot
    if (!author || !title || !year || !genre || !pages) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    // A validáció után küldjük az adatokat a backend-nek
    const newBook = {
      author,
      title,
      year: Number(year),
      genre,
      pages: Number(pages),
      available
    };

    axios.post('http://localhost:3000/book', newBook)
      .then(() => {
        alert('A könyv sikeresen hozzáadva!');
        // Űrlap törlése sikeres mentés után
        setAuthor('');
        setTitle('');
        setYear('');
        setGenre('');
        setPages('');
        setAvailable(true);
        // Frissítjük a könyvek listáját
        fetchBooks();
      })
      .catch((error) => {
        setError('Hiba történt a könyv hozzáadása során.');
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <h2>Új könyv hozzáadása</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Szerző:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Cím:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Kiadás éve:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Műfaj:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pages">Oldalszám:</label>
          <input
            type="number"
            id="pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="available">Elérhető:</label>
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <button type="submit">Könyv hozzáadása</button>
      </form>
      <BooksList />
    </div>
  );
};

export default AddBookForm;