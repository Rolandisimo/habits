// @ts-check

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import { HabitsConnected } from "../habits/Habits";
import { StatsConnected } from "../stats/Stats";
import { NewHabitButton } from "../new-habit-button/NewHabitButton";
import styles from "./styles";

export class MainScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatsConnected />
                <HabitsConnected />
                <NewHabitButton
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

MainScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            key: PropTypes.string,
            routeName: PropTypes.string,
        }),
    }),
};
