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
import { editHabitActionCreator } from "../../../../ducks/common";
import { routes } from "../../../../../routes";
import { Navigation } from "../../../../types/General";
import { HabitPeriodFormGroup } from "../period-form/HabitPeriodFormGroup";
import {
    habitViewScreenStyles as styles,
    datePickerCustomStyles,
} from "./styles";

export interface ViewHabitDispatchProps {
    editHabit: typeof editHabitActionCreator;
}
export interface ViewHabitOwnProps {
    navigation: Navigation;
}
export type ViewHabitProps = ViewHabitOwnProps & ViewHabitDispatchProps;

export interface FlatListData {
    component: JSX.Element;
}

export class ViewHabit extends React.Component<ViewHabitProps, {}> {
    params = this.props.navigation.state.params;

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
                <View style={styles.formGroup}>
                    <HabitPeriodFormGroup period={habit.period} />
                </View>
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
    private onEdit = () => {
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
