import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet,Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import { CaptureCard } from '../common/CaptureCard'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = { 
           user: {},
           myCaptures: [],
        }
    }

    componentDidMount() {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref("user/" + userId).on("value", snapshot => { this.setState({ user: snapshot.val() } ) })


        firebase.database().ref("captures/").orderByChild("user/id").equalTo(userId).on("value", snapshot => {
            if(snapshot.val() != null){
                this.setState({ myCaptures: Object.values(snapshot.val()) })
            }else{
                return;
            }
        });
    }
    onButtonPress(){
        firebase.auth().signOut()
            .then(Actions.login)
     }

    renderCaptures() {
        if(this.state.myCaptures.length != 0){
            return Object.values(this.state.myCaptures).map((data, i) =>
                <CaptureCard key={i} capture={data} />,
            )
        }else{
            return <Text>Vous n'avez pas encore de capture</Text>
        }
    }

     render(){
        console.log(this.state.myCaptures)
         return (
             <ScrollView>
                <Text>Le profile de {this.state.user.name}</Text>
                 <Text>Votre adresse email : {this.state.user.email}</Text>
                 <Text>Votre mot de passe: {this.state.user.password}</Text>
                <Button
                    onPress={this.onButtonPress}
                    title='Se deconnecter'>
                </Button>
                <View>
                    {this.renderCaptures()}
                </View>
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

export default connect(({ routes }) => ({ routes }))(Profile)