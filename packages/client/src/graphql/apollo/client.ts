import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // https://localhost:4000/graphql/
    // credentials: 'include',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
