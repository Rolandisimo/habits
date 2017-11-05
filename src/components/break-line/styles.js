import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  line: {
    height: 1,
    width: Dimensions.get("window").width / 10,
    backgroundColor: "rgba(78,205,196, .5)",
    margin: 10,
    alignSelf: "center",
  },
});
