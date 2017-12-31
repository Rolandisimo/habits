import React from "react";
import { connect } from "react-redux";
import ActionButton from 'react-native-action-button';
import { throttle } from "lodash";
import { Navigation } from "../../types/General";
import { selectNavigation } from "../../ducks/common";
import { routes } from '../../../routes';
import { colors } from '../consts';

export interface NewHabitButtonProps {
    navigation: Navigation;
}

export class NewHabitButton extends React.PureComponent<NewHabitButtonProps, {}> {
    constructor(props: NewHabitButtonProps) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <ActionButton
                buttonColor={colors.dangerColor}
                onPress={throttle(this.onPress, 500, { trailing: false })}
            />
        );
    }

    onPress() {
        this.props.navigation.navigate(
            routes.CreateHabit,
            {
                isNew: true,
                isEditing: false,
                habit: {},
            },
        );
    }
}

const mapStateToProps = (state: any): NewHabitButtonProps => ({
    navigation: selectNavigation(state),
});

export const NewHabitButtonConnected = connect<NewHabitButtonProps, {}>(
    mapStateToProps,
    {},
)(NewHabitButton);
