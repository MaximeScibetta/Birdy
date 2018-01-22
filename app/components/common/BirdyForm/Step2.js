import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import DatePicker from 'react-native-datepicker'

class Step2 extends Component {
    state = { date: null };

    nextStep() {
        this.props.saveValues(this.state)
        this.props.nextStep()
    }

    render() {
        return (
            <View>
                <Text>Quand l'oiseau a-t-il été capturé </Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Sélectionnez une date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2018"
                    maxDate="01-01-2100"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
                <Button onPress={this.previousStep} title="Précédent"></Button>
                <Button onPress={this.nextStep} title="Suivant"></Button>
            </View>
        )
    }
}

export { Step2 };