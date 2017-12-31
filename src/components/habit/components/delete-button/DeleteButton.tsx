import React  from "react";
import { Button, ButtonProps } from "../../../button/Button";
import { colors } from '../../../consts';

export class DeleteButton extends React.PureComponent<Pick<ButtonProps, "onPress">, {}> {
    render() {
        return (
            <Button
                onPress={this.props.onPress}
                label="Delete"
                color={colors.dangerColor}
            />
        );
    }
}
