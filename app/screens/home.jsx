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
import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { People } from "./people";

export const GET_ALL_POST = gql`
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
            <Ionicons name="person-circle-outline" size="50" color="#3a5998"/>
            <TouchableOpacity>
              <Text
                style={{ fontStyle: "italic", fontSize: 18, paddingRight: 30 }}
                onPress={() => navigation.navigate("CreatePost")}
              >
                What's on your mind?
              </Text>
            </TouchableOpacity>
            <Ionicons name="paper-plane" size="40" color="#3a5998" onPress={() => navigation.navigate("CreatePost")} />
          </View>
          {/* loopingan */}
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
export const IdContext = createContext("");

export default function Home() {
  const [id, setId] = useState("");

  useEffect(() => {
    getId();
  }, []);

  async function getId() {
    const id = await SecureStore.getItemAsync("id");
    setId(id);
  }

  // console.log(id);

  return (
    <IdContext.Provider value={id}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "HomeScreen":
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
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="People" component={People} initialParams={{input: ""}}/>
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} initialParams={{id: id}} />
    </Tab.Navigator>

    </IdContext.Provider>
  );
}
