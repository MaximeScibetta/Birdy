import React, { Component } from 'react';
import { View } from 'react-native'
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
                    <EncyclopediaList />
                </View>
            </Provider>
        )
    }
}

export default connect(({ routes }) => ({ routes }))(Bibli)