import {
    StyleSheet,
    Dimensions,
} from "react-native";

const padding = 20;
const inputHeight = Dimensions.get("window").width / 5;
const shadowStyles = {
    shadowColor: "rgba(189, 195, 199, 0.7)",
    shadowOpacity: 1.0,
    shadowOffset: {
        width: 0,
        height: 2,
    },
};
export default StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#e7e7e7",
        borderRadius: 2,
        padding,
        margin: 0,
        marginBottom: 10,
        height: inputHeight,
        ...shadowStyles,
    },
    formGroup: {
        margin: 10,
        flexDirection: "column",
    },
    label: {
        marginBottom: 5,
        fontWeight: "200",
    },
    radio: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
    },
});
