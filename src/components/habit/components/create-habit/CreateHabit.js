//@ts-check

import React from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";

export class CreateHabit extends React.PureComponent {
    render() {

        return (
            <Text> It Works! </Text>
        );
    }
}

// CreateHabit.propTypes = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.func,
//         state: PropTypes.shape({
//             key: PropTypes.string,
//             routeName: PropTypes.string,
//             params: PropTypes.shape({
//                 id: PropTypes.number.isRequired,
//                 name: PropTypes.string.isRequired,
//                 period: PropTypes.number.isRequired,
//             }),
//         }),
//     }),
// };
