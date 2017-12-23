//@ts-check

import React from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { HabitFormConnected } from "../habit-form/HabitForm";
import styles from "./styles";

export class CreateHabit extends React.Component {
    render() {
        const habit = this.props.navigation.state.params && this.props.navigation.state.params.habit;

        return (
            <HabitFormConnected
                habit={habit}
            />
        );
    }
}

CreateHabit.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            key: PropTypes.string,
            routeName: PropTypes.string,
            params: PropTypes.shape({
                habit: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    period: PropTypes.number.isRequired,
                    notificationTime: PropTypes.string.isRequired,
                }),
            }),
        }),
    }),
};

