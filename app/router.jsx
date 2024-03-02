import { Register } from "./screens/register";
import { Login } from "./screens/login";
import Home from "./screens/home";
import { CreatePost } from "./screens/createPost";
import { PostDetail } from "./screens/postDetail";
import { Profile } from "./screens/profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "./App";

const Stack = createNativeStackNavigator();

export function Router() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}
