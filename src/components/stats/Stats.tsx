
import React from "react";
import {
    Text,
    View,
} from "react-native";
import { connect } from "react-redux";
import {
    selectTodayDone,
    selectTodayGoal,
    selectTotalDone,
    selectTotal,
} from "../../ducks/common";
import styles from "./styles";

export interface StatsProps {
    todayDone: number;
    todayGoal: number;
    totalDone: number;
    total: number;
}

export class Stats extends React.PureComponent<StatsProps, {}> {
    static defaultProps = {
        todayDone: 0,
        todayGoal: 0,
        totalDone: 0,
        total: 0,
    };

    constructor(props: StatsProps) {
        super(props);

        this.renderStatistic = this.renderStatistic.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.renderStatistic(
                        "Today's progress",
                        this.props.todayDone,
                        this.props.todayGoal,
                    )
                }
                <View style={styles.divide} />
                {
                    this.renderStatistic(
                        "Total progress",
                        this.props.totalDone,
                        this.props.total,
                    )
                }
            </View>
        );
    }

    renderStatistic(title: string, progress: number, total: number) {
        return (
            <View style={styles.statisticContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.statistic}>
                    <Text style={styles.primaryValue}>{progress}</Text>
                    <Text style={styles.regularValue}>/</Text>
                    <Text style={styles.regularValue}>{total}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any): StatsProps => ({
    todayDone: selectTodayDone(state),
    todayGoal: selectTodayGoal(state),
    totalDone: selectTotalDone(state),
    total: selectTotal(state),
});

export const StatsConnected = connect<StatsProps, {}>(
    mapStateToProps,
    {},
)(Stats);
