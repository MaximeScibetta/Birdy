import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';


class Feed extends Component{

    componentWillMount(){

        firebase.database().ref("captures/")
            .on("value", (snapshot) => {
                this.setState(snapshot.val())
            });
            
    }

    render(){
        console.log(this.state)
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fil d'actualité</Text>
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

export default connect(({ routes }) => ({ routes }))(Feed)