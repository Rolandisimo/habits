//@ts-check

import React from "react";
import PropTypes from "prop-types";

import FAIcon from "react-native-vector-icons/FontAwesome";
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
        const { name, done } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={!done ? this.onPress : null}
                activeOpacity={0.5}
            >
                { done ? (
                    <View style={styles.doneOverlay}>
                        <FAIcon
                            name="check"
                            color="rgba(46, 204, 113, .8)"
                            size={30}
                        />
                    </View>
                ) : null }
                <View style={styles.habit}>
                    <Text
                        style={styles.habitName}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                    <FAIcon
                        name="ellipsis-h"
                        color="#e7e7e7"
                        size={40}
                    />
                </View>
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
