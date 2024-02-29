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
} from "react-native";
import styles from "./style"

export function Register({navigation, route}) {
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
            <TextInput style={styles.inputArea} placeholder="Enter your name" />
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.inputArea}
              placeholder="Enter your Username"
            />
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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

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
