import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  EmitterSubscription,
} from "react-native";
import DatePicker from "react-native-datepicker"
import { HabitPeriodFormGroup } from "./HabitPeriodFormGroup";
import { SaveButton } from "../save-button/SaveButton";
import { EditButton } from "../edit-button/EditButton";
import styles, { datePickerCustomStyles} from "./styles";
import {
    addHabitActionCreator,
    editHabitActionCreator,
    selectNavigation,
} from "../../../../ducks/common";
import { routes } from "../../../../../routes";
import { HabitItemProps } from "../../types";
import { Navigation } from "../../../../types/General";

export interface HabitFormState {
    isKeyboardOpen: boolean;
    keyBoardHeight: number;
    nameValue: string;
    periodValue: number;
    notificationTimeValue: string;
}

export interface HabitFormStateProps {
    navigation: Navigation;
} 
export interface HabitFormDispatchProps {
    addHabit: typeof addHabitActionCreator;
    editHabit: typeof editHabitActionCreator;
} 
export interface HabitFormOwnProps {
    habit?: HabitItemProps;
} 
export type HabitFormProps = HabitFormOwnProps & HabitFormStateProps & HabitFormDispatchProps;

export class HabitForm extends React.Component<HabitFormProps, HabitFormState> {
    state: HabitFormState = {
        isKeyboardOpen: false, // determines marginBottom for button wrapper
        keyBoardHeight: 0,
        nameValue: this.props.habit ? this.props.habit.name : "",
        periodValue: this.props.habit ? this.props.habit.period : 0,
        notificationTimeValue: this.props.habit ? this.props.habit.notificationTime : "",
    };
    newHabit: HabitItemProps;
    keyboardDidShowListener: EmitterSubscription;
    keyboardDidHideListener: EmitterSubscription;
    constructor(props: HabitFormProps) {
        super(props);

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.setKeyboardClosed = this.setKeyboardClosed.bind(this);
        this.setKeyboardOpen = this.setKeyboardOpen.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.setKeyboardOpen);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.setKeyboardClosed);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        const {
            habit,
            navigation,
        } = this.props;
        // Navigation params
        const params = navigation.state.params;
        const isNew: boolean =  params && params.isNew;
        const isEditing: boolean =  params && params.isEditing;
        const isEditingState = isNew || isEditing

        const DateComponent = (
            <DatePicker
                disabled={!isEditingState}
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

        this.newHabit = {
            id: (habit && habit.id) || Date.now(),
            name: this.state.nameValue,
            period: this.state.periodValue,
            notificationTime: this.state.notificationTimeValue,
            done: false,
        };
        const isValidHabit = isNew || (this.newHabit.name && this.newHabit.notificationTime && this.newHabit.period);
        const buttonWrapperStyles = [
            styles.buttonWrapper,
            this.state.isKeyboardOpen ? {
                marginBottom: this.state.keyBoardHeight + 20 | 0,
            } : null,
        ];
        const habitNameStyles = [styles.input, isEditingState ? { backgroundColor: "#fff" } : null];

        return (
            <ScrollView style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        editable={isEditingState}
                        defaultValue={habit && habit.name}
                        placeholder="Make the bed..."
                        style={habitNameStyles}
                        value={this.state.nameValue}
                        onChangeText={this.onNameChange}
                    />
                </View>
                <HabitPeriodFormGroup
                    isEditing={isEditingState}
                    period={habit && habit.period}
                    onPress={this.onPeriodChange}
                />
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Notification Time</Text>
                    {DateComponent}
                </View>
                <View style={buttonWrapperStyles}>
                    { isNew || isEditingState
                        ? <SaveButton onPress={this.onSave} disabled={!isValidHabit} />
                        : <EditButton onPress={this.onEdit} />
                    }
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
        const params = this.props.navigation.state.params;
        if (params && params.isNew) {
            this.props.addHabit(this.newHabit);
        } else {
            this.props.editHabit(this.newHabit);
        }
        this.props.navigation.navigate(routes.MainScreen);
    }
    onEdit() {
        this.props.navigation.navigate(
            routes.CreateHabit,
            {
                isNew: false,
                isEditing: true,
                habit: this.props.habit,
            },
        );
    }
}

const mapStateToProps = (state: any) => ({
    navigation: selectNavigation(state),
});
const mapDispatchToProps = {
    addHabit: addHabitActionCreator,
    editHabit: editHabitActionCreator,
};

export const HabitFormConnected = connect<HabitFormStateProps, HabitFormDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(HabitForm);
