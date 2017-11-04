// @ts-check

import React from "react";
import {StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";

export class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
        );
    }
}

export default Main;
