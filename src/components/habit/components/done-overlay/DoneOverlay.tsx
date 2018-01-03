import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

export interface DoneOverlayProps {
    done: boolean;
}

const iconImage = require("../../../../assets/check.png");

export class DoneOverlay extends React.PureComponent<DoneOverlayProps, {}> {
    render() {
        if (!this.props.done) {
            return null;
        }

        return (
            <View style={styles.doneOverlay}>
                <Image source={iconImage} style={styles.icon}/>
            </View>
        );
    }
}
