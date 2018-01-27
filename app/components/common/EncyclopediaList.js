import React, { Component } from 'React';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, Linking } from 'react-native';
// import ListItem from './ListItem';
import Sound from 'react-native-sound';
import MapView from 'react-native-maps';


import { Card, ListItem, Button, List  } from 'react-native-elements'
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
                <Button
                    raised
                    icon={{ name: 'stop', type: 'font-awesome' }}
                    title='Mettre le son acutel en pause'
                    onPress={() => this.stopTrack()}
                    backgroundColor="#ff5723"
                    containerViewStyle={styles.btn} />
            )
        }else{
            return(
                <Button
                    raised
                    icon={{ name: 'play', type: 'font-awesome' }}
                    title='Écouter le son'
                    onPress={() => this.playTrack(url)}
                    backgroundColor="#2095f3"
                    containerViewStyle={styles.btn} />
            )
        }
    }

    renderListItems(){
        return this.state.list.map((data, i) => 
            <Card
                title={data.en}
                image={{ uri: 'http://insider.si.edu/wordpress/wp-content/uploads/2017/04/SCTA-copy.jpg'}}>
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
                <List>
                    <ListItem
                        title={data.loc}
                        rightIcon={{ name: "location-on" }}
                    />
                    <ListItem
                        title={data.cnt}
                        rightIcon={{ name: "vpn-lock" }}
                    />
                    <ListItem
                        title={data.date}
                        rightIcon={{ name: "date-range" }}
                    />
                    <ListItem
                        title={data.time}
                        rightIcon={{ name: "access-time" }}
                    />
                    <ListItem
                        title="Fiche de descriptive"
                        leftIcon={{ name: "description" }}
                        onPressRightIcon={() => Linking.openURL(data.url)}
                    />
                </List>
                <View>
                    {this.renderButtons(data.file)}
                </View>
            </Card>
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
        marginVertical: 20,
    },
    btn: {
        marginTop: 20,
    },
})

export default connect(({ routes }) => ({ routes }))(EncyclopediaList)

