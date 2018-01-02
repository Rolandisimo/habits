import React  from "react";
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Animated,
    GestureResponderEvent,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { colors } from '../consts';
import {
    styles,
    filterOptionsContainer,
} from "./styles";

export interface FilterBarProps {
}

export interface FilterState {
    isFilterOpen: boolean;
    fadeAnimationValue: Animated.Value;
    topPositionAnimationValue: Animated.Value;
}

export class FilterBar extends React.PureComponent<FilterBarProps, FilterState> {
    public constructor(props: FilterBarProps) {
        super(props);

        this.onOpenFilterToggle = this.onOpenFilterToggle.bind(this);
        this.onOptionPress = this.onOptionPress.bind(this);

        this.state = {
            isFilterOpen: false,
            fadeAnimationValue: new Animated.Value(0),
            topPositionAnimationValue: new Animated.Value(0),
        }
    }
    public render() {
        const filterOptionsContainerStyles = [
            {
                ...filterOptionsContainer,
                opacity: this.state.fadeAnimationValue,
                transform: [
                    {scaleY: this.state.topPositionAnimationValue},
                    {perspective: 1000}, // FROM SPEC: without this line this Animation will not render on Android while working fine on iOS
                ],
            },
        ];

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.innerContainer}
                    onPress={this.onOpenFilterToggle}
                >
                    <Text style={styles.filterLabel}>
                        Showing: <Text style={styles.filterMode}>All</Text>
                    </Text>
                    <FAIcon
                        name="caret-down"
                        color={colors.successColor}
                        size={20}
                        style={this.state.isFilterOpen ? { transform: [{ rotate: "-90deg" }]} : undefined}
                    />
                </TouchableOpacity>
                <Animated.View
                    pointerEvents={this.state.isFilterOpen ? "all" : "none"}
                    style={filterOptionsContainerStyles}
                >
                    <TouchableOpacity
                        style={styles.filterOption}
                        onPress={this.onOptionPress}
                    >
                        <Text style={styles.filterOptionLabel}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterOption}
                        onPress={this.onOptionPress}
                    >
                        <Text style={styles.filterOptionLabel}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterOption}
                        onPress={this.onOptionPress}
                    >
                         <Text style={styles.filterOptionLabel}>Not Done</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
    private onOpenFilterToggle() {
        this.setState({
            isFilterOpen: !this.state.isFilterOpen,
        }, this.toggleAnimationFade);
    }
    private toggleAnimationFade() {
        if (this.state.isFilterOpen) {
            // Opacity animation
            Animated.timing(
                this.state.fadeAnimationValue,
                {
                    toValue: 1,
                    duration: 200,
                }
            ).start();  

            // Top animation
            Animated.timing(
                this.state.topPositionAnimationValue,
                {
                    toValue: 1,
                    duration: 200,
                }
            ).start();  
        } else {
            // Opacity animation
            Animated.timing(
                this.state.fadeAnimationValue,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start();

            // Top animation
            Animated.timing(
                this.state.topPositionAnimationValue,
                {
                    toValue: 0,
                    duration: 200,
                }
            ).start();  
        }
    }
    private onOptionPress(event: GestureResponderEvent) {
        // Get inner text and set the filter
    }
}
