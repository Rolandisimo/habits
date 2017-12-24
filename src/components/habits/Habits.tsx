import { List } from "immutable";
import React from "react";
import { VirtualizedList } from "react-native";
import { connect } from "react-redux";
import { HabitConnected } from "../habit/Habit";
import { selectHabits } from "../../ducks/common";
import { HabitItemProps } from "../habit/types";

export interface ListItem {
    id: number;
    item: HabitItemProps;
}

export interface HabitsProps {
    habits: List<HabitItemProps>;
}

export class Habits extends React.Component<HabitsProps, {}> {
    static defaultProps = {
        habits: List([])
    };

    constructor(props: HabitsProps) {
        super(props);

        this.renderHabit = this.renderHabit.bind(this);
        this.getHabitsCount = this.getHabitsCount.bind(this);
        this.getHabitKey = this.getHabitKey.bind(this);
        this.getHabit = this.getHabit.bind(this);
    }
    
    render() {
        return (
            <VirtualizedList
                getItemCount={this.getHabitsCount}
                getItem={this.getHabit}
                keyExtractor={this.getHabitKey}
                renderItem={this.renderHabit}
                data={this.props.habits}
            />
        );
    }

    renderHabit(habit: ListItem) {
        return <HabitConnected habit={habit.item} />;
    }

    getHabit(data: List<HabitItemProps>, i: number) {
        return data.get(i);
    }

    getHabitsCount(data: List<HabitItemProps>) {
        return data.size;
    }

    getHabitKey(habit: HabitItemProps) {
        return habit.id;
    }
}

const mapStateToProps = (state: any): HabitsProps => ({
    habits: selectHabits(state),
});

export const HabitsConnected = connect<HabitsProps, {}>(
    mapStateToProps,
    {},
)(Habits);
