// @ts-check
import { List } from "immutable";

import React from "react";
import {
    Text,
    View,
} from "react-native";

import { HabitsConnected } from "../habits/Habits";
import styles from "./styles";

export class MainScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HabitsConnected />
            </View>
        );
    }
}