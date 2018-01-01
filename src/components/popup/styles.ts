import { StyleSheet, Dimensions } from "react-native";
import { sizes } from '../consts';

const modalHeight = Dimensions.get("window").height / 3;
const modalWidth = Dimensions.get("window").width - 40;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, .6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        borderRadius: 2,
        flexBasis: modalHeight,
        flexGrow: 0,
        width: modalWidth,
        backgroundColor: "#fff",
        ...sizes.shadowStyles,
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "center",
    },
    contentWrapper: {
        flex: 1,
        padding: 10,
        marginTop: 20,
        alignItems: "center",
    },
    buttonWrapper: {
        flexDirection: "row",
    },
});
