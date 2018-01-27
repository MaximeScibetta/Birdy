import React, { Component } from 'react';
import { ScrollView, View, Text, Picker, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Field, Spinner } from './common';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import PropTypes from 'prop-types';

class Detail extends Component {
    state = {
        uid: this.props.updateItem.userID,
        captureId: this.props.updateItem.id,
        how: this.props.updateItem.type,
        date: this.props.updateItem.capture_date,
        where: this.props.updateItem.location,
        latin_name: this.props.updateItem.name,
        ring_nbr: this.props.updateItem.ring_nbr,
        ring_nbr_series: this.props.updateItem.ring_nbr_series,
        length: this.props.updateItem.alair_length,
        lvl: this.props.updateItem.fat_level,
        sexe: this.props.updateItem.sexe,
        years: this.props.updateItem.years_old,
        error: '',
        loading: false
    };

    static contextTypes = {
        routes: PropTypes.object,
    };

    onButtonPress() {
        this.setState({ error: '', loading: true });

        const { uid, captureId, how, date, where, latin_name, ring_nbr, ring_nbr_series, length, lvl, sexe, years } = this.state;

        let ref = firebase.database().ref('captures/' + captureId);
        
        return ref
            .update({
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
            })
            .then(Actions.feed)
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
        const { routes } = this.context;
        return (
            <ScrollView>
                <View style={styles.marginItem}>
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
                <View style={styles.marginItem}>
                    <Text>Quand l'oiseau a-t-il été capturé </Text>
                    <DatePicker
                        style={{ width: 200, marginTop: 10 }}
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
                <View style={styles.marginItem}>
                    <Text
                        style={{ marginBottom: 10 }}>Où l'oiseau a-t-il été capturé</Text>
                    <GooglePlacesAutocomplete
                        placeholder='Rechercher le lieu'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'Recherche'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            const location = details.geometry.location;
                            { this.setState({ where: location }) }
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
                <View>
                    <FormLabel>Nom latin</FormLabel>
                    <FormInput
                        keyboardType='default'
                        placeholder='rougus gorus'
                        value={this.state.latin_name}
                        onChangeText={text => this.setState({ latin_name: text })} />
                </View>
                <View>
                    <FormLabel>N° de la bague</FormLabel>
                    <FormInput
                        keyboardType='default'
                        placeholder='XD428DX187D'
                        value={this.state.ring_nbr}
                        onChangeText={text => this.setState({ ring_nbr: text })} />
                </View>
                <View>
                    <FormLabel>N° de série de la bague</FormLabel>
                    <FormInput
                        keyboardType='numeric'
                        placeholder='85186245'
                        value={this.state.ring_nbr_series}
                        onChangeText={text => this.setState({ ring_nbr_series: text })} />
                </View>
                <View>
                    <FormLabel>Longueur alair</FormLabel>
                    <FormInput
                        keyboardType='numeric'
                        placeholder='235mm'
                        value={this.state.length}
                        onChangeText={text => this.setState({ length: text })} />
                </View>
                <View>
                    <FormLabel>Niveau de graisse</FormLabel>
                    <FormInput
                        keyboardType='numeric'
                        placeholder='0.52%'
                        value={this.state.lvl}
                        onChangeText={text => this.setState({ lvl: text })} />
                </View>
                <View>
                    <FormLabel>Âge</FormLabel>
                    <FormInput
                        keyboardType='numeric'
                        placeholder='35 ans'
                        value={this.state.years}
                        onChangeText={text => this.setState({ years: text })} />
                </View>
                <View>
                    <Text style={{ marginLeft: 20, marginTop: 20, }}>Sexe</Text>
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
                <View>
                    <Button
                        raised
                        icon={{ name: 'update' }}
                        title='Ajouter loiseau'
                        onPress={this.onButtonPress.bind(this)}
                        backgroundColor="#2095f3"
                        containerViewStyle={styles.btn} />
                </View>
                <Text>
                    {this.state.message}
                    {this.state.error}
                </Text>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#997F3D',
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
    marginItem: {
        marginBottom: 20,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    }
})

export default connect(({ routes }) => ({ routes }))(Detail)