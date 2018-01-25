import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Field } from './common';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from 'firebase';

class SignUp extends Component {

    state = {
        error:'',
        loading: false,
        email: '', 
        password: '', 
        name: '',
     }

    static contextTypes = {
        routes: PropTypes.object,
    };

    onSignup() {

        this.setState({ error: '', loading: true });
        const { email, password, name } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                var ref = firebase.database().ref().child("user");
                var data = {
                    email: email,
                    password: password,
                    name: name,
                    id: user.uid
                }
                ref.child(user.uid).set(data)
                    .then(Actions.login)
                    .catch(() => {
                        this.setState({
                            error: 'Problème Chef',
                            loading: false,
                        })
                    })
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else if (errorCode == 'auth/email-already-in-use') {
                    alert('The email is already taken.');
                } else if (errorCode == 'auth/weak-password') {
                    alert('Password is weak');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }



    render() {
        console.log(this.state)
        const { routes } = this.context;
        return (
            <View>
                <Field
                    keyboardType="email-address"
                    label='Nom complet'
                    placeholder='Maxime Scibetta'
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })} />
                <Field
                    keyboardType="email-address"
                    label='Adresse email'
                    placeholder='votreAdresse@email.com'
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })} />
                <Field
                    keyboardType="default"
                    secureTextEntry
                    label='Mot de passe'
                    placeholder='Entrez votre mot de passe'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <View style={styles.button}>         
                   <Button title="S'inscrire" onPress={this.onSignup.bind(this)}></Button>
                </View>
                <Text>
                    {this.state.message}
                    {this.state.error}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#997F3D',
    },
    button: {
        marginTop: 30,
    }
})

export default connect(({ routes }) => ({ routes }))(SignUp)