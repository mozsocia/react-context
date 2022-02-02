import React, { useContext } from 'react';
import BookDetails from './components/BookDetails';
import { BookContext } from './BookContext';

const BookList = () => {
  const { books, removeBook } = useContext(BookContext);
  return books.length ? (
    <div className="book-list">
      <ul>
        {books.map(book => {
          return (
            // <BookDetails book={book} key={book.id} />
            <div key={book.id}>
              <li onClick={() => removeBook(book.id)}>
                <div className="title">{book.title}</div>
                <div className="author">{book.author}</div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No books to read. Hello free time :).</div>
  );
}

export default BookList;