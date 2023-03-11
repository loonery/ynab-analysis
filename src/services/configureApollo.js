import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

export const configureApollo = () => {
    
    // programatically determine the transactions endpoint based on budgetId
    const budgetId = process.env.REACT_APP_BUDGET_ID;
    const budgetEndpoint = 'https://api.youneedabudget.com/v1/budgets/';
    const transactionsEndpoint = 'https://api.youneedabudget.com/v1/budgets/' + budgetId + '/transactions';
    const categoriesEndpoint = 'https://api.youneedabudget.com/v1/budgets/' + budgetId + '/categories';
    

    // link Apollo Client with the REST endpoints
    const token = process.env.REACT_APP_API_KEY;
    const link = new RestLink({
        // define the rest endpoints for which to hook this Apollo link
        endpoints: {
            budgets: {
                uri: 'https://api.youneedabudget.com/v1/budgets', 
                responseTransformer: async (response, typename) => response.json().then((data) => data.data[typename])
            },
            transactions: {
                uri: transactionsEndpoint,
                responseTransformer: async (response, typename) => response.json().then((data) => data.data[typename])
            },
            categories: {
                uri: categoriesEndpoint,
                responseTransformer: async (response, typename) => response.json().then((data) => data.data[typename])
            }
        },
        // authentication credentials
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
        link: link
    });

    return { client, link }
}