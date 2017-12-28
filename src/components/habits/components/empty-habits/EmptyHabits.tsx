import React from "react";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {
    Text,
    View,
} from "react-native";

import styles from "./styles";

export class EmptyHabits extends React.PureComponent<{}, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    Looks like you're about to create your first habit.
                    To do so, just press on the
                    {" "}
                    <FAIcon
                        name="plus-circle"
                        size={25}
                    />
                    {" "}
                    button!
                </Text>
            </View>
        );
    }
}
