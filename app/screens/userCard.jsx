import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SEARCH_USER } from "./people";
import { USER_DETAIL } from "./profile";
import Ionicons from "react-native-vector-icons/Ionicons";

const FOLLOW_USER = gql`
  mutation FollowUser($followUserId: String) {
    followUser(id: $followUserId) {
      _id
      followingId
      followerId
    }
  }
`;
export function UserCard({ data }) {
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [USER_DETAIL],
  });

  console.log(data, "<<");

  async function handleFollowUser() {
    try {
      console.log("aaaa");
      await followUser({
        variables: {
          followUserId: data._id,
        },
      });
      Alert.alert("You followed this user");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "white",
      }}
    >
      <Ionicons name="person-circle-outline" size="70" color="#3a5998" />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>{data.username}</Text>

        <TouchableOpacity 
        style={{
          backgroundColor: "skyblue",
          padding: 5,
          borderRadius: 8,
          margin: 5
        }}
        onPress={handleFollowUser}>
          <Text
          style={{ fontWeight: "bold", opacity: 50, color: "#3a5998" }}
          >Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
