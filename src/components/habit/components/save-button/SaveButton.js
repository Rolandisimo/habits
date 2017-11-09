// @ts-check

import React  from "react";
import {
    Button,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editHabitActionCreator, selectNavigation } from "../../../../ducks/common";
import styles from "./styles";

export class SaveButton extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={!this.props.disabled ? this.props.onPress : null}
            >
                <Text style={styles.label}>Save</Text>
            </TouchableOpacity>
        );
    }
}

SaveButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};
