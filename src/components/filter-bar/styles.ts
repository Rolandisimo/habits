import { StyleSheet } from "react-native";
import {
    colors,
    sizes,
    BASE_FONT_SIZE,
} from "../../components/consts";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        flex: 1,
        flexBasis: 40,
        flexGrow: 0,
        alignItems: "center",
        justifyContent: "center",
        ...sizes.shadowStyles,
        zIndex: 10,
    },
    innerContainer: {
        padding: 10,
        flex: 1,
        flexGrow: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    filterLabel: {
        fontSize: BASE_FONT_SIZE - 2,
        marginRight: 5,
    },
    filterMode: {
        color: colors.dangerColor,
        fontWeight: "600",
    },
});
 