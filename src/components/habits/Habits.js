// @ts-check
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  VirtualizedList
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { List } from "immutable";

import { selectHabits } from "../../ducks/common";

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

  renderHabit(habit) {
    return (
      <TouchableOpacity key={habit.index}>
        <Text> {habit.item.name} </Text>
      </TouchableOpacity>
    );
  }

  getHabit(data, i) {
    return data.get(i);
  }

  getHabitsCount(data) {
    return data.size;
  }

  getHabitKey(data) {
    return data.id;
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
}

Habits.propTypes = {
  habits: PropTypes.instanceOf(List),
};

const mapStateToProps = (rootState) => ({
  habits: selectHabits(rootState),
});

export const HabitsConnected = connect(
  mapStateToProps,
  undefined,
)(Habits);
