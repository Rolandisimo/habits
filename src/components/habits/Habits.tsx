import React from "react";
import { List } from "immutable";
import { VirtualizedList } from "react-native";
import { connect } from "react-redux";
import { HabitConnected } from "../habit/Habit";
import { selectHabits } from "../../ducks/common";
import { HabitItemProps } from "../habit/types";
import { EmptyHabits } from './components/empty-habits/EmptyHabits';

export interface ListItem {
    id: number;
    item: HabitItemProps;
}

export interface HabitsProps {
    habits: List<HabitItemProps>;
}

export class Habits extends React.Component<HabitsProps, {}> {
    public static defaultProps = {
        habits: List([])
    };

    public constructor(props: HabitsProps) {
        super(props);

        this.renderHabit = this.renderHabit.bind(this);
        this.getHabitsCount = this.getHabitsCount.bind(this);
        this.getHabitKey = this.getHabitKey.bind(this);
        this.getHabit = this.getHabit.bind(this);
    }
    public render() {
        if (!this.props.habits.size) {
            return <EmptyHabits />;
        }

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

    private renderHabit(habit: ListItem) {
        return <HabitConnected habit={habit.item} />;
    }

    private getHabit(data: List<HabitItemProps>, i: number) {
        return data.get(i);
    }

    private getHabitsCount(data: List<HabitItemProps>) {
        return data.size;
    }

    private getHabitKey(habit: HabitItemProps) {
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
