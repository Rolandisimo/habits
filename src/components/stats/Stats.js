// @ts-check
import React from "react";
import {
    Text,
    View,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Map } from "immutable";

import { selectStats } from "../../ducks/common";
import styles from "./styles";

export class Stats extends React.Component {
    static defaultProps = {
        statistics: Map({})
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.statistics.get("total"));

        return (
            <View style={styles.container}>
                <View>
                    <Text> {this.props.statistics.get("todayDone")} </Text>
                    <Text> / {this.props.statistics.get("todayGoal")} </Text>
                </View>
                <View>
                    <Text> {this.props.statistics.get("totalDone")} </Text>
                    <Text> / {this.props.statistics.get("total")} </Text>
                </View>
            </View>
        );
    }
}

Stats.propTypes = {
    statistics: PropTypes.instanceOf(Map),
};

const mapStateToProps = (rootState) => ({
    statistics: selectStats(rootState),
});

export const StatsConnected = connect(
    mapStateToProps,
    undefined,
)(Stats);
