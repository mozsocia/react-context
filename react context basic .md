#### first Create a context File 

```js

import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';



const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);

  const addBook = (title, author) => {
    setBooks([...books, {title, author, id: uuid()}]);
  };
  
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }
  
  // useEffect here

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
}

export const BookContext = createContext();
 
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

#### use in component___________________________________________________

```js
import React, { useContext } from 'react';
import { BookContext } from './BookContext';

 const { books, addBook, removeBook  } = useContext(BookContext);

```

##### another way ......................
in BookContext js file add 
```js
export const useBookContext = () => {
  const context = useContext(BookContext)

  if (!context) {
    throw Error('useBookContext must be used inside an AuthContextProvider')
  }

  return context
}

```

use...

```js
import { useBookContext } from './BookContext';

 const { books, addBook, removeBook  } = useBookContext();
```


--------------------------------------------------------------------------------------
### If want to save data is localstorage......

```js

import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);

  const addBook = (title, author) => {
    setBooks([...books, {title, author, id: uuid()}]);
  };
  
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }
  
  // useEffect here for local storage------------------------------------------
  
   useEffect(() => {
    const booksData = JSON.parse(localStorage.getItem('books'))

    if (booksData) {
      setBooks(booksData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])
  
  // localstorage end ------------------------------------------------------------

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;


 
```
