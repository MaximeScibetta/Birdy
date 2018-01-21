import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

class MyFeed extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Mon fil d'actualité</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    }
})

export default connect(({ routes }) => ({ routes }))(MyFeed)