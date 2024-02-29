import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("./assets/fb.png")}
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
              placeholderTextColor="white"
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", margin: 20 }}>Or</Text>
          <Text style={{ fontWeight: "bold", color: "#3a5998" }}>
            Already have an account?
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#242526",
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3a5998",
    paddingLeft: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
  inputArea: {
    width: 300,
    borderWidth: 2,
    borderColor: "#3a5998",
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#3a5998",
    padding: 3,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#3a5998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
