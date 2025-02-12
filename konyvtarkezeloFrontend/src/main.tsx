import React from 'react';
import ReactDOM from 'react-dom/client'; // Itt a 'client' modulra van szükség
import './index.css';  // Globális stílusok
import App from './App';  // Az alkalmazás fő komponense

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Az új root létrehozása
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
