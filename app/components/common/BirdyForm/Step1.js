import React, { Component } from 'react';
import { View, Text, Button, Picker } from 'react-native';

export default class Step1 extends Component {
    state = { how: null };


    nextStep() {
        this.props.saveValues(this.state.how)
        this.props.nextStep()
    }

    render() {
        console.log(this.state)
        return (
            <View>
                <Text>Comment l'oiseau a-t-il été capturé </Text>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.how}
                    onValueChange={(itemValue, itemIndex) => { this.props.fieldValues.how }}>
                    <Picker.Item label="Sélectionnez" value="null" />
                    <Picker.Item label="Au nid" value="nid" />
                    <Picker.Item label="Au filet" value="filet" />
                    <Picker.Item label="A la cânne à pèche" value="canne" />
                </Picker>
                <Button onPress={this.nextStep} title="Suivant"></Button>
            </View>
        )
    }
}