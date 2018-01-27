import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';
import { Card, ListItem, Button, List } from 'react-native-elements'

class CaptureCard extends Component {

     renderButton(capture) {
        if (capture.user.id == firebase.auth().currentUser.uid){
            return(
                <Button
                    raised
                    title="Modifier"
                    onPress={() => Actions.detail({ type: ActionConst.Type, updateItem: capture })}
                    backgroundColor="#2095f3"
                    containerViewStyle={styles.btn} />
            )
        } else {
            return(
                <ListItem
                    title="Par"
                    subtitle ={ capture.user.name }
                    rightIcon={{ name: "face" }}
                />
            )
        }
    }
    
    render(){
        return (
            <Card>
                <List>
                    <ListItem
                        title={this.props.capture.name}
                        rightIcon={{ name: "title" }}
                    />
                    <ListItem
                        title={this.props.capture.capture_date}
                        rightIcon={{ name: "date-range" }}
                        />
                    <ListItem
                        title={this.props.capture.sexe}
                        rightIcon={{ name: "face" }}
                    />
                    <ListItem
                        title={this.props.capture.years_old}
                        rightIcon={{ name: "hourglass-empty" }}
                    />
                    <ListItem
                        title={this.props.capture.location.lat}
                        rightIcon={{ name: "explore" }}
                    />
                </List>
                {this.renderButton(this.props.capture)}
            </Card>    
        )
    }
}
const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
    },
})
export { CaptureCard };
