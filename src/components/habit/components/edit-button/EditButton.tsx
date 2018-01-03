import React  from "react";
import {
    Button,
    ButtonProps,
    CustomStyles,
} from "../../../button/Button";
import { colors } from '../../../consts';

export class EditButton extends React.PureComponent<Pick<ButtonProps, "onPress">, {}> {
    render() {
        const customStyles: CustomStyles = {
            button: {
                borderColor: colors.warningColor,
                backgroundColor: "transparent",
            },
            label: {
                color: colors.warningColor,
            },
        };

        return (
            <Button
                onPress={this.props.onPress}
                label="Edit"
                customStyles={customStyles}
            />
        );
    }
}
