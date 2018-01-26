import React, { Component } from 'React';
import { connect } from 'react-redux';
import { Text, ScrollView, View, Button, StyleSheet } from 'react-native';
// import ListItem from './ListItem';
import Sound from 'react-native-sound';
import MapView from 'react-native-maps';

class EncyclopediaList extends Component {

    constructor(props){
        super(props)
        this.state = { list: [], loading: false, isPlaying: false };
        this.sound = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    }

    componentDidMount(){
        const datas = fetch('https://www.xeno-canto.org/api/2/recordings?query=bearded%20bellbird%20q:A');

        datas
            .then(data => data.json())
            .then(data => this.setState({ list: data.recordings }));

    }

    componentWillUnmount() {
        this.sound.stop();
        this.sound.release();
    }

    
    playTrack(url){
        this.sound.stop();
        this.sound = new Sound(`http:${url}`, null, (e) => {
            if(e){
                console.log(e)
                return;
            }else{
                this.setState({isPlaying: true});
                this.sound.play();                
            }
        });
    }
    stopTrack(){
        this.setState({ isPlaying: false });
        this.sound.stop()
    }
    renderButtons(url){
        if (this.state.isPlaying) {
            return (
                <Button title="Mettre le son acutel en pause" onPress={() => this.stopTrack()} />
            )
        }else{
            return(
                <Button title="écouter le son" onPress={() => this.playTrack(url)} />
            )
        }
    }

    renderListItems(){
        return this.state.list.map((data, i) => 
            <View>
                <Text> Nom: {data.en} </Text>
                <Text> Localisation: {data.loc} </Text>
                <Text> Pays: {data.cnt} </Text>
                <Text> Type: {data.type} </Text>
                <Text> Date: {data.date} </Text>
                <Text> Heure: {data.time} </Text>
                <View>
                    {this.renderButtons(data.file)}
                </View>
                <MapView
                    liteMode
                    style={styles.map}
                    initialRegion={{
                        latitude: parseInt(this.state.list[i].lat),
                        longitude: parseInt(this.state.list[i].lng),
                        latitudeDelta: 2.015,
                        longitudeDelta: 2.0121,
                    }}
                />
            </View>
        )
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                {this.renderListItems()}
            </ScrollView>                
        )
    }
}

const styles = StyleSheet.create({
    floatBtn: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    container: {
        position: 'relative',
    },
    map: {
        height: 200,
        marginVertical: 50,
    }
})

export default connect(({ routes }) => ({ routes }))(EncyclopediaList)

