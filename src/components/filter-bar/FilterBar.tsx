import React  from "react";
import {
    View,
    Text,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { colors } from '../consts';

export interface FilterBarProps {
}

export class FilterBar extends React.PureComponent<FilterBarProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.filterLabel}>
                        Showing: <Text style={styles.filterMode}>All</Text>
                    </Text>
                    <FAIcon
                        name="caret-down"
                        color={colors.successColor}
                        size={20}
                    />
                </View>
            </View>
        );
    }
}
