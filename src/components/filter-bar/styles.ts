import { StyleSheet, Dimensions } from "react-native";
import {
    colors,
    sizes,
    BASE_FONT_SIZE,
} from "../../components/consts";


export const filterBarHeight = 40;
export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        flex: 1,
        flexBasis: filterBarHeight,
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
        overflow: "hidden",
        
    },
    filterLabel: {
        fontSize: BASE_FONT_SIZE - 2,
        marginRight: 5,
    },
    filterMode: {
        color: colors.dangerColor,
        fontWeight: "600",
    },
    filterOption: {
        borderWidth: 1,
        borderColor: colors.mainColor,
        borderRadius: 4,
        padding: 10,
        flex: 1,
    },
    filterOptionLabel: {
        textAlign: "center",
    }
});
export const filterOptionsContainer = {
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, .9)",
    borderColor: colors.lightBorderColor,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    opacity: 0,
    flexShrink: 0,
    flexGrow: 1,
    width: Dimensions.get("window").width,
    top: filterBarHeight,
    position: "absolute",
    ...sizes.shadowStyles,
};
 