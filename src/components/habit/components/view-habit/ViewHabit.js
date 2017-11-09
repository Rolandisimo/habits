//@ts-check

import React from "react";
import PropTypes from "prop-types";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { editHabitActionCreator, selectNavigation } from "../../../../ducks/common";

import { HabitFormConnected } from "../habit-form/HabitForm"
import styles from "./styles";

export class ViewHabit extends React.Component {
    shouldComponentUpdate(nextProps) {
        const oldProps = this.props.navigation.state.params;
        const newProps = nextProps.navigation.state.params;

        return false
            || oldProps.name !== newProps.name
            || oldProps.period !== newProps.period
            || oldProps.notificationTime !== newProps.notificationTime
        ;
    }
    render() {
        const { habit } = this.props.navigation.state.params;
        const {
            name,
            period,
            notificationTime,
        } = habit;

        return (
            <HabitFormConnected habit={habit} />
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
