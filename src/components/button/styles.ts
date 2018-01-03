import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { sizes, colors } from '../consts';

const buttonWidth = Dimensions.get("window").width / 2.5;

export default StyleSheet.create({
    button: {
        alignSelf: "center",
        ...sizes.shadowStyles,
        borderWidth: 2,
        borderColor: colors.mainColor,
        borderRadius: 100,
        margin: 7.5,
        padding: 15,
        alignItems: "center",
        width: buttonWidth,
        backgroundColor: colors.mainColor,
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
