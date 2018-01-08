import { StyleSheet } from "react-native";
import {
    colors,
    sizes,
} from "../../components/consts";

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.lightBorderColor,
        borderRadius: 2,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        height: sizes.inputHeight,
        backgroundColor: "#fff",
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
    icon: {
        width: sizes.iconWidth,
        height: sizes.iconWidth * 0.28,
        opacity: .10,
    },
});
