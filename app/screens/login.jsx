import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./style";
import { useContext, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../App";
import * as SecureStore from 'expo-secure-store';

const LOGIN = gql`
  mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      accessToken
      id
    }
  }
`;

export function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleLogin, { data, loading, error }] = useMutation(LOGIN);

  const {isSignedIn, setisSignedIn} = useContext(AuthContext)

  async function submitLogin() {
    try {
      const {data} = await handleLogin({
        variables: {
          email,
          password,
        },
      });
      console.log(data.login);
      await SecureStore.setItemAsync("accessToken", data.login.accessToken)
      await SecureStore.setItemAsync("id", data.login.id)
      Alert.alert("Login Success");
      setisSignedIn(true)
    } catch (err) {
      Alert.alert(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/fb.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.mainText}>HacktivBook</Text>
          </View>
          <View style={{ flex: 0 }}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              style={styles.inputArea}
              placeholder="Enter your email"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.inputArea}
              placeholder="Enter your password"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={submitLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", margin: 20 }}>Or</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontWeight: "bold", color: "#3a5998" }}>
              Don't have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
