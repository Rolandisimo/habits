//@ts-check

import React from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

export class Habit extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }
    render() {
        const { name } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPress}
            >
                <Text>{name}</Text>
            </TouchableOpacity>
        );
    }
    onPress() {
        const {
            id,
            name,
            period,
        } = this.props;
        this.props.navigation.navigate(
            "ViewHabit",
            { id, name, period },
        )
    }
}

Habit.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    period: PropTypes.number.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            key: PropTypes.string,
            routeName: PropTypes.string,
        }),
    }),
};
