import React  from "react";
import {
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import styles from "./styles";

export interface EditButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

export class EditButton extends React.Component<EditButtonProps, {}> {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Text style={styles.label}>Edit</Text>
            </TouchableOpacity>
        );
    }
}
