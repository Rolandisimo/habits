import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-datepicker"
import { EditButton } from "../edit-button/EditButton";
import styles, { datePickerCustomStyles } from "./styles";
import { editHabitActionCreator } from "../../../../ducks/common";
import { routes } from "../../../../../routes";
import { HabitItemProps } from "../../types";
import { Navigation, hasParams, StateWithParams } from "../../../../types/General";
import { HabitPeriodFormGroup } from "../period-form/HabitPeriodFormGroup";

export interface ViewHabitStateProps {
}
export interface ViewHabitDispatchProps {
    editHabit: typeof editHabitActionCreator;
}
export interface ViewHabitOwnProps {
    navigation: Navigation;
}
export type ViewHabitProps = ViewHabitOwnProps & ViewHabitStateProps & ViewHabitDispatchProps;

export class ViewHabit extends React.Component<ViewHabitProps, {}> {
    newHabit: HabitItemProps;
    constructor(props: ViewHabitProps) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
    }

    render() {
        // TODO: Fix workaround
        // Workaround for typing compatibility
        // Component will always have a habit in params
        if (!hasParams(this.props.navigation.state)) {
            return null;
        }
    
        const habit = this.props.navigation.state.params.habit;
        const DateComponent = (
            <DatePicker
                disabled={true}
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                style={styles.datePicker}
                customStyles={datePickerCustomStyles}
                mode="time"
                date={habit.notificationTime}
            />
        );

        return (
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        editable={false}
                        defaultValue={habit.name}
                        placeholder="Make the bed..."
                        style={styles.input}
                        value={habit.name}
                    />
                </View>
                <HabitPeriodFormGroup period={habit.period} />
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Notification Time</Text>
                    {DateComponent}
                </View>
                <View style={styles.buttonWrapper}>
                    <EditButton onPress={this.onEdit} />
                </View>
            </ScrollView>
        );
    }
    onEdit() {
        const habit = (this.props.navigation.state as StateWithParams).params.habit;
        this.props.navigation.navigate(
            routes.CreateHabit,
            {
                isNew: false,
                isEditing: true,
                habit,
            },
        );
    }
}

const mapDispatchToProps = {
    editHabit: editHabitActionCreator,
};

export const ViewHabitConnected = connect<{}, ViewHabitDispatchProps>(
    undefined,
    mapDispatchToProps,
)(ViewHabit);
