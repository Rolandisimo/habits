//@ts-check
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#e7e7e7",
        borderRadius: 2,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        height: Dimensions.get("window").width / 5,
        shadowColor: "rgba(189, 195, 199, 0.7)",
        shadowOpacity: 1.0,
        shadowOffset: {
            height: 2,
        },
    },
    habit: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    habitName: {
        width: Dimensions.get("window").width / 2,
    },
});
