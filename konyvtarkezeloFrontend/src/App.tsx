import React from 'react';
import './App.css';
import BooksList from "./BooksList";  // A könyvek listáját kezelő komponens
import AddBookForm from "./AddBookForm";  // Új könyv hozzáadásához szükséges form

const App = () => {
  return (
    <div className="App">
      <h1>Book Management</h1>
      <AddBookForm />
      <BooksList />
    </div>
  );
};

export default App;
