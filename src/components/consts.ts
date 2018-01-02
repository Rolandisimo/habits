// Constants file 
// - Colors
// - Sizes
// Etc

import { Dimensions } from "react-native";

const shadowColor = "rgba(189, 195, 199, 0.7)";
export const BASE_FONT_SIZE = 16;

export const colors = {
    mainColor: "rgba(78,205,196, .7)",
    successColor: "#2ecc71",
    dangerColor: "#e74c3c",
    shadowColor,
    warningColor: "#f39c12",
    primaryButtonColor: "#2ecc71",
    secondaryButtonColor: "#bdc3c7",
    lightBorderColor: "#e7e7e7",
    backgroundTextColor: "#bababa",
};
export const sizes = {
    inputHeight: Dimensions.get("window").width / 5,
    inputWidth: Dimensions.get("window").width - 60,
    inputTextMaxLength: Dimensions.get("window").width / 2,
    inputPadding: 20,
    shadowStyles: {
        shadowColor,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
};

export const inputGeneralStyles = {
    borderWidth: 1,
    borderColor: colors.lightBorderColor,
    borderRadius: 2,
    margin: 0,
    marginBottom: 10,
    height: sizes.inputHeight,
    width: sizes.inputWidth,
    ...sizes.shadowStyles,
    fontSize: BASE_FONT_SIZE,
}
