import { StyleSheet } from "react-native";
import {
    sizes,
    inputGeneralStyles,
} from '../../../consts';

export default StyleSheet.create({
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
    radio: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
    },
});
