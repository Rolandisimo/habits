import {
    StyleSheet,
    Dimensions,
} from "react-native";
import {
    sizes,
    BASE_FONT_SIZE,
    inputGeneralStyles,
} from '../../../consts';

export const habitViewScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        margin: 1,
        width: Dimensions.get("window").width,
    },
    input: {
        ...inputGeneralStyles,
        padding: sizes.inputPadding,
    },
    formGroup: {
        margin: 20,
        flexDirection: "column",
    },
    label: {
        marginBottom: 5,
        fontWeight: "200",
    },
    datePicker: {
        ...inputGeneralStyles,
    },
    buttonWrapper: {
        marginTop: 50,
        marginBottom: 20,
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
        flexShrink: 0,
    },
    disabled: {
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
        flexDirection: "row"
    },
    dateText: {
        fontSize: BASE_FONT_SIZE,
        padding: 0,
        margin: 0,
    },
};
