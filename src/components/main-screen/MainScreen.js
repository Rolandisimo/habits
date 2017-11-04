// @ts-check

import React from "react";
import PropTypes from "prop-types";
import {
    Text,
    View,
} from "react-native";
import { List } from "immutable";

import { HabitsConnected } from "../habits/Habits";
import styles from "./styles";

export class MainScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            state: PropTypes.shape({
                key: PropTypes.string,
                routeName: PropTypes.string,
            }),
        }),
    };
    render() {
        return (
            <View style={styles.container}>
                <HabitsConnected
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}