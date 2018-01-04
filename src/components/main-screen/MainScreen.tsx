import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import { HabitsConnected } from "../habits/Habits";
import { StatsConnected } from "../stats/Stats";
import { NewHabitButtonConnected } from "../new-habit-button/NewHabitButton";
import { Navigation } from "../../types/General";
import { PopupConnected } from "../popup/Popup";
import { selectPopups } from '../../ducks/common';
import { PopupData } from '../popup/factory/PopupData';
import { FilterBarConnected } from '../filter-bar/FilterBar';
import { styles } from "./styles";

export interface MainScreenStateProps {
    popups: PopupData[];
}
export interface MainScreenOwnProps {
    navigation: Navigation;
}
export type MainScreenProps = MainScreenStateProps & MainScreenOwnProps;

export class MainScreen extends React.Component<MainScreenProps,  {}> {
    public shouldComponentUpdate(nextProps: MainScreenProps) {
        if (this.props.popups.length !== nextProps.popups.length) {
            return true;
        }

        return false;
    }
    render() {
        return (
            <View style={styles.container}>
                <StatsConnected />
                <FilterBarConnected />
                <HabitsConnected />
                <NewHabitButtonConnected />
                { this.props.popups.length > 0 && (
                    <PopupConnected />
                )}
            </View>
        );
    }
}

const mapStateToProps = (state: any): MainScreenStateProps => ({
    popups: selectPopups(state),
})

export const MainScreenConnected = connect<MainScreenStateProps, {}>(
    mapStateToProps,
    {},
)(MainScreen);
