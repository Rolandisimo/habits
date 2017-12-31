// Constants file 
// - Colors
// - Sizes
// Etc

import { Dimensions } from "react-native";

export const colors = {
    mainColor: "rgba(78,205,196, .7)",
    successColor: "#2ecc71",
    dangerColor: "#e74c3c",
    shadowColor: "rgba(189, 195, 199, 0.7)",
    warningColor: "#f39c12",
    primaryButtonColor: "#2ecc71",
    secondaryButtonColor: "#bdc3c7",
    lightBorderColor: "#e7e7e7",
    backgroundTextColor: "#bababa",
};
export const sizes = {
    inputHeight: Dimensions.get("window").width / 5,
    inputTextMaxLength: Dimensions.get("window").width / 2,
    shadowOffset: {
        width: 0,
        height: 2,
    },
};
