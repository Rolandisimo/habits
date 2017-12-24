import React from "react";
import { HabitFormConnected } from "../habit-form/HabitForm"
import { Navigation } from "../../../../types/General";

export interface ViewHabitProps {
    navigation: Navigation;
}

export class ViewHabit extends React.Component<ViewHabitProps, {}> {
    shouldComponentUpdate(nextProps: ViewHabitProps) {
        const oldProps = this.props.navigation.state.params;
        const newProps = nextProps.navigation.state.params;

        return false
            || oldProps.name !== newProps.name
            || oldProps.period !== newProps.period
            || oldProps.notificationTime !== newProps.notificationTime
        ;
    }
    render() {
        const { habit } = this.props.navigation.state.params;

        return (
            <HabitFormConnected habit={habit} />
        );
    }
}

