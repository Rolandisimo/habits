import React  from "react";
import { Button, ButtonProps } from "../../../button/Button";

export class SaveButton extends React.PureComponent<Pick<ButtonProps, "onPress", "disabled">, {}> {
    render() {
        return (
            <Button
                onPress={this.props.onPress}
                label="Save"
                disabled={this.props.disabled}
            />
        );
    }
}
