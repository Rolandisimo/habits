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
    title?: string | JSX.Element;
}
export function createDeletePopup(props: PopupProps) {
    return new PopupData(PopupType.Info)
        .addId(PopupId.DeletePopup)
        .addButtons(props.buttons)
        .addContent(() => <Text style={styles.label}>Are you sure you want to delete this habit?</Text>)
    ;
}
export function createDoneNotDonePopup(props: PopupProps) {
    return new PopupData(PopupType.Info)
        .addId(PopupId.DoneNotDone)
        .addButtons(props.buttons)
        .addContent(() => (
            <Text style={styles.label}>
                Did you do <Text style={styles.accentedText}>"{props.title}"</Text> task for today?
            </Text>
        ))
    ;
}
