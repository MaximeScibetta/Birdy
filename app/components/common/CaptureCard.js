import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

class CaptureCard extends Component {

     renderButton(capture) {
        if (capture.userID == firebase.auth().currentUser.uid){
            return(
                <Button title="Modifier" onPress={() => Actions.detail({ type: ActionConst.Type, updateItem: capture })}></Button>
            )
        } else {
            return(
                <Text>Par {capture.userID}</Text>
            )
        }
    }
    
    render(){
        return (
            <View>
                <Text>{this.props.capture.name}</Text>
                <Text>{this.props.capture.capture_data}</Text>
                <Text>{this.props.capture.fat_level}</Text>
                <Text>{this.props.capture.years_old}</Text>
                <Text>{this.props.capture.sexe}</Text>
                {this.renderButton(this.props.capture)}
            </View>
        )
    }
}

export { CaptureCard };
