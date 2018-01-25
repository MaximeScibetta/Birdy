import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import EncyclopediaList from '../common/EncyclopediaList';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../reducers';
import FloatingActionButton from 'react-native-action-button';


class Bibli extends Component {

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View>
                    <FloatingActionButton
                        style={styles.floatBtn}
                        hideShadow={true} // this is to avoid a bug in the FAB library.
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => console.log('btn')} />
                    <Text>Okiii</Text>
                    <EncyclopediaList />
                </View>
            </Provider>
        )
    }
}


const styles = StyleSheet.create({
    floatBtn: {
        zIndex: 10,
    },
})

export default connect(({ routes }) => ({ routes }))(Bibli)