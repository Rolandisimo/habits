import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { sizes, colors } from '../consts';

const buttonWidth = Dimensions.get("window").width / 2;

export default StyleSheet.create({
    button: {
        alignSelf: "center",
        shadowColor: colors.shadowColor,
        shadowOpacity: 1.0,
        shadowOffset: sizes.shadowOffset,
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 5,
        margin: 10,
        padding: 20,
        alignItems: "center",
        width: buttonWidth,
    },
    label: {
        fontSize: 20,
        color: "#fff",
    },
    small: {
        padding: 10,
        flex: 1,
    },
});
