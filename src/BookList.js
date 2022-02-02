import React, { useContext } from 'react';
import { BookContext } from './BookContext';

const BookList = () => {
  const { books, dispatch } = useContext(BookContext);
  return books.length ? (
    <div className="book-list">
      <ul>
        {books.map(book => {
          return (
            // <BookDetails book={book}  />
            <div key={book.id}>
              <li onClick={() => dispatch({ type: 'REMOVE_BOOK', id: book.id })}>
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