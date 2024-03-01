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
} from "react-native";
import styles from "./style";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value

  mutation IncrementCounter {
    currentValue
  }
`;

export function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const [mutateFunction, { data, loading, error }] =
      useMutation(INCREMENT_COUNTER);
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
              style={styles.inputArea}
              placeholder="Enter your email"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputArea}
              placeholder="Enter your password"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
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
