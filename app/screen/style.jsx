import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3a5998",
    paddingLeft: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
  },
  inputArea: {
    width: 300,
    borderWidth: 2,
    borderColor: "#3a5998",
    height: 40,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#3a5998",
    padding: 3,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#3a5998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default styles
