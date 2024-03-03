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
import { UserCard } from "./userCard";
import { gql, useQuery } from "@apollo/client";

export const SEARCH_USER = gql`
  query Query($input: String) {
    findUserByName(input: $input) {
      _id
      name
      username
      email
    }
  }
`;
export function People({ navigation, route }) {
  const { input } = route.params;
  console.log(route.params);
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: { input },
  });

  console.log(typeof data, '<<<<<');

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

  if (data.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Result</Text>
      </View>
    );

  // console.log(loading, error, data.findUserByName);
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
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 10,
              marginVertical: 5,
            }}
          >
            <View style={{ height: 700 }}>
              <ScrollView>
                {data.findUserByName === undefined ? (
                  <Text>No Result</Text>
                ) : (
                  data.findUserByName.map((x, i) => {
                    return <UserCard key={i} data={x} />;
                  })
                )}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
