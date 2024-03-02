import {
  Text,
  View,
  Image,
} from "react-native";

export function Comment({ data }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "white",
      }}
    >
      <Image
        //! profil image
        source={require("../assets/fb.png")}
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>{data.username}</Text>
        <Text style={{ paddingTop: 5 }}>{data.content}</Text>
      </View>
    </View>
  );
}
