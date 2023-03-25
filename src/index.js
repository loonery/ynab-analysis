import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter } from 'react-router-dom'
import { store } from './store';
import { Provider } from 'react-redux';

// use helper function to configigre the Apollo client
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
