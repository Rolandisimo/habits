import { StyleSheet } from "react-native";
import { sizes } from '../../../consts';

export default StyleSheet.create({
    doneOverlay: {
        backgroundColor: "rgba(255, 255, 255, .9)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
    },
    icon: {
        width: sizes.iconWidth, 
        height: sizes.iconWidth * 0.7129,
    }
});
