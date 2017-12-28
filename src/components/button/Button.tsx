import React  from "react";
import {
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import styles from "./styles";

export interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    label: string;
    color?: string;
    disabled?: boolean;
}

export class Button extends React.PureComponent<ButtonProps, {}> {
    render() {
        return (
            <TouchableOpacity
                disabled={this.props.disabled}
                activeOpacity={0.6}
                style={[styles.button, { backgroundColor: this.props.color ? this.props.color : "green" }]}
                onPress={this.props.onPress}
            >
                <Text style={styles.label}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}
