import { StyleSheet, Dimensions } from "react-native";

const containerHeight = Dimensions.get("window").height / 4;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(78,205,196, .7)',
    justifyContent: 'center',
    shadowColor: "rgba(189, 195, 199, 0.9)",
    shadowOpacity: 1.0,
    shadowOffset: { height: 5 },
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
    fontWeight: "bold",
    alignItems: "center",
  },
  primaryValue: {
    fontSize: 50,
    fontWeight: -.4,

  },
  regularValue: {
    fontSize: 20,
    fontWeight: -0.6,
  },
  divide: {
    height: containerHeight,
    width: 1,
    backgroundColor: "rgba(34, 49, 63, .7)",
  },
  title: {
    fontSize: 16,
    fontWeight: -0.6,
  },
});
