import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


import { FormLabel, FormInput, Button, Icon  } from 'react-native-elements'
class Form extends Component {
    state = { email: '', password: '', error: '', loading: false }

    onButtonPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(Actions.rootTabBar)
            .catch(() => {
                this.setState({
                    error: 'Problème Chef',
                    loading: false,
                })
            });
    }

    render() {
        return (
            <View>
                <View>
                    <FormLabel>Adresse email</FormLabel>
                    <FormInput
                    keyboardType="email-address"
                    placeholder='votreAdresse@email.com'
                    value={this.state.email} 
                    onChangeText={text => this.setState({ email: text })} />
                </View>
                <View>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormInput
                        keyboardType="default"
                        secureTextEntry
                        placeholder='Entrez votre mot de passe'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })} />
                </View>
                <Button
                    raised
                    icon={{ name: 'send' }}
                    title='Connexion'
                    onPress={this.onButtonPress.bind(this)}
                    backgroundColor="#2095f3"
                    containerViewStyle={styles.btn}/>
                <Button
                    raised
                    title="S'inscrire"
                    onPress={Actions.signup}
                    backgroundColor="#9c26b0"
                    containerViewStyle={styles.btn} />
                <Text>
                    {this.state.message}
                    {this.state.error}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
    },
})

export { Form };