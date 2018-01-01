import { StyleSheet } from "react-native";
import { sizes, colors } from '../../../consts';

const padding = 20;

export default StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 2,
        padding,
        margin: 0,
        marginBottom: 10,
        height: sizes.inputHeight,
        ...sizes.shadowStyles,
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
