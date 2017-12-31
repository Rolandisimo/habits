import { StyleSheet, Dimensions } from "react-native";
import { colors } from '../consts';

const containerHeight = Dimensions.get("window").height / 4;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    shadowColor: colors.shadowColor,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 5,
    },
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
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0,
    alignItems: "center",
  },
  primaryValue: {
    fontSize: 55,
    fontWeight: "100",
  },
  regularValue: {
    fontSize: 55,
    fontWeight: "100",
  },
  title: {
    fontSize: 16,
    fontWeight: "100",
  },
});
