import {
    StyleSheet,
    Dimensions,
} from "react-native";

const padding = 20;
const inputHeight = Dimensions.get("window").width / 5;
const datePickerWidth = Dimensions.get("window").width - 60; // padding 20 * 2 + margin 10 * 2
const shadowStyles = {
    shadowColor: "rgba(189, 195, 199, 0.7)",
    shadowOpacity: 1.0,
    shadowOffset: {
        width: 0,
        height: 2,
    },
};
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 1,
        alignItems: "center",
    },
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
        // fontSize: 20,
    },
    label: {
        marginBottom: 5,
        // fontSize: 16,
        fontWeight: "200",
    },
    editIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: "transparent",
    },
    datePicker: {
        padding,
        ...shadowStyles,
        width: datePickerWidth,
        borderRadius: 2,
        height: inputHeight,
        backgroundColor: "#fff",
    },
    radio: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    buttonWrapperEditing: {
        marginBottom: 200,
    },
});
export const datePickerCustomStyles = {
    dateInput: {
        borderWidth: 0,
        height: inputHeight,
        ...shadowStyles,
    },
};
