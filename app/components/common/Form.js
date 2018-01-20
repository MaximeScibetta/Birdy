import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class Form extends Component {
    state = { email: '', password: '', error: '', loading: false }

    onButtonPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(Actions.landing)
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
                    label='Email'
                    placeholder='example@test.com'
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })} />

                <Field
                    // autoCorrect={false}
                    secureTextEntry
                    label='Password'
                    placeholder='password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />

                <View>
                    <Button
                        title='Log In'
                        onPress={this.onButtonPress.bind(this)}>
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

export { Form };