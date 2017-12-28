import React  from "react";
import { Button, ButtonProps } from "../../../button/Button";

export class EditButton extends React.PureComponent<Pick<ButtonProps, "onPress">, {}> {
    render() {
        return (
            <Button
                onPress={this.props.onPress}
                label="Edit"
                color="orange"
            />
        );
    }
}
