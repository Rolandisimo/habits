import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  EmitterSubscription,
  Switch,
} from "react-native";
import DatePicker from "react-native-datepicker"
import { HabitPeriodFormGroup } from "../period-form/HabitPeriodFormGroup";
import { SaveButton } from "../save-button/SaveButton";
import { DeleteButton } from "../delete-button/DeleteButton";
import {
    addHabitRestActionCreator,
    editHabitRestActionCreator,
} from "../../../../middleware/habitRest";
import { routes } from "../../../../../routes";
import { HabitItemProps } from "../../types";
import { Navigation } from "../../../../types/General";
import { periods } from "../period-form/utils";
import { createDeletePopupActionCreator } from "../../../../ducks/common";
import { styles, datePickerCustomStyles} from "./styles";
import { colors } from '../../../consts';

export interface CreateHabitState {
    isKeyboardOpen: boolean;
    keyBoardHeight: number;
    nameValue: string;
    periodValue: number;
    notificationTimeValue: string;
    done?: boolean;
    finished?: boolean;
}

export interface CreateHabitStateProps {
    navigation: Navigation;
}
export interface CreateHabitDispatchProps {
    addHabit: typeof addHabitRestActionCreator;
    editHabit: typeof editHabitRestActionCreator;
    deleteHabit: typeof createDeletePopupActionCreator;
}
export interface CreateHabitOwnProps {
    habit?: HabitItemProps;
}
export type CreateHabitProps = CreateHabitOwnProps & CreateHabitStateProps & CreateHabitDispatchProps;

export class CreateHabit extends React.Component<CreateHabitProps, CreateHabitState> {
    state: CreateHabitState = {
        isKeyboardOpen: false, // determines marginBottom for button wrapper
        keyBoardHeight: 0,
        nameValue: "",
        periodValue: periods[0].value,
        notificationTimeValue: "",
        done: false,
    };
    newHabit: HabitItemProps;
    keyboardDidShowListener: EmitterSubscription;
    keyboardDidHideListener: EmitterSubscription;
    params = this.props.navigation.state.params;
    constructor(props: CreateHabitProps) {
        super(props);

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.setKeyboardClosed = this.setKeyboardClosed.bind(this);
        this.setKeyboardOpen = this.setKeyboardOpen.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.setKeyboardOpen);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.setKeyboardClosed);

        const { habit } = this.params;
        if (habit.name && habit.period && habit.notificationTime) {
            this.setState({
                nameValue: habit.name,
                periodValue: habit.period,
                notificationTimeValue: habit.notificationTime,
            })
        } else {
            this.setState({
                periodValue: periods[0].value,
                notificationTimeValue: "18:00",
            })
        }
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        const { habit, isNew } = this.params;

        const DateComponent = (
            <DatePicker
                disabled={false}
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={this.onDateChange}
                showIcon={false}
                style={styles.datePicker}
                customStyles={datePickerCustomStyles}
                mode="time"
                date={this.state.notificationTimeValue}
            />
        );

        // TODO: Determine if this.newHabit is required at all. See HabitsModel
        const now = Date.now();
        this.newHabit = {
            id: (habit && habit.id) || now,
            name: this.state.nameValue,
            period: this.state.periodValue,
            notificationTime: this.state.notificationTimeValue,
            done: !!this.state.done,
            finished: !!this.state.finished,
            createdAt: habit.createdAt || now,
        };

        const isValidHabit = this.newHabit.name !== "" && this.newHabit.notificationTime && this.newHabit.period
            ? true
            : false;

        const buttonWrapperStyles = [
            styles.buttonWrapper,
            this.state.isKeyboardOpen ? {
                marginBottom: this.state.keyBoardHeight + 20 | 0,
            } : null,
        ];

        return (
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        editable={true}
                        defaultValue={habit && habit.name}
                        placeholder="Make the bed..."
                        style={styles.input}
                        value={this.state.nameValue}
                        onChangeText={this.onNameChange}
                        returnKeyType="done"
                    />
                </View>
                <HabitPeriodFormGroup
                    isEditing={true}
                    period={habit && habit.period}
                    onPress={this.onPeriodChange}
                />
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Notification Time</Text>
                    {DateComponent}
                </View>
                { !isNew && (
                    <View style={styles.formGroupHorizontal}>
                        <Text style={styles.labelHorizontal}>I Learned This Habit</Text>
                        <Switch
                            onTintColor={colors.mainColor}
                            value={this.newHabit.done}
                            onValueChange={this.onDoneChange}
                        />
                    </View>
                )}
                <View style={buttonWrapperStyles}>
                    <SaveButton
                        onPress={this.onSave}
                        disabled={!isValidHabit}
                    />
                    { !isNew && (
                        <DeleteButton onPress={this.onDelete} />
                    )}
                </View>
            </ScrollView>
        );
    }
    onPeriodChange(periodValue: number) {
        this.setState({
            periodValue,
        });
    }
    onDateChange(time: string) {
        this.setState({
            notificationTimeValue: time,
        });
    }
    onNameChange(value: string) {
        this.setState({
            nameValue: value,
        });
    }
    onDoneChange(value: boolean) {
        this.setState({
            done: value,
        });
    }
    setKeyboardClosed() {
        this.setState({
            isKeyboardOpen: false,
        });
    }
    // TODO: Add typings for event
    setKeyboardOpen(e: any) {
        if (e.endCoordinates) {
            this.setState({
                isKeyboardOpen: true,
                keyBoardHeight: e.endCoordinates.height,
            });
        }
    }
    onSave() {
        if (this.params.isNew) {
            this.props.addHabit(this.newHabit);
        } else {
            this.props.editHabit(this.newHabit);
        }
        this.props.navigation.navigate(routes.MainScreen, {});
    }
    onDelete() {
        if (this.params.habit) {
            this.props.deleteHabit(this.params.habit as HabitItemProps);
        }
    }
}

const mapDispatchToProps: CreateHabitDispatchProps = {
    addHabit: addHabitRestActionCreator,
    editHabit: editHabitRestActionCreator,
    deleteHabit: createDeletePopupActionCreator,
};

export const CreateHabitConnected = connect<{}, CreateHabitDispatchProps>(
    undefined,
    mapDispatchToProps,
)(CreateHabit);
