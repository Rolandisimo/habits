import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { colors, sizes } from "../../../consts";

const padding = 20;
const datePickerWidth = Dimensions.get("window").width - 60; // padding 20 * 2 + margin 10 * 2
const shadowStyles = {
    shadowColor: colors.shadowColor,
    shadowOpacity: 1.0,
    shadowOffset: sizes.shadowOffset,
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
        borderColor: colors.lightBorderColor,
        backgroundColor: "#fff",
        borderRadius: 2,
        padding,
        margin: 0,
        marginBottom: 10,
        height: sizes.inputHeight,
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
        height: sizes.inputHeight,
        backgroundColor: "#fff",
    },
    radio: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
    },
    buttonWrapper: {
        marginTop: 50,
        marginBottom: 20,
    },
    buttonWrapperEditing: {
        marginBottom: 200,
    },
});
export const datePickerCustomStyles = {
    dateInput: {
        borderWidth: 0,
        height: sizes.inputHeight,
        ...shadowStyles,
    },
};
