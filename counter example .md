Sure, here is an example of a counter app using React Context API where the state is an object with properties "counter", "loading", and "error":

```js
import React, { createContext, useState } from 'react';

const CounterContext = createContext();

function CounterContextProvider(props) {
  const [state, setState] = useState({ counter: 0, loading: false, error: null });

  const incrementCounter = () => {
    setState({ ...state, counter: state.counter + 1 });
  };

  const decrementCounter = () => {
    setState({ ...state, counter: state.counter - 1 });
  };

  const setLoading = (loading) => {
    setState({ ...state, loading });
  };

  const setError = (error) => {
    setState({ ...state, error });
  };

  return (
    <CounterContext.Provider value={{ state, incrementCounter, decrementCounter, setLoading, setError }}>
      {props.children}
    </CounterContext.Provider>
  );
}

export { CounterContext, CounterContextProvider };

```



```js
import { useContext } from 'react';
import { CounterContext } from './CounterContext';

function useCounter() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error('useCounter must be used within a CounterContextProvider');
  }

  return context;
}

export { useCounter };

```

This hook, `useCounter`, is using the `useContext` hook to access the context data from the `CounterContext`. If the context data is not available (i.e., if the `useCounter` hook is not called within a `CounterContextProvider`), it will throw an error.

To use this hook in a child component, you can import the `useCounter` hook and use it like this:

```js
import React from 'react';
import { useCounter } from './useCounter';

function CounterDisplay() {
  const { state, incrementCounter, decrementCounter } = useCounter();

  return (
    <div>
      <p>Counter: {state.counter}</p>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      <button onClick={incrementCounter}>+</button>
      <button onClick={decrementCounter}>-</button>
    </div>
  );
}

```

In this example, the `CounterDisplay` component is using the `useCounter` hook to access the `state`, `incrementCounter`, and `decrementCounter` properties from the `CounterContext`. The component displays the current value of the `counter` property as well as the `loading` and `error` properties if they are set to true or non-null, respectively. The component also provides two buttons to increment or decrement the counter value.


-------------
--------------
----------


Give me a counter app using react context api, where state is an object like { counter: 0, loading : false, error: null, success : false}, make a hook to access context data


1 / 1

Sure, here's an example of a counter app using React Context API and a custom hook to access the context data:

First, we need to create the context and the provider:

```js
import React, { createContext, useState } from "react";

export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [state, setState] = useState({ counter: 0, loading: false, error: null, success: false });

  const increment = () => setState({ ...state, counter: state.counter + 1 });
  const decrement = () => setState({ ...state, counter: state.counter - 1 });
  const setLoading = (value) => setState({ ...state, loading: value });
  const setError = (error) => setState({ ...state, error });
  const setSuccess = (value) => setState({ ...state, success: value });

  return (
    <CounterContext.Provider value={{ state, increment, decrement, setLoading, setError, setSuccess }}>
      {children}
    </CounterContext.Provider>
  );
};

```

In this example, we're creating a context called `CounterContext` and a provider component called `CounterProvider`. The provider component is using the `useState` hook to manage the state of the application, which includes a counter, loading flag, error message, and success flag.

The provider component also includes some helper functions for updating the state: `increment`, `decrement`, `setLoading`, `setError`, and `setSuccess`. These functions use the `setState` function to update the state object.

Next, we can create a custom hook to access the context data:

```js
import { useContext } from "react";
import { CounterContext } from "./CounterContext";

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
};

```

This custom hook uses the `useContext` hook to access the `CounterContext`. It simply returns the context object, which includes the state and helper functions defined in the provider component.

Finally, we can use the `useCounter` hook in our components to access the counter state and helper functions:

```js
import React from "react";
import { useCounter } from "./useCounter";

const Counter = () => {
  const { state, increment, decrement, setLoading, setError, setSuccess } = useCounter();

  const handleIncrement = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    setTimeout(() => {
      increment();
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const handleDecrement = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    setTimeout(() => {
      decrement();
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div>
      <h1>{state.counter}</h1>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.success && <p>Success!</p>}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;

```

In this example, we're using the `useCounter` hook to access the `state` object and the `increment` and `decrement` helper functions. We're also using the `setLoading`, `setError`, and `setSuccess` functions to update the loading, error, and success flags when the buttons are clicked.

Note that we're using `setTimeout` to simulate an asynchronous operation (e.g. calling an API). When the operation is complete, we update the state object and reset the loading, error
