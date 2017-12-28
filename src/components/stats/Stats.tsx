
import React from "react";
import {
    Text,
    View,
} from "react-native";
import { connect } from "react-redux";
import {
    selectDone,
    selectTotal,
    Statistics,
} from "../../ducks/common";
import styles from "./styles";

export type StatsProps = Statistics;

export class Stats extends React.PureComponent<StatsProps, {}> {
    static defaultProps = {
        done: 0,
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
                        "Your todays progress",
                        this.props.done,
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
    done: selectDone(state),
    total: selectTotal(state),
});

export const StatsConnected = connect<StatsProps, {}>(
    mapStateToProps,
    {},
)(Stats);
