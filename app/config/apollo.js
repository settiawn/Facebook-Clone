import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://1811-182-253-183-15.ngrok-free.app/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
