import {
    StyleSheet,
} from "react-native";
import {
    sizes,
    BASE_FONT_SIZE,
    inputGeneralStyles,
} from '../../../consts';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        margin: 1,
    },
    input: {
        ...inputGeneralStyles,
        padding: sizes.inputPadding,
    },
    formGroup: {
        margin: 10,
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
        // flexShrink: 0,
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
