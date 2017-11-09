import {
    StyleSheet,
    Dimensions,
} from "react-native";

const buttonWidth = Dimensions.get("window").width / 2;

export default StyleSheet.create({
    button: {
        alignSelf: "center",
        shadowColor: "rgba(189, 195, 199, 0.7)",
        shadowOpacity: 1.0,
        shadowOffset: {
            height: 2,
        },
        borderWidth: 1,
        borderColor: "#e7e7e7",
        borderRadius: 5,
        marginTop: 50,
        padding: 20,
        alignItems: "center",
        width: buttonWidth,
        backgroundColor: "rgba(231, 76, 60, .8)",
    },
    label: {
        fontSize: 20,
        color: "#fff",
    }
});
