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
import * as SecureStore from 'expo-secure-store';
import { useContext } from "react";
import { AuthContext } from "../App";

export function Profile({ navigation, route }) {
  const {isSignedIn, setisSignedIn} = useContext(AuthContext)
  async function handleLogout(){
    try {
      await SecureStore.deleteItemAsync("accessToken")
      setisSignedIn(false)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            backgroundColor: "white",
          }}
        >
          <View style={styles.homeBanner}>
            <Image
              source={require("../assets/fb.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.homeText}>HacktivBook</Text>
            <TouchableOpacity
              style={{
                marginLeft: 70,
                backgroundColor: "skyblue",
                padding: 5,
                borderRadius: 8,
              }}
              onPress={handleLogout}
            >
              <Text
                style={{ fontWeight: "bold", opacity: 50, color: "#3a5998" }}
              >
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "column",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Image
              //! profil image
              source={require("../assets/fb.png")}
              style={{ width: 130, height: 130, marginRight: 8 }}
            />
            <Text
              style={{ fontWeight: "bold", fontSize: 35, marginVertical: 10 }}
            >
              Nama User
            </Text>
            <Text>@namauser - namauser@mail.com</Text>
          </View>
          <Text
            style={{
              padding: 10,
              fontWeight: "bold",
            }}
          >
            Search User
          </Text>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              paddingTop: 5,
              borderRadius: 10,
            }}
          >
            <TextInput
              style={{
                borderRadius: 10,
                width: 280,
                borderWidth: 2,
                padding: 4,
              }}
              placeholder="Name.."
            />
            <TouchableOpacity
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingTop: 5,
            }}
          >
            <TouchableOpacity>
              <Text>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}>
              <Text>Followers</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "white",
              }}
            >
              <Image
                //! profil image
                source={require("../assets/fb.png")}
                style={{ width: 70, height: 70, marginRight: 8 }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>Nama Lengkap User</Text>

                <TouchableOpacity>
                  <Text>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
