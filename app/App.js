import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Register } from "./screens/register";
import { Login } from "./screens/login";
import Home from "./screens/home";
import { CreatePost } from "./screens/createPost";
import { PostDetail } from "./screens/postDetail";
import { Profile } from "./screens/profile";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Register"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
