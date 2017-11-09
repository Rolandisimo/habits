// @ts-check

import React from "react";
import {
    Text,
    View,
} from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { List } from "immutable";
import PropTypes from "prop-types";
import { throttle } from "lodash";

import styles from "./styles";


export class NewHabitButton extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={throttle(this.onPress, 500, { trailing: false })}
                />
            </View>
        );
    }

    onPress() {
        this.props.navigation.navigate("CreateHabit", { isNew: true, isEditing: false });
    }
}


NewHabitButton.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        state: PropTypes.shape({
            key: PropTypes.string,
            routeName: PropTypes.string,
        }),
    }).isRequired,
};