import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.scorecompanion.com/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
