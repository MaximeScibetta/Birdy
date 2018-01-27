import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import {CaptureCard} from '../common/CaptureCard'
var _ = require('lodash');


class Feed extends Component{


    constructor(props){
        super(props)
        this.state = { captures: [], log: false };
    }

    componentDidMount(){
            let capturesRef = firebase.database().ref("captures/");
            capturesRef.on("value",
                snapshot => { this.setState({ captures: Object.values( snapshot.val() ) })})
    }

    renderCaptures(){
        return Object.values(this.state.captures).map((data, i) => 
            <CaptureCard key={i} capture={data} />,
        )
    }
    render() {
        return (
            <ScrollView>
                {this.renderCaptures()}
            </ScrollView>
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