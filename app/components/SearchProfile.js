import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase';
import { CaptureCard } from './common/CaptureCard'
import { ListItem, Button, List } from 'react-native-elements'
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
            return <Text style={{ marginTop: 100 }}>{this.state.user.name} n'a pas encore de capture</Text>
        }
    }

    render() {
        return (
            <ScrollView>
                <List>
                    <ListItem
                        title={this.state.user.name}
                        subtitle={this.state.user.email}
                        rightIcon={{ name: "face" }}
                    />
                </List>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(({ routes }) => ({ routes }))(SearchProfile)