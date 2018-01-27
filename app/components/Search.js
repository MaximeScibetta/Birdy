import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Field } from './common'
import { CaptureCard } from './common/CaptureCard'
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Card, ListItem, Button, List, SearchBar  } from 'react-native-elements'
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
                <ListItem
                    title={ data.name }
                    subtitle={data.email}
                    onPressRightIcon={() => Actions.searchprofile({ type: ActionConst.Type, user: data })}
                />
            )
        } else {
            return <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center' }}>Votre recherche n'a trouvé aucune utilisateur</Text>
        }
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <SearchBar
                        value={this.state.query}
                        onChangeText={text => this.setState({ query: text })}
                        onClearText={text => this.setState({ query: text })}
                        placeholder='Entrez votre recherche ...' />
                    <Button
                        raised
                        icon={{ name: 'search' }}
                        title="Rechercher"
                        onPress={() => this.searchUser()}
                        backgroundColor="#2095f3"
                        containerViewStyle={styles.btn} />
                </View>
                <List style={styles.center}>
                    {this.renderResults()}
                </List>
            </ScrollView>
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
    },
    btn: {
        marginTop: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(({ routes }) => ({ routes }))(Search)