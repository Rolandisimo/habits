import React  from "react";
import {
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import styles from "./styles";

export enum ButtonTheme {
    Small = "small",
    Default = "default",
}

export interface CustomStyles {
    button?: {
        borderColor: string;
        backgroundColor: string;
    };
    label?: {
        color: string;
    };
};
export interface ButtonDefaultProps {
    customStyles: CustomStyles;
    theme: ButtonTheme;
}
export interface ButtonProps extends Partial<ButtonDefaultProps> {
    onPress: (event?: GestureResponderEvent) => void;
    label: string;
    disabled?: boolean;
}

export type ButtonPropsWithDefaults = ButtonProps & ButtonDefaultProps;

export class Button extends React.PureComponent<ButtonProps, {}> {
    public static defaultProps = {
        theme: ButtonTheme.Default,
        customStyles: {},
    }
    public render() {
        const {
            customStyles,
        } = this.props as ButtonPropsWithDefaults;

        const buttonStyles = [
            styles.button,
            this.props.theme === ButtonTheme.Small ? styles.small : undefined,
            customStyles.button,
        ];
        const labelStyles = [
            styles.label,
            customStyles.label,
        ];

        return (
            <TouchableOpacity
                disabled={this.props.disabled}
                activeOpacity={0.6}
                style={buttonStyles}
                onPress={this.props.onPress}
            >
                <Text style={labelStyles}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}
