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
import styles from "./style";

export function PostDetail({ navigation, route }) {
  const { _id } = route.params
  console.log(_id);
  return (
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
        <Text style={{ fontWeight: "bold" }}>Nama Lengkap User</Text>
      </View>
      <Text style={{ fontWeight: "400", padding: 10, paddingTop: 0 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio,
        sapiente. Accusantium aliquam voluptates iure quia eveniet tenetur
        quibusdam sit delectus earum deleniti at error veniam, laboriosam
        doloribus dicta quo incidunt?
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Image
          //! profil image
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
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          marginVertical: 5,
        }}
      >
        {/* komen"an looping below */}
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
            <Text style={{ fontWeight: "bold" }}>Nama Lengkap User</Text>
            <Text style={{ paddingTop: 5 }}>
              Lorem ipsum dolor sit amet consectasdadsdsaasdadssadddsa
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
