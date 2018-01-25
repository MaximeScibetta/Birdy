import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = { 
            id: '',
            email: '',
            password: '',
            name: '',
        }
    }

    onButtonPress(){
        firebase.auth().signOut()
            .then(Actions.login)
     }

     componentDidMount(){
         var user = firebase.auth().currentUser;
         console.log(user)
         this.setState({ 
             id: user.id,
             email: user.email
        } )
     }

     render(){
         console.log(this.state)
         return (
             <View style={styles.container}>
                 <Text style={styles.welcome}>Mon profile</Text>
                <Text>{this.state.email}</Text>
                 <Button
                     onPress={this.onButtonPress}
                     title='Se deconnecter'>
                 </Button>
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

export default connect(({ routes }) => ({ routes }))(Profile)