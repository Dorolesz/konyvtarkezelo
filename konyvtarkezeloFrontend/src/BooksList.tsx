import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  author: string;
  title: string;
  year: number;
  genre: string;
  pages: number;
  available: boolean;
}

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]); // Állapot a könyvek listájának tárolására
  const [loading, setLoading] = useState<boolean>(true); // Töltés állapot

  useEffect(() => {
    // API hívás a könyvek lekérésére
    axios.get('http://localhost:3000/api/books') // Az API URL-jét módosítsd a saját rendszeredhez
      .then(response => {
        setBooks(response.data);
        setLoading(false); // Ha megérkeztek az adatok, állítsuk le a töltést
      })
      .catch(error => {
        console.error('Hiba történt a könyvek betöltésekor:', error);
        setLoading(false);
      });
  }, []); // Az üres array azt jelenti, hogy egyszer fut le az oldal betöltődésekor

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.author} - {book.title}</h3>
          <p>Year: {book.year}</p>
          <p>Genre: {book.genre}</p>
          <p>Pages: {book.pages}</p>
          <p>{book.available ? 'Available' : 'Not Available'}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BooksList;
