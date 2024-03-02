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
import styles from "./style";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_POST } from "./home";

const CREATE_POST = gql`
  mutation Mutation($newPost: newPost) {
    createPost(newPost: $newPost) {
      _id
      content
      tags
      imgUrl
      authorId
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export function CreatePost({ navigation, route }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const [submitPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_ALL_POST],
  });

  async function handleCreatePost() {
    try {
      const tag = tags.split(" ");
      const newPost = {
        content,
        imgUrl,
        tags: tag,
      };
      await submitPost({
        variables: {
          newPost,
        },
      });
      Alert.alert("Post created");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

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
          onPress={handleCreatePost}
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
          onChangeText={setContent}
          placeholder="What's on your mind?"
        />
        <TextInput
          multiline={true}
          onChangeText={setImgUrl}
          style={{
            backgroundColor: "white",
            padding: 10,
          }}
          placeholder="Image URL"
        />
        <TextInput
          multiline={true}
          onChangeText={setTags}
          style={{
            backgroundColor: "white",
            padding: 10,
          }}
          placeholder="Tags"
        />
      </View>
    </SafeAreaView>
  );
}
