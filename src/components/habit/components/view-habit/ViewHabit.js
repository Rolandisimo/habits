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

export class ViewHabit extends React.PureComponent {
    render() {
        const { name } = this.props.navigation.state.params;

        return (
            <TouchableOpacity
                style={styles.container}
            >
                <Text> {name} </Text>
            </TouchableOpacity>
        );
    }
}

ViewHabit.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            key: PropTypes.string,
            routeName: PropTypes.string,
            params: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                period: PropTypes.number.isRequired,
            }),
        }),
    }),
};
