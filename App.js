//@ts-check
import { Map } from "immutable";

import React from "react";
import { Text, View } from "react-native";
import {
    DrawerNavigator,
    StackNavigator,
} from "react-navigation";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MainScreen } from "./src/components/main-screen/MainScreen";
import { reducer as commonReducer, setNavigationActionCreator } from "./src/ducks/common";
import { ViewHabit } from "./src/components/habit/components/view-habit/ViewHabit";
import { CreateHabit } from "./src/components/habit/components/create-habit/CreateHabit";
import styles from "./AppStyles";

const store = createStore(
    commonReducer,
    applyMiddleware(thunk),
);

// For later custom header/menu integration
const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        componentDidMount() {
            // Save navigation object to store for reuse in other components
            store.dispatch(setNavigationActionCreator(this.props.navigation));
        }
        render() {
            return <SomeComponent {...this.props} />;
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
        screen: mapNavigationStateParamsToProps(ViewHabit),
        navigationOptions: ({ navigation }) => { // For more complex titles, options)
            return {
                title: `${navigation.state.params.habit.name}`, // check path to name prop
            };
        },
    },
    CreateHabit: {
        screen: mapNavigationStateParamsToProps(CreateHabit),
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
