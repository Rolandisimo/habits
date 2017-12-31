import { StyleSheet } from "react-native";
import { colors, sizes } from "../../components/consts";

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 2,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        height: sizes.inputHeight,
        shadowColor: colors.shadowColor,
        shadowOpacity: 1.0,
        shadowOffset: sizes.shadowOffset,
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
