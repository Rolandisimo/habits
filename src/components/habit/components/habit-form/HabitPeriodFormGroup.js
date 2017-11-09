import React from 'react';
import {
    Text,
    View,
    TextInput,
} from "react-native";
import PropTypes from "prop-types";
import RadioForm from 'react-native-simple-radio-button';
import { periods, getSelectedPeriod } from "./utils";
import styles from "./styles";

export class HabitPeriodFormGroup extends React.PureComponent {
    render() {
        const {
            period,
            isEditing,
            onPress,
        } = this.props;
        const periodObject = periods[getSelectedPeriod(period)];
        const PeriodBodyComponent = !!isEditing
        ? (
            <RadioForm
                style={styles.radio}
                radio_props={periods}
                initial={getSelectedPeriod(period)}
                onPress={onPress}
            />
        )
        : (
            <TextInput
                editable={!!isEditing}
                defaultValue={periodObject.label}
                style={styles.input}
                value={periodObject.label}
            />
        );

        return (
            <View style={styles.formGroup}>
                <Text style={styles.label}>Period</Text>
                {PeriodBodyComponent}
            </View>
        );
    }
}

HabitPeriodFormGroup.propTypes = {
    onPress: PropTypes.func.isRequired,
    period: PropTypes.number.isRequired,
    isEditing: PropTypes.bool,
};

