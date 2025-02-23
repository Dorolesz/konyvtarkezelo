import React, { useState } from 'react';
import axios from 'axios';
import './AddBookForm.css';

const AddBookForm: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [available, setAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newBook = {
      author,
      title,
      year: parseInt(year, 10),
      genre,
      pages: parseInt(pages, 10),
      available,
      imageUrl,
    };

    try {
      await axios.post('http://localhost:3000/books', newBook);
      // Sikeres POST kérés után töröljük az űrlap mezőit
      setAuthor('');
      setTitle('');
      setYear('');
      setGenre('');
      setPages('');
      setAvailable(false);
      setImageUrl('');
    } catch (err) {
      setError('Hiba történt a könyv hozzáadása során.');
    }
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
        <div>
          <label htmlFor="imageUrl">Kép URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  );
};

export default AddBookForm;