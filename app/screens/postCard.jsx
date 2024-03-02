import { useNavigation } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
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
  Alert,
} from "react-native";
import { LIKE_POST } from "./postDetail";
import { GET_ALL_POST } from "./home";

export function PostCard({ data }) {
  const navigation = useNavigation();
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [GET_ALL_POST],
  });

  async function handleLikePost() {
    try {
      await likePost({
        variables: {
          postId: data._id,
        },
      });
      Alert.alert("You liked this post");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }
  return (
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
        <Text style={{ fontWeight: "bold" }}>{data.author.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetail", { _id: data._id })}
      >
        <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
          {data.content}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        {data.imgUrl ? (
          <>
            <Image
              //! image content
              source={{ uri: data.imgUrl }}
              style={{ width: 330, height: 250 }}
              alt={data.imgUrl}
            />
          </>
        ) : (
          <Text>No Image</Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          paddingTop: 5,
        }}
      >
        <TouchableOpacity onPress={handleLikePost}>
          <Text>Like ({data.likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { _id: data._id })}>
          <Text>Comment ({data.comments.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
