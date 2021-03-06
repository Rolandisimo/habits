import { StyleSheet, Dimensions } from "react-native";
import {
    sizes,
    BASE_FONT_SIZE,
    inputGeneralStyles,
} from "../../../consts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 1,
        width: Dimensions.get("window").width,
    },
    input: {
        ...inputGeneralStyles,
        padding: sizes.inputPadding,
        backgroundColor: "#fff",
    },
    formGroup: {
        margin: 20,
        flexDirection: "column",
    },
    formGroupHorizontal: {
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginBottom: 5,
        fontWeight: "200",
    },
    labelHorizontal: {
        marginRight: 10,
        fontWeight: "200",
    },
    datePicker: {
        ...inputGeneralStyles,
        padding: sizes.inputPadding,
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
        flex: 1,
        padding: 0,
        margin: 0,
        height: sizes.inputHeight,
        flexDirection: "row",
    },
    dateTouchBody: {
        flex: 1,
        padding: 0,
        margin: 0,
        height: sizes.inputHeight,
        flexDirection: "row",
    },
    dateText: {
        fontSize: BASE_FONT_SIZE,
    },
};
