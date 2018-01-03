import React  from "react";
import {
    Button,
    ButtonProps,
    CustomStyles,
} from "../../../button/Button";
import { colors } from '../../../consts';

export class DeleteButton extends React.PureComponent<Pick<ButtonProps, "onPress">, {}> {
    render() {
        const customStyles: CustomStyles = {
            button: {
                borderColor: "transparent",
                backgroundColor: "transparent",
            },
            label: {
                color: colors.dangerColor,
            },
        };

        return (
            <Button
                onPress={this.props.onPress}
                label="Delete"
                customStyles={customStyles}
            />
        );
    }
}
