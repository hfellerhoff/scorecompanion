import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';

export const wrapRootElement = ({ element }: { element: any }) => (
  <ApolloProvider client={client as any}>{element}</ApolloProvider>
);
