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
import { selectNavigation } from "../../../../ducks/common";

import styles from "./styles";

export class EditButton extends React.Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={this.onPress}
            >
                <Text style={styles.label}>Edit</Text>
            </TouchableOpacity>
        );
    }
    onPress() {
        this.props.navigation.navigate("CreateHabit", { isNew: false, isEditing: true, habit: this.props.habit });
    }
}

const mapStateToProps = state => ({
    navigation: selectNavigation(state),
});

export const EditButtonConnected = connect(mapStateToProps, {})(EditButton);


EditButton.propTypes = {
    habit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        period: PropTypes.number.isRequired,
        notificationTime: PropTypes.string.isRequired,
    }),
};
