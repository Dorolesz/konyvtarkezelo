import * as React from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Typography, Button, Grid, Pagination } from '@mui/material';

interface Book {
  id: string;
  author: string;
  title: string;
  year: number;
  genre: string;
  pages: number;
  available: boolean;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const cardsPerPage = 12;

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3000/book')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Hiba történt a könyvek lekérése során:', error);
      });
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3000/book/${id}`)
      .then(() => {
        fetchBooks();
      })
      .catch(error => {
        console.error('Hiba történt a könyv törlése során:', error);
      });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Calculate the books to display on the current page
  const indexOfLastBook = currentPage * cardsPerPage;
  const indexOfFirstBook = indexOfLastBook - cardsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <Grid container spacing={2}>
        {currentBooks.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {book.author} - {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Év: {book.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Műfaj: {book.genre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Oldalszám: {book.pages}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Elérhető: {book.available ? 'Igen' : 'Nem'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Szerkesztés</Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(book.id)}>Törlés</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(books.length / cardsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default BooksList;