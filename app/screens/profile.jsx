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
  FlatList,
} from "react-native";
import styles from "./style";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { gql, useQuery } from "@apollo/client";
import { UserCard } from "./userCard";
import { IdContext } from "./home";
import Ionicons from "react-native-vector-icons/Ionicons";

export const USER_DETAIL = gql`
  query Query($findUserByIdId: String) {
    findUserById(id: $findUserByIdId) {
      _id
      name
      username
      email
      followerDetails {
        _id
        name
        username
      }
      followingDetails {
        _id
        name
        username
      }
    }
  }
`;

export function Profile({ navigation, route }) {
  const { isSignedIn, setisSignedIn } = useContext(AuthContext);
  const { id } = route.params;
  // console.log(route.params);
  // console.log(useContext(IdContext), "<context");
  // console.log("hello");
  const { loading, error, data } = useQuery(USER_DETAIL, {
    variables: { findUserByIdId: useContext(IdContext) },
  });

  const [followTab, setFollowTab] = useState(false);
  const [followerTab, setFollowerTab] = useState(false);
  const [searchTab, setSearchTab] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  async function handleLogout() {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      setisSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

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

  // console.log(typeof data.findUserById.followingDetails, "floweing");
  // console.log(data.findUserById.followerDetails.length, "fllower");

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
              justifyContent: "center"
            }}
          >
            <Ionicons name="person-circle-outline" size="100" color="#3a5998" />
            <Text
              style={{ fontWeight: "bold", fontSize: 35, marginVertical: 10 }}
            >
              {data.findUserById.name}
            </Text>
            <Text>
              @{data.findUserById.username} - {data.findUserById.email}
            </Text>
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
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TextInput
              onChangeText={setSearchInput}
              style={{
                borderRadius: 10,
                width: 270,
                borderWidth: 2,
                padding: 5,
              }}
              placeholder="Name.."
            />
            <TouchableOpacity
              style={{
                padding: 7,
                marginLeft: 4,
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setFollowerTab(false);
                setFollowTab(false);
                setSearchTab(true);
                navigation.navigate("People", { input: searchInput });
              }}
            >
              <Ionicons name="search" size="20" color="#3a5998"/>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
              paddingTop: 5,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "skyblue",
                padding: 5,
                borderRadius: 8,
                margin: 5
              }}
              onPress={() => {
                setFollowTab(true);
                setFollowerTab(false);
                setSearchTab(false);
              }}
            >
              <Text
                style={{ fontWeight: "bold", opacity: 50, color: "#3a5998" }}
              >
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "skyblue",
                padding: 5,
                borderRadius: 8,
                margin: 5
              }}
              onPress={() => {
                setFollowerTab(true);
                setFollowTab(false);
                setSearchTab(false);
              }}
            >
              <Text
                style={{ fontWeight: "bold", opacity: 50, color: "#3a5998" }}
              >
                Followers
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginVertical: 5,
              height: 300,
            }}
          >
            <ScrollView>
              {followTab ? (
                <>
                  {data.findUserById.followingDetails.length === 0 ? (
                    <Text>No Following</Text>
                  ) : (
                    <View
                      style={{ flexGrow: 1 }}
                      contentContainerStyle={{ paddingBottom: 100 }}
                    >
                      {data.findUserById.followingDetails.map((x, i) => (
                        <UserCard key={i} data={x} />
                      ))}
                    </View>
                  )}
                </>
              ) : followerTab ? (
                <>
                  {data.findUserById.followerDetails.length === 0 ? (
                    <Text>No Follower</Text>
                  ) : (
                    <View
                      style={{ flexGrow: 1 }}
                      contentContainerStyle={{ paddingBottom: 100 }}
                    >
                      {data.findUserById.followerDetails.map((x, i) => (
                        <UserCard key={i} data={x} />
                      ))}
                    </View>
                  )}
                </>
              ) : (
                searchTab && <View></View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
