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

export class SaveButton extends React.Component<SaveButtonProps, {}> {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                disabled={this.props.disabled}
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Text style={styles.label}>Save</Text>
            </TouchableOpacity>
        );
    }
}
