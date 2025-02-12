import { useState } from 'react';
import axios from 'axios';

const AddBookForm = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

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

    axios.post('http://localhost:3000/api/books', newBook)
      .then(() => {
        alert('A könyv sikeresen hozzáadva!');
        // Űrlap törlése sikeres mentés után
        setAuthor('');
        setTitle('');
        setYear('');
        setGenre('');
        setPages('');
        setAvailable(true);
      })
      .catch((error) => {
        setError('Hiba történt a könyv hozzáadása során.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Új könyv hozzáadása</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
    </div>
  );
};

export default AddBookForm;
