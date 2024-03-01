import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { createContext, useEffect, useState } from "react";
import { Router } from "./router";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext(false);

export default function App() {
  const [isSignedIn, setisSignedIn] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        let token = await SecureStore.getItemAsync("accessToken");
        if (token) setisSignedIn(true);
      } catch (error) {
        console.log(error);
      }
    }
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setisSignedIn }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
