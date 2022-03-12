#### first Create a bookReducer.js
```js
import uuid from 'uuid/v4';

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, {
        title: action.book.title, 
        author: action.book.author, 
        id: uuid()}
      ]
    case 'REMOVE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
} 

```

```js

import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from './bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, []);
  
  
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;

```


#### wrap your app file 

```js
import BookContextProvider from './BookContext';


function App() {
  return (
    <div className="App">
      <BookContextProvider>
        ...
        ...
      </BookContextProvider>

    </div>
  );
}

export default App;

```

#### use in component

```js
import React, { useContext } from 'react';
import { BookContext } from './BookContext';

 const { books, dispatch } = useContext(BookContext);
 
 <li onClick={() => dispatch({ type: 'REMOVE_BOOK', id: book.id })}>
 
 
 const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_BOOK', book: { title, author } });
    setTitle('');
    setAuthor('');
  }
```

--------------------------

```js

import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from './bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {

  const [books, dispatch] = useReducer(bookReducer, [], () => {
    // return of this function data will replace the initial data
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;

```
