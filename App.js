//@ts-check
import { Map } from "immutable";

import React from "react";
import { Text, View } from "react-native";
import {
    DrawerNavigator,
    StackNavigator,
} from "react-navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { MainScreen } from "./src/components/main-screen/MainScreen";
import common from "./src/ducks/common";
import { ViewHabit } from "./src/components/habit/components/view-habit/ViewHabit";
import { CreateHabit } from "./src/components/habit/components/create-habit/CreateHabit";
import styles from "./AppStyles";

const store = createStore(common);

// For later custom header/menu integration
const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            return (
                <View style={styles.container}>
                    {/* <Header navigate={this.props.navigation.navigate} /> */}
                    <SomeComponent {...this.props} />
                </View>
            )
        }
    }
}

const Stacks = StackNavigator({
    MainScreen: {
        screen: mapNavigationStateParamsToProps(MainScreen),
        navigationOptions: {
            header: null,
        },
    },
    ViewHabit: {
        screen: ViewHabit,
        navigationOptions: ({ navigation }) => { // For more complex titles, options)
            return {
                title: `${navigation.state.params.name}`, // check path to name prop
            };
        },
    },
    CreateHabit: {
        screen: CreateHabit,
        navigationOptions: ({ navigation }) => { // For more complex titles, options)
            return {
                title: "Create new habit",
            };
        },
    },
});


export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Stacks />
            </Provider>
        );
    }
}
