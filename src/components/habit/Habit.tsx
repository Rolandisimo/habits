import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import { connect } from "react-redux";
import { throttle } from "lodash";
import { selectNavigation } from "../../ducks/common";
import { DoneOverlay } from "./components/done-overlay/DoneOverlay";
import { Navigation } from "../../types/General";
import { HabitItemProps } from "./types";
import { routes } from '../../../routes';
import { styles } from "./styles";

const iconImage = require("../../assets/three-dots.png");

export interface HabitOwnProps {
    habit: HabitItemProps;
}
export interface HabitStateProps {
    navigation: Navigation;
}
export type HabitProps = HabitStateProps & HabitOwnProps; 

export class Habit extends React.Component<HabitProps, {}> {
    constructor(props: HabitProps) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }
    shouldComponentUpdate(nextProps: HabitProps) {
        const oldProps = this.props.habit;
        const newProps = nextProps.habit;

        return false
            || oldProps.name !== newProps.name
            || oldProps.period !== newProps.period
            || oldProps.notificationTime !== newProps.notificationTime
            || oldProps.done !== newProps.done
        ;
    }
    render() {
        const { name, done } = this.props.habit;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={throttle(this.onPress, 500, { trailing: false })}
                activeOpacity={0.5}
            >
                <DoneOverlay done={done} />
                <View style={styles.habit}>
                    <Text
                        style={styles.habitName}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                    <Image source={iconImage} style={styles.icon}/>
                </View>
            </TouchableOpacity>
        );
    }
    onPress() {
        this.props.navigation.navigate(
            routes.ViewHabit,
            {
                isNew: false,
                isEditing: false,
                habit: this.props.habit,
            },
        );
    }
}

const mapStateToProps = (state: any): HabitStateProps => ({
    navigation: selectNavigation(state),
});

export const HabitConnected = connect<HabitStateProps, {}>(
    mapStateToProps,
    {},
)(Habit);
