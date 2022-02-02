import React from 'react';
import BookContextProvider from './BookContext';
import BookList from './BookList';
import NewBookForm from './NewBookForm';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <BookList />
        <NewBookForm />
      </BookContextProvider>
    </div>
  );
}

export default App;
