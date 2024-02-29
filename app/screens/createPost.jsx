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
  SafeAreaView,
} from "react-native";
import styles from "./style";

export function CreatePost({ navigation, route }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingVertical: 20,
          backgroundColor: "white",
        }}
      >
        <Image
          //! back button
          source={require("../assets/fb.png")}
          style={{ width: 40, height: 40, marginRight: 8 }}
          
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Create Post</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#3a5998",
            padding: 10,
            borderRadius: 10,
            marginLeft: 90,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          backgroundColor: "white",
        }}
      >
        <TextInput
          multiline={true}
          style={{
            backgroundColor: "white",
            padding: 10,
          }}
          placeholder="What's on your mind?"
        />
      </View>
    </SafeAreaView>
  );
}
