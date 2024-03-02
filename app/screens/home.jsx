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
  ScrollView,
} from "react-native";
import styles from "./style";
import { Profile } from "./profile";
import { gql, useQuery } from "@apollo/client";
import { PostCard } from "./postCard";

const GET_ALL_POST = gql`
  query Query {
    getAllPosts {
      _id
      content
      tags
      imgUrl
      authorId
      likes {
        username
      }
      createdAt
      author {
        _id
        name
        username
        email
      }
      comments {
        username
        content
      }
    }
  }
`;

function HomeScreen({ navigation, route }) {
  const { loading, error, data } = useQuery(GET_ALL_POST);
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>`Error! ${error.message}`</Text>
      </View>
    );

  console.log(data.getAllPosts.length);

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
          <ScrollView>
            {data.getAllPosts.map((x, i) => {
              return <PostCard key={i} data={x} />;
            })}
          </ScrollView>
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
