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
import styles, { datePickerCustomStyles} from "./styles";
import { editHabitActionCreator } from "../../../../ducks/common";
import {
    addHabitRestActionCreator,
} from "../../../../middleware/habitRest";
import { routes } from "../../../../../routes";
import { HabitItemProps } from "../../types";
import { Navigation, hasParams, StateWithParams } from "../../../../types/General";
import { periods } from "../period-form/utils";

export interface CreateHabitState {
    isKeyboardOpen: boolean;
    keyBoardHeight: number;
    nameValue: string;
    periodValue: number;
    notificationTimeValue: string;
    done?: boolean;
}

export interface CreateHabitStateProps {
    navigation: Navigation;
}
export interface CreateHabitDispatchProps {
    addHabit: typeof addHabitRestActionCreator;
    editHabit: typeof editHabitActionCreator;
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
    constructor(props: CreateHabitProps) {
        super(props);

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.setKeyboardClosed = this.setKeyboardClosed.bind(this);
        this.setKeyboardOpen = this.setKeyboardOpen.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.setKeyboardOpen);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.setKeyboardClosed);

        if (hasParams(this.props.navigation.state)) {
            const habit = this.props.navigation.state.params.habit;
            if (habit.name) {
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
        } else {
            if (!this.state.notificationTimeValue) {
                this.setState({
                    notificationTimeValue: "18:00",
                })
            }
        }
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        // TODO: Fix workaround
        // Workaround for typing compatibility
        // Component will always have a habit in params
        if (!hasParams(this.props.navigation.state)) {
            return null;
        }
        const habit = this.props.navigation.state.params.habit;
        const isNew = this.props.navigation.state.params.isNew;

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
            createdAt: now,
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
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Done?</Text>
                        <Switch
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
        // Navigation params
        const params = (this.props.navigation.state as StateWithParams).params;
        if (params && params.isNew) {
            this.props.addHabit(this.newHabit);
        } else {
            this.props.editHabit(this.newHabit);
        }
        this.props.navigation.navigate(routes.MainScreen);
    }
}

const mapDispatchToProps = {
    addHabit: addHabitRestActionCreator,
    editHabit: editHabitActionCreator,
};

export const CreateHabitConnected = connect<{}, CreateHabitDispatchProps>(
    undefined,
    mapDispatchToProps,
)(CreateHabit);
