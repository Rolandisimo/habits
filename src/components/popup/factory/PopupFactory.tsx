import React from "react";
import { Text } from "react-native";
import {
    PopupData,
    PopupType,
    PopupButton,
    PopupId,
} from './PopupData';
import { styles } from "./styles";

export interface PopupProps {
    buttons: PopupButton[];
}
export function createDeletePopup(props: PopupProps) {
    return new PopupData(PopupType.Info)
        .addId(PopupId.DeletePopup)
        .addButtons(props.buttons)
        .addContent(() => <Text style={styles.label}>Are you sure you want to delete this habit?</Text>)
    ;
}