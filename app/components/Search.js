import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import { Field } from './common'
import { CaptureCard } from './common/CaptureCard'
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

class Search extends Component {

    state = {
        query: '',
        results: [],
    }

    searchUser(){
        firebase.database().ref("user/").orderByChild('name')
            .startAt(this.state.query)
            .endAt(this.state.query + "\uf8ff")
            .once("value", snapshot => {
                this.setState({ results: Object.values(snapshot.val()) })
            })
    }

    renderResults() {
        if (this.state.results.length != 0) {
            return Object.values(this.state.results).map((data, i) =>
                <View>
                    <Text>{data.name}</Text>
                    <Text>{data.email}</Text>
                    <Button title="voir le profil" onPress={() => Actions.searchprofile({ type: ActionConst.Type, user: data })}></Button>
                </View>
            )
        } else {
            return <Text>Votre recherche n'a trouvé aucune utilisateur</Text>
        }
    }

    render() {
        console.log(this.state)
        return (
            <View>
                <Field
                    keyboardType="default"
                    label='Recherche des utilisateurs'
                    placeholder="Le nom exacte de l'utilistateur ..."
                    value={this.state.query}
                    onChangeText={text => this.setState({ query: text })} />
                <Button
                    title="Rechercher"
                    onPress={() => this.searchUser()}>></Button>
                <View>
                    {this.renderResults()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffcb05',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    }
})

export default connect(({ routes }) => ({ routes }))(Search)