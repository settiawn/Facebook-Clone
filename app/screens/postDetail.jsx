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
  Button,
  Alert,
  FlatList,
} from "react-native";
import styles from "./style";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Comment } from "./comment";

const GET_POST_DETAIL = gql`
  query Query($getPostByIdId: String) {
    getPostById(id: $getPostByIdId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
      }
      likes {
        username
      }
      createdAt
      author {
        name
        _id
      }
    }
  }
`;

const COMMENT_POST = gql`
  mutation Mutation($postId: String, $content: String) {
    commentPost(postId: $postId, content: $content) {
      _id
      authorId
      comments {
        content
        username
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation Mutation($postId: String) {
    likePost(postId: $postId) {
      _id
      likes {
        username
      }
    }
  }
`;

export function PostDetail({ navigation, route }) {
  const [comment, setComment] = useState("");
  const { _id } = route.params;
  const { loading, error, data } = useQuery(GET_POST_DETAIL, {
    variables: { getPostByIdId: _id },
  });
  const [addNewComment] = useMutation(COMMENT_POST, {
    refetchQueries: [GET_POST_DETAIL],
  });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [GET_POST_DETAIL],
  });

  async function handleSendComment() {
    try {
      await addNewComment({
        variables: {
          postId: _id,
          content: comment,
        },
      });
      Alert.alert("comment sent");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  async function handleLikePost() {
    try {
      await likePost({
        variables: {
          postId: _id,
        },
      });
      Alert.alert("You liked this post");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
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

  console.log(data.getPostById.likes);
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
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Image
              //! profil image
              source={require("../assets/fb.png")}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold" }}>
              {data.getPostById.author.name}
            </Text>
          </View>
          <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
            {data.getPostById.content}
          </Text>
          <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
            Tags : {data.getPostById.tags}
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              alignItems: "center",
            }}
          >
            <Image
              //! image post
              source={{ uri: data.getPostById.imgUrl }}
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
            <TouchableOpacity onPress={handleLikePost}>
              <Text>Like ({data.getPostById.likes.length}) </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Comment ({data.getPostById.comments.length})</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ height: 300 }}>
              <ScrollView>
                {data.getPostById.comments.map((x, i) => {
                  return <Comment key={i} data={x} />;
                })}
              </ScrollView>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "white",
                marginBottom: 15,
                padding: 10,
                paddingBottom: 25,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  multiline={true}
                  onChangeText={setComment}
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    paddingRight: 150,
                  }}
                  placeholder="Type a comment..."
                />
                <TouchableOpacity onPress={handleSendComment}>
                  <Text>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
