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
  Button,
  Alert,
} from "react-native";
import styles from "./style";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation Mutation($newUser: newUser) {
    register(newUser: $newUser) {
      _id
      name
      username
      email
    }
  }
`;

export function Register({ navigation, route }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleRegister, { data, loading, error }] = useMutation(REGISTER);

  async function submitRegister() {
    try {
      const newUser = {
        email: email,
        name: name,
        password: password,
        username: username,
      };
      await handleRegister({
        variables: {
          newUser,
        },
      });
      Alert.alert("Register Success");
      navigation.navigate("Login");
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
            <Text style={styles.text}>Name</Text>
            <TextInput
              onChangeText={setName}
              style={styles.inputArea}
              placeholder="Enter your name"
            />
            <Text style={styles.text}>Username</Text>
            <TextInput
              onChangeText={setUsername}
              style={styles.inputArea}
              placeholder="Enter your Username"
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              style={styles.inputArea}
              placeholder="Enter your email"
            />

            <Text style={styles.text}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.inputArea}
              placeholder="Enter your password"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={submitRegister}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontWeight: "bold", margin: 20 }}>Or</Text>
          <TouchableOpacity onPress={() => navigation.goBack("Login")}>
            <Text style={{ fontWeight: "bold", color: "#3a5998" }}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
