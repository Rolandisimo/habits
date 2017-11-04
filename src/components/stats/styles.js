import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    shadowColor: "rgba(189, 195, 199, 0.7)",
    shadowOpacity: 1.0,
    shadowOffset: { height: 2 },
  },
  stat: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  }
});
