import {
  Text,
  View,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function Comment({ data }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "white",
      }}
    >
      <Ionicons name="person-circle-outline" size="50" color="#3a5998" />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>{data.username}</Text>
        <Text style={{ paddingTop: 5 }}>{data.content}</Text>
      </View>
    </View>
  );
}
