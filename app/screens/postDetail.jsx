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
import Ionicons from "react-native-vector-icons/Ionicons";

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

export const LIKE_POST = gql`
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
  // console.log(_id);
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

  const tags = data.getPostById.tags.join(", ");

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
          <ScrollView>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Ionicons
                name="person-circle-outline"
                size="50"
                color="#3a5998"
              />
              <Text
                style={{ fontWeight: "bold", paddingTop: 10, paddingLeft: 10 }}
              >
                {data.getPostById.author.name}
              </Text>
            </View>
            <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
              {data.getPostById.content}
            </Text>
            {data.getPostById.tags ? (
              <>
                <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
                  Tags : {tags}
                </Text>
              </>
            ) : (
              <View></View>
            )}
            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                alignItems: "center",
              }}
            >
              {data.getPostById.imgUrl ? (
                <>
                  <Image
                    //! image content
                    source={{ uri: data.getPostById.imgUrl }}
                    style={{ width: 330, height: 250 }}
                    alt={data.getPostById.imgUrl}
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
                padding: 10,
                paddingTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={handleLikePost}
                style={{ flexDirection: "row" }}
              >
                <Ionicons name="thumbs-up-sharp" size="30" color="#3a5998" />
                <Text>({data.getPostById.likes.length}) </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Ionicons name="chatbox-sharp" size="30" color="#3a5998" />
                <Text>({data.getPostById.comments.length})</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              {data.getPostById.comments.map((x, i) => {
                return <Comment key={i} data={x} />;
              })}
            </View>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginVertical: 5,
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
            <TouchableOpacity onPress={handleSendComment} style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                  width: 50,
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
