//@ts-check

import React from "react";
import { Text, View } from "react-native";
import {
    DrawerNavigator,
    StackNavigator,
} from "react-navigation";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Main } from "./src/components/main/Main";
import common from "./src/ducks/common";

const reducer = combineReducers({
    common,
});
const store = createStore(reducer);

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
