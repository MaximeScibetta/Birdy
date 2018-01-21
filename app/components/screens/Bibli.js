import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import EncyclopediaList from '../common/EncyclopediaList';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers';

class Bibli extends Component {

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View>
                    <Text>Okiii</Text>
                    <EncyclopediaList />
                </View>
            </Provider>
        )
    }
}


const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#bb0000',
    // },
    // welcome: {
    //     fontSize: 20,
    //     textAlign: 'center',
    //     margin: 10,
    //     color: '#ffffff',
    // }
})

export default connect(({ routes }) => ({ routes }))(Bibli)