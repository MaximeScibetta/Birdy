import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import { CaptureCard } from './common/CaptureCard'

class SearchProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            userCaptures: [],
        }
    }

    componentDidMount() {
        firebase.database().ref("captures/").orderByChild("user/id").equalTo(this.props.user.id).on("value", snapshot => {
            if (snapshot.val() != null) {
                this.setState({ userCaptures: Object.values(snapshot.val()) })
            } else {
                return;
            }
        });
    }


    renderCaptures() {
        if (this.state.userCaptures.length != 0) {
            return Object.values(this.state.userCaptures).map((data, i) =>
                <CaptureCard key={i} capture={data} />,
            )
        } else {
            return <Text>Vous n'avez pas encore de capture</Text>
        }
    }

    render() {
        console.log(this.state.userCaptures)
        return (
            <ScrollView>
                <Text>Le SearchProfile de {this.state.user.name}</Text>
                <Text>Votre adresse email : {this.state.user.email}</Text>
                <Text>Votre mot de passe: {this.state.user.password}</Text>

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

export default connect(({ routes }) => ({ routes }))(SearchProfile)