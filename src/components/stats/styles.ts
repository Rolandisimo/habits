import { StyleSheet, Dimensions } from "react-native";
import { colors, sizes } from "../consts";

const containerHeight = Dimensions.get("window").height / 5;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.mainDark,
    // backgroundColor: "#93F3BA",
    justifyContent: "center",
   ...sizes.shadowStyles,
    zIndex: 10,
    height: containerHeight,
  },
  statisticContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statistic: {
    justifyContent: "center",
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
  },
  primaryValue: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "100",
  },
  regularValue: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "100",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "100",
  },
});
