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

import { selectNavigation } from "../../ducks/common";
import { DoneOverlay } from "./components/done-overlay/DoneOverlay";
import styles from "./styles";

export class Habit extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        const oldProps = this.props.habit;
        const newProps = nextProps.habit;

        return false
            || oldProps.name !== newProps.name
            || oldProps.period !== newProps.period
            || oldProps.notificationTime !== newProps.notificationTime
            || oldProps.done !== newProps.done
        ;
    }
    render() {
        const { name, done } = this.props.habit;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={!done ? this.onPress : null}
                activeOpacity={0.5}
            >
                <DoneOverlay done={done} />
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
        this.props.navigation.navigate("ViewHabit", { isNew: false, isEditing: false, habit: this.props.habit });
    }
}

const mapStateToProps = state=> ({
    navigation: selectNavigation(state),
});

export const HabitConnected = connect(
    mapStateToProps,
    {},
)(Habit);

Habit.propTypes = {
    habit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        period: PropTypes.number.isRequired,
        notificationTime: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
    }),
};
