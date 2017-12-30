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
import { Navigation } from "../../../../types/General";
import { HabitPeriodFormGroup } from "../period-form/HabitPeriodFormGroup";

export interface ViewHabitDispatchProps {
    editHabit: typeof editHabitActionCreator;
}
export interface ViewHabitOwnProps {
    navigation: Navigation;
}
export type ViewHabitProps = ViewHabitOwnProps & ViewHabitDispatchProps;

export class ViewHabit extends React.Component<ViewHabitProps, {}> {
    params = this.props.navigation.state.params;
    constructor(props: ViewHabitProps) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
    }

    render() {
        const { habit } = this.params;
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
        this.props.navigation.navigate(
            routes.CreateHabit,
            {
                isNew: false,
                isEditing: true,
                habit: this.params.habit,
            },
        );
    }
}

const mapDispatchToProps: ViewHabitDispatchProps = {
    editHabit: editHabitActionCreator,
};

export const ViewHabitConnected = connect<{}, ViewHabitDispatchProps>(
    undefined,
    mapDispatchToProps,
)(ViewHabit);
