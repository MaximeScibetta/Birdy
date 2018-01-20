import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

export default class PageTwo extends Component {
    static contextTypes = {
        routes: PropTypes.object,
    };
    render() {
        const { routes } = this.context;

        console.log(this.props)
        return (
            <View style={{ margin: 128 }}>
                <Text>This is PageTwo!</Text>
                <Text onPress={() => Actions.pop()}>{this.props.title}</Text>
            </View>
        )
    }
}