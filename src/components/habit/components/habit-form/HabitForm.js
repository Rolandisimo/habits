//@ts-check

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-datepicker"
import { periods, getSelectedPeriod } from "./utils";
import { HabitPeriodFormGroup } from "./HabitPeriodFormGroup";
import { SaveButton } from "../save-button/SaveButton";
import { EditButtonConnected } from "../edit-button/EditButton";
import styles, { datePickerCustomStyles} from "./styles";
import { editHabitActionCreator, selectNavigation } from "../../../../ducks/common";
import { routes } from "../../../../../routes";

export class HabitForm extends React.Component {
    state = {
        isKeyboardOpen: false, // determines marginBottom for button wrapper
        nameValue: this.props.habit ? this.props.habit.name : "",
        periodValue: this.props.habit ? this.props.habit.period : "",
        notificationTimeValue: this.props.habit ? this.props.habit.notificationTime : "",
    };
    newHabit = {};
    constructor(props) {
        super(props);

        this.onPeriodChange = this.onPeriodChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.setKeyboardClosed = this.setKeyboardClosed.bind(this);
        this.setKeyboardOpen = this.setKeyboardOpen.bind(this);
        this.onSave = this.onSave.bind(this);
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
        const isNew =  params && params.isNew;
        const isEditing =  params && params.isEditing;
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
        };
        const isValidHabit = isNew || (this.newHabit.name && this.newHabit.notificationTime && this.newHabit.period);
        const buttonWrapperStyles = [
            styles.buttonWrapper,
            this.state.isKeyboardOpen && {
                marginBottom: this.state.keyBoardHeight + 20 | 0,
            },
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
                        : <EditButtonConnected habit={habit} />
                    }
                </View>
            </ScrollView>
        );
    }
    onPeriodChange(periodValue) {
        this.setState({
            periodValue,
        });
    }
    onDateChange(time) {
        this.setState({
            notificationTimeValue: time,
        });
    }
    onNameChange(value) {
        this.setState({
            nameValue: value,
        });
    }
    setKeyboardClosed() {
        this.setState({
            isKeyboardOpen: false,
        });
    }
    setKeyboardOpen(e) {
        if (e.endCoordinates) {
            this.setState({
                isKeyboardOpen: true,
                keyBoardHeight: e.endCoordinates.height,
            });
        }
    }
    onSave() {
        this.props.editHabit(this.newHabit);
        this.props.navigation.navigate(routes.MainScreen);
        this.newHabit = {};
    }
}

const mapStateToProps = state => ({
    navigation: selectNavigation(state),
});
const mapDispatchToProps = {
    editHabit: editHabitActionCreator,
};

export const HabitFormConnected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HabitForm);

HabitForm.propTypes = {
    habit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        period: PropTypes.number.isRequired,
        notificationTime: PropTypes.string.isRequired,
    }),
};
