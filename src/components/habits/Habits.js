// @flow
import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    VirtualizedList,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { List } from "immutable";

import { HabitConnected } from "../habit/Habit";
import { selectHabits } from "../../ducks/common";
import styles from "./styles";

export class Habits extends React.Component {
    static defaultProps = {
        habits: List([])
    };

    constructor(props) {
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

    /**
     * 
     * @param {{ id: number, item: { id: number, name: string, period: number, notificationTime: string, done: boolean }}} habit 
     */
    renderHabit(habit) {
        return <HabitConnected habit={habit.item} />;
    }

    getHabit(data, i) {
        return data.get(i);
    }

    getHabitsCount(data) {
        return data.size;
    }

    getHabitKey(habit) {
        return habit.id;
    }
}

const mapStateToProps = (rootState) => ({
    habits: selectHabits(rootState),
});

export const HabitsConnected = connect(
    mapStateToProps,
    undefined,
)(Habits);

Habits.propTypes = {
    habits: PropTypes.instanceOf(List),
};
