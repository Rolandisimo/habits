import React from "react";
import { HabitFormConnected } from "../habit-form/HabitForm";
import { Navigation } from "../../../../types/General";

export interface CreateHabitProps {
    navigation: Navigation;
}
export class CreateHabit extends React.Component<CreateHabitProps, {}> {
    render() {
        const habit = this.props.navigation.state.params && this.props.navigation.state.params.habit;

        return (
            <HabitFormConnected
                habit={habit}
            />
        );
    }
}
