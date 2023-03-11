import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';


// link Apollo Client with the REST endpoints
const token = process.env.REACT_APP_API_KEY;
const restLink = new RestLink({
  endpoints: {
    
    budgets: {
      uri: 'https://api.youneedabudget.com/v1/budgets', 
      responseTransformer: async (response, typename) => response.json().then((data) => data.data[typename])
    },
    categories: 'https://api.youneedabudget.com/v1/categories', 
    months: 'https://api.youneedabudget.com/v1/months', 
    payees: 'https://api.youneedabudget.com/v1/payees', 
    accounts: 'https://api.youneedabudget.com/v1/accounts'
  },
  uri: 'https://api.youneedabudget.com/v1/',
  credentials: 'same-origin',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
});

// Apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
})

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
