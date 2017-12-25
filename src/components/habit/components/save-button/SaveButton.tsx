import React  from "react";
import {
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import styles from "./styles";

export interface SaveButtonProps {
    disabled: boolean;
    onPress: (event: GestureResponderEvent) => void;
}

export class SaveButton extends React.PureComponent<SaveButtonProps, {}> {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={!this.props.disabled ? this.props.onPress : undefined}
            >
                <Text style={styles.label}>Save</Text>
            </TouchableOpacity>
        );
    }
}
