import { StyleSheet } from "react-native";
import { colors } from '../../../consts';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        borderRadius: 2,
        padding: 20,
        paddingTop: 60,
    },
    message: {
        fontSize: 25,
        color: colors.backgroundTextColor,
        textAlign: "center",
    },
});
