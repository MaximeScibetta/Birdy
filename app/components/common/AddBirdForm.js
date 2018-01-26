import React, { Component } from 'react';
import { ScrollView, View, Text, Button, Picker, Image, TouchableWithoutFeedback } from 'react-native';
import { Field, Spinner } from './';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import nanoid from 'nanoid';

class AddBirdForm extends Component {
    state = {
        uid: firebase.auth().currentUser.uid,
        how: '', 
        date: ''  ,
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

    onButtonPress() {
        this.setState({ error: '', loading: true });

        const { uid, how, date, where, latin_name, ring_nbr, ring_nbr_series, length, lvl, sexe, years } = this.state;
        const captureId = nanoid();

        firebase.database().ref('captures/' + captureId).set({
            id: captureId,
            userID: uid,
            location: where,
            capture_date: date,
            type: how,
            name: latin_name,
            ring_nbr: ring_nbr,
            ring_nbr_series: ring_nbr_series,
            alair_length: length,
            fat_level: lvl,
            sexe: sexe,
            years_old: years
        }).then(Actions.rootTabBar)

    }
    render() {
        const options = [
            "Mâle",
            "Femelle"
        ];

        function setSelectedOption(selectedOption) {
            this.setState({
                sexe: selectedOption
            });
        }

        function renderOption(option, selected, onSelect, index) {
            const style = selected ? { color: '#448aff', fontWeight: 'bold' } : {};

            return (
                <TouchableWithoutFeedback onPress={onSelect} key={index}>
                    <View>
                        <Text style={style}>{option}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        function renderContainer(optionNodes) {
            return <View>{optionNodes}</View>;
        }
        console.log(this.state)
        return (
            <ScrollView>
                <View>
                    <Text>Comment l'oiseau a-t-il été capturé </Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.how}
                        onValueChange={(itemValue, itemIndex) => this.setState({ how: itemValue })}>
                        <Picker.Item label="Sélectionnez..." value="null" />
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
                <View>
                    <Text>Où l'oiseau a-t-il été capturé</Text>
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
                            { this.setState({ where: location }) }
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
                </View>
                <Field
                    keyboardType='default'
                    label='Nom latin'
                    placeholder='rougus gorus'
                    value={this.state.latin_name}
                    onChangeText={text => this.setState({ latin_name: text })} />
                <Field
                    keyboardType='default'
                    label='N° de la bague'
                    placeholder='XD428DX187D'
                    value={this.state.ring_nbr}
                    onChangeText={text => this.setState({ ring_nbr: text })} />
                <Field
                    keyboardType='numeric'
                    label='N° de série de la bague'
                    placeholder='85186245'
                    value={this.state.ring_nbr_series}
                    onChangeText={text => this.setState({ ring_nbr_series: text })} />
                <Field
                    keyboardType='numeric'
                    label='Longueur alair'
                    placeholder='235mm'
                    value={this.state.length}
                    onChangeText={text => this.setState({ length: text })} />
                <Field
                    keyboardType='numeric'
                    label='Niveau de graisse'
                    placeholder='0.52%'
                    value={this.state.lvl}
                    onChangeText={text => this.setState({ lvl: text })} />
                <View>
                    <Text>Sexe</Text>
                    <RadioButtons
                        options={options}
                        onSelection={setSelectedOption.bind(this)}
                        selectedOption={this.state.sexe}
                        renderOption={renderOption}
                        renderContainer={RadioButtons.getViewContainerRenderer({
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 4,
                            borderWidth: 2,
                            borderColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingTop: 10,
                            paddingBottom: 10,
                        })}
                    />
                </View>
                <Field
                    keyboardType='numeric'
                    label='Âge'
                    placeholder='35ans'
                    value={this.state.years}
                    onChangeText={text => this.setState({ years: text })} />
                <View>
                    <Button
                        title='Ajouter loiseau'
                        onPress={this.onButtonPress.bind(this)}>
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