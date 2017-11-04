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

const reducer = combineReducers({
    common,
});
const store = createStore(reducer);

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <MainScreen />
            </Provider>
        );
    }
}
