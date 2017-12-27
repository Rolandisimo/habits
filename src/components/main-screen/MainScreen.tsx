import React from "react";
import { View } from "react-native";
import { HabitsConnected } from "../habits/Habits";
import { StatsConnected } from "../stats/Stats";
import { NewHabitButtonConnected } from "../new-habit-button/NewHabitButton";
import { Navigation } from "../../types/General";
import styles from "./styles";

export interface MainScreenProps {
    navigation: Navigation;
}
export class MainScreen extends React.Component<MainScreenProps,  {}> {
    render() {
        return (
            <View style={styles.container}>
                <StatsConnected />
                <HabitsConnected />
                <NewHabitButtonConnected />
            </View>
        );
    }
}
