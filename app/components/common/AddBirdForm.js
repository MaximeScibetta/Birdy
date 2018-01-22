import React, { Component } from 'react';
import { ScrollView, View, Text, Button, Picker, Image } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class AddBirdForm extends Component {
    state = {
        how: '', 
        when: '',
        where: {
            lat: '',
            long: '',
        },
        latin_name: '',
        ring_nbr: '',
        ring_nbr_series: '',
        length: '',
        lvl: '',
        sexe: '',
        years: '',
        error: '', 
        loading: false 
    };

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
   
                <GooglePlacesAutocomplete
                    placeholder='Rechercher le lieu'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'Recherche'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render

                    // onChangeText = {(data, details = null) => {
                    //     { text => this.setState({ latin_name: text }) }
                    // }}
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        const location = details.geometry.location;
                        { this.setState({where: location }) }
                        console.log(this.state)
                    }}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyAJ2hQAgN4zT74afdxQUZQiq7oyJiYRdV0',
                        language: 'fr', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />
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