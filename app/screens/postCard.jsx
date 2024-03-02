import { useNavigation } from "@react-navigation/native";
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
} from "react-native";

export function PostCard({ data }) {
  const navigation = useNavigation();
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
        <Image
          //! image content
          source={require("../assets/fb.png")}
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
        <TouchableOpacity>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}>
          <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
