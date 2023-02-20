import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter } from 'react-router-dom'
import './store'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
