import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter } from 'react-router-dom'
import { configureApollo } from './services/configureApollo';
import { ApolloProvider } from '@apollo/client';

// use helper function to configigre the Apollo client
const { client } = configureApollo();

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
);
