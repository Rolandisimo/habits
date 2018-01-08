import React from 'react';
import {
    Text,
    View,
    TextInput,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { periods, getSelectedPeriod } from "./utils";
import { colors } from '../../../consts';
import styles from "./styles";

export interface HabitPeriodFormGroupDefaultProps {
    period: number,
    isEditing: boolean,
}
export interface HabitPeriodFormGroupProps extends Partial<HabitPeriodFormGroupDefaultProps> {
    onPress?: (periodValue: number) => void,
}

export type HabitPeriodFormGroupPropsWithDefaults = HabitPeriodFormGroupProps & HabitPeriodFormGroupDefaultProps;

export class HabitPeriodFormGroup extends React.PureComponent<HabitPeriodFormGroupProps, {}> {
    public static defaultProps: HabitPeriodFormGroupDefaultProps = {
        period: 0,
        isEditing: false,
    }
    render() {
        const {
            period,
            isEditing,
            onPress,
        } = this.props as HabitPeriodFormGroupPropsWithDefaults;
        const periodObject = periods[getSelectedPeriod(period)];
        const PeriodBodyComponent = !!isEditing
        ? (
            <RadioForm
                style={styles.radio}
                radio_props={periods}
                initial={getSelectedPeriod(period)}
                onPress={onPress}
                buttonColor={colors.mainColor}
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
                <View>
                    <Text style={styles.label}>Learning Period</Text>
                    {PeriodBodyComponent}
                </View>
        );
    }
}
