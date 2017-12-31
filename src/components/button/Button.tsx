import React  from "react";
import {
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import styles from "./styles";
import { colors } from '../consts';


export enum ButtonTheme {
    Small = "small",
    Default = "default",
}
export interface ButtonProps {
    onPress: (event?: GestureResponderEvent) => void;
    label: string;
    color?: string;
    disabled?: boolean;
    theme?: ButtonTheme;
}

export class Button extends React.PureComponent<ButtonProps, {}> {
    public defaultProps = {
        theme: ButtonTheme.Default,
    }
    render() {

        const buttonStyles = [
            styles.button,
            this.props.theme === ButtonTheme.Small ? styles.small : undefined,
            { backgroundColor: this.props.color ? this.props.color : colors.successColor },
        ];

        return (
            <TouchableOpacity
                disabled={this.props.disabled}
                activeOpacity={0.6}
                style={buttonStyles}
                onPress={this.props.onPress}
            >
                <Text style={styles.label}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}
