import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://1811-182-253-183-15.ngrok-free.app/",
  cache: new InMemoryCache(),
});

export default client;
