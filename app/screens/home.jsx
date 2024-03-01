import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
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
import { Profile } from "./profile";

function HomeScreen({ navigation, route }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style={styles.homeBanner}>
            <Image
              source={require("../assets/fb.png")}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.homeText}>HacktivBook</Text>
          </View>
          <View style={styles.statusBanner}>
            <Image
              //! profil image
              source={require("../assets/fb.png")}
              style={{ width: 35, height: 35, marginRight: 8 }}
            />
            <TouchableOpacity>
              <Text
                style={{ fontStyle: "italic", fontSize: 18, paddingRight: 50 }}
                onPress={() => navigation.navigate("CreatePost")}
              >
                What's on your mind?
              </Text>
            </TouchableOpacity>
            <Image
              //! icon gambar
              source={require("../assets/fb.png")}
              style={{ width: 35, height: 35, marginRight: 8 }}
            />
          </View>

          {/* Post data below => render pake flatlist */}
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              margin: 10,
            }}
          >
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Image
                //! profil image
                source={require("../assets/fb.png")}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Text style={{ fontWeight: "bold" }}>Nama Lengkap User</Text>
            </View>
            <TouchableOpacity
            onPress={() => navigation.navigate("PostDetail")}
            >
              <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio, sapiente. Accusantium aliquam voluptates iure quia
                eveniet tenetur quibusdam sit delectus earum deleniti at error
                veniam, laboriosam doloribus dicta quo incidunt?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              <Image
                //! profil image
                source={require("../assets/fb.png")}
                style={{ width: 330, height: 250 }}
              />
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
                <Text>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("PostDetail")}
              >
                <Text>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "People":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Notification":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            case "Profile":
              iconName = focused ? "menu" : "menu-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3a5998",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="People" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
