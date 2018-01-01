import { StyleSheet } from "react-native";
import {
    colors,
    sizes,
    BASE_FONT_SIZE,
} from "../../components/consts";

const inputGeneralStyles = {
    borderWidth: 1,
    borderColor: colors.lightBorderColor,
    borderRadius: 2,
    margin: 0,
    marginBottom: 10,
    height: sizes.inputHeight,
    width: sizes.inputWidth,
    ...sizes.shadowStyles,
}

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 2,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        height: sizes.inputHeight,
        ...sizes.shadowStyles,
    },
    habit: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    habitName: {
        width: sizes.inputTextMaxLength,
    },
});

export const habitViewScreenStyles = StyleSheet.create({
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
 
