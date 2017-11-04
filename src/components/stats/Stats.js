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

export class Stats extends React.Component {
    static defaultProps = {
        todayDone: 0,
        todayGoal: 0,
        totalDone: 0,
        total: 0,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.stat}>
                    <Text>{this.props.todayDone}</Text>
                    <Text>/</Text>
                    <Text>{this.props.todayGoal}</Text>
                </View>
                <View style={styles.stat}>
                    <Text>{this.props.totalDone}</Text>
                    <Text>/</Text>
                    <Text>{this.props.total}</Text>
                </View>
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
