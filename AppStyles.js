import {
    StyleSheet,
    Dimensions,
} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
});

// Probably redundant
export const generalStyles = StyleSheet.create({
    smallTitle: {
        fontSize: 20,
        color: "#34495e",
    },
    buttonMain: {
        borderWidth: 1,
        borderColor: "rgba(46, 204, 113, .8)",
        padding: 10,
        borderRadius: 5,
    },
    breakline: {
        height: 1,
        width: Dimensions.get("window").width / 10,
        backgroundColor: "rgba(189, 195, 199, 0.7)",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
    },
});
