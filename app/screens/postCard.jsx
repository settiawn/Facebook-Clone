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
import Ionicons from "react-native-vector-icons/Ionicons";

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

  const tags = data.tags.join(", ");

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        margin: 10,
      }}
    >
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Ionicons name="person-circle-outline" size="50" color="#3a5998" />
        <View style={{ flexDirection: "column", paddingLeft: 10, paddingTop: 5,}}>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>{data.author.name}</Text>
        <Text style={{ fontSize: 14 }}>@{data.author.username}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetail", { _id: data._id })}
      >
        <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
          {data.content}
        </Text>
        {data.tags ? (
          <>
            <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
              Tags : {tags}
            </Text>
          </>
        ) : (
          <View></View>
        )}
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
              source={{ uri: data.imgUrl }}
              style={{ width: 330, height: 250 }}
              alt={data.imgUrl}
            />
          </>
        ) : (
          <View></View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          padding: 10,
          paddingTop: 5,
        }}
      >
        <TouchableOpacity onPress={handleLikePost} style={{ flexDirection: "row"}}>
        <Ionicons name="thumbs-up-sharp" size="30" color="#3a5998" />
          <Text>({data.likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={{ flexDirection: "row"}}
          onPress={() => navigation.navigate("PostDetail", { _id: data._id })}
        >
        <Ionicons name="chatbox-sharp" size="30" color="#3a5998" />
          <Text>({data.comments.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row"}}>
        <Ionicons name="arrow-redo-sharp" size="30" color="#3a5998" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
