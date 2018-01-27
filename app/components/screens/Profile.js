import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import { CaptureCard } from '../common/CaptureCard'
import { Card, ListItem, Button, List, SearchBar } from 'react-native-elements'

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
            return <Text style={{marginTop: 100}}>Vous n'avez pas encore de capture</Text>
        }
    }

     render(){
         return (
             <ScrollView>
                 <List>
                     <ListItem
                         title={this.state.user.name}
                         subtitle={this.state.user.email}
                     />
                 </List>
                <Button
                    raised
                    title="Se deconnecter"
                    onPress={this.onButtonPress}
                    backgroundColor="#2095f3"
                    containerViewStyle={styles.btn} />
                 <View style={styles.center}>
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
    },
    btn: {
        marginTop: 20,
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(({ routes }) => ({ routes }))(Profile)