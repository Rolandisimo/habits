//@ts-check
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    doneOverlay: {
        backgroundColor: "rgba(255, 255, 255, .8)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
    },
});
