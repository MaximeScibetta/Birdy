import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

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
                <Field
                    keyboardType="email-address"
                    label='Email'
                    placeholder='votreAdresse@email.com'
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })} />

                <Field
                    keyboardType="default"
                    // autoCorrect={false}
                    secureTextEntry
                    label='Mot de passe'
                    placeholder='Entrez votre mot de passe'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />

                <View style={styles.button}>
                    <Button
                        title='Connexion'
                        onPress={this.onButtonPress.bind(this)}>
                    </Button>
                </View>
                <View style={styles.button}>
                    <Button
                        title="S'inscrire"
                        onPress={Actions.signup}>
                    </Button>
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
        marginTop: 20,
    },
})

export { Form };