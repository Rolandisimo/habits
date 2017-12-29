
import React from "react";
import { StackNavigator } from "react-navigation";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MainScreen } from "./components/main-screen/MainScreen";
import { reducer as commonReducer, setNavigationActionCreator } from "./ducks/common";
import { ViewHabitConnected } from "./components/habit/components/view-habit/ViewHabit";
import { CreateHabitConnected } from "./components/habit/components/create-habit/CreateHabit";
import { Navigation } from "./types/General";
import { habitRestMiddleware, initHabitRestActionCreator } from "./middleware/habitRest";
import { notificationsMiddleware, notificationsInitActionCreator } from "./middleware/notifications";

const store = createStore(
    commonReducer as any, // TODO: Fix incompatible type
    applyMiddleware(
        thunk,
        habitRestMiddleware,
        notificationsMiddleware,
    ),
);
store.dispatch(initHabitRestActionCreator());
store.dispatch(notificationsInitActionCreator());

export interface NavigationOptions {
    navigation: Navigation,
}

// For later custom header/menu integration
function mapNavigationStateParamsToProps<T extends NavigationOptions>(
    Component: React.ComponentClass<T> | React.StatelessComponent<T>
) {
    return class extends React.Component<T, {}> {
        static navigationOptions = (Component as any).navigationOptions; // better use hoist-non-react-statics
        componentDidMount() {
            // Save navigation object to store for reuse in other components
            store.dispatch(setNavigationActionCreator(this.props.navigation));
        }
        render() {
            return <Component {...this.props} />;
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
        screen: mapNavigationStateParamsToProps(ViewHabitConnected),
        navigationOptions: ({ navigation }: NavigationOptions) => { // For more complex titles, options)
            return {
                title: `${navigation.state.params.habit.name}`, // check path to name prop
            };
        },
    },
    CreateHabit: {
        screen: mapNavigationStateParamsToProps(CreateHabitConnected),
        navigationOptions: ({ navigation }: NavigationOptions) => { // For more complex titles, options)
            return {
                title: "Create new habit",
            };
        },
    },
});


export default class App extends React.PureComponent<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Stacks />
            </Provider>
        );
    }
}
