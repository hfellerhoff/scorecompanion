/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://localhost:4000",
    credentials: "include",
    fetch,
  }),
  cache: new InMemoryCache(),
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
