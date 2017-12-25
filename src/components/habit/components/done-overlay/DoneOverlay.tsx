import React from "react";
import { View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export interface DoneOverlayProps {
    done: boolean;
}

export class DoneOverlay extends React.PureComponent<DoneOverlayProps, {}> {
    render() {
        if (!this.props.done) {
            return null;
        }
        return (
            <View style={styles.doneOverlay}>
                <FAIcon
                    name="check"
                    color="rgba(46, 204, 113, .8)"
                    size={30}
                />
            </View>
        );
    }
}
