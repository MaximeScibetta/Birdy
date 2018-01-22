import React, { Component } from 'react';
import { ScrollView, View, Text, Button, Picker } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'


class AddBirdForm extends Component {
    state = {
        how: '', 
        when: '',
        where: '',
        latin_name: '',
        ring_nbr: '',
        ring_nbr_series: '',
        length: '',
        lvl: '',
        sexe: '',
        years: '',
        error: '', 
        loading: false 
    }

    // onButtonPress() {
    //     this.setState({ error: '', loading: true });

    //     const { email, password } = this.state;

    // }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Comment l'oiseau a-t-il été capturé </Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.how}
                        onValueChange={(itemValue, itemIndex) => this.setState({ how: itemValue })}>
                        <Picker.Item label="Sé" value="nid" />
                        <Picker.Item label="Au nid" value="nid" />
                        <Picker.Item label="Au filet" value="filet" />
                        <Picker.Item label="A la cânne à pèche" value="canne" />
                    </Picker>
                </View>
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
                </View>
                <Field
                    label='Comment ?'
                    placeholder='Au fillet diagonal'
                    value={this.state.how}
                    onChangeText={text => this.setState({ how: text })} />
                <Field
                    label='Comment ?'
                    placeholder='09/09/2017'
                    value={this.state.when}
                    onChangeText={text => this.setState({ when: text })} />
                <Field
                    label='Où ?'
                    placeholder='Rue des oiseaux 4052, Liège'
                    value={this.state.where}
                    onChangeText={text => this.setState({ where: text })} />
                <Field
                    label='Nom latin'
                    placeholder='rougus gorus'
                    value={this.state.latin_name}
                    onChangeText={text => this.setState({ latin_name: text })} />
                <Field
                    label='N° de la bague'
                    placeholder='XD428DX187D'
                    value={this.state.ring_nbr}
                    onChangeText={text => this.setState({ ring_nbr: text })} />
                <Field
                    label='N° de série de la bague'
                    placeholder='85186245'
                    value={this.state.ring_nbr_series}
                    onChangeText={text => this.setState({ ring_nbr_series: text })} />
                <Field
                    label='Longueur alair'
                    placeholder='235mm'
                    value={this.state.length}
                    onChangeText={text => this.setState({ length: text })} />
                <Field
                    label='Niveau de graisse'
                    placeholder='0.52%'
                    value={this.state.lvl}
                    onChangeText={text => this.setState({ lvl: text })} />
                <Field
                    label='Sexe'
                    placeholder='Mâle'
                    value={this.state.sexe}
                    onChangeText={text => this.setState({ sexe: text })} />
                <Field
                    label='Âge'
                    placeholder='35ans'
                    value={this.state.years}
                    onChangeText={text => this.setState({ years: text })} />

                <View>
                    <Button
                        title='Ajouter loiseau'
                        onPress={this.onButtonPress}>
                    </Button>
                </View>
                <Text>
                    {this.state.message}
                    {this.state.error}
                </Text>
                <Text>
                    {this.state.birds}
                </Text>
            </ScrollView>
        )
    }
}

export { AddBirdForm };