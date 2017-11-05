// @ts-check

import React from "react";
import {
    Text,
    View,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Map } from "immutable";

import { 
    selectTodayDone,
    selectTodayGoal,
    selectTotalDone,
    selectTotal,
} from "../../ducks/common";
import styles from "./styles";

export class Stats extends React.PureComponent {
    static defaultProps = {
        todayDone: 0,
        todayGoal: 0,
        totalDone: 0,
        total: 0,
    };

    constructor(props) {
        super(props);

        this.renderStatistic = this.renderStatistic.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderStatistic(this.props.todayDone, this.props.todayGoal) }
                { this.renderStatistic(this.props.totalDone, this.props.total) }
            </View>
        );
    }
    renderStatistic(progress, total) {
        return (
            <View style={styles.stat}>
                <Text>{progress}</Text>
                <Text>/</Text>
                <Text>{total}</Text>
            </View>
        );
    }
}

Stats.propTypes = {
    todayDone: PropTypes.number,
    todayGoal: PropTypes.number,
    totalDone: PropTypes.number,
    total: PropTypes.number,
};

const mapStateToProps = (rootState) => ({
    todayDone: selectTodayDone(rootState),
    todayGoal: selectTodayGoal(rootState),
    totalDone: selectTotalDone(rootState),
    total: selectTotal(rootState),
});

export const StatsConnected = connect(
    mapStateToProps,
    undefined,
)(Stats);
