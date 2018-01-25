import React, { Component } from 'React';
import { connect } from 'react-redux';
import { FlatList, Text, ScrollView, View, Button, StyleSheet } from 'react-native';
import ListItem from './ListItem';
import Sound from 'react-native-sound';

class EncyclopediaList extends Component {

    constructor(props){
        super(props)
        // this.props.isPlaying = false;
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
        //gets called, but doesn't stop playing
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
            </View>
        )
    }

    render(){
        console.log(this.state.isPlaying)
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
    }
})

export default connect(({ routes }) => ({ routes }))(EncyclopediaList)

//     renderRow(singleLibrary) {
//         return <ListItem content={singleLibrary} />
//     };

//     render() {
//         return (
//             <FlatList
//                 data={this.props.encyclopedia}
//                 renderItem={this.renderRow}
//             />
//         );
//     }
// }

// const mapStateToProps = state => {
//     return { encyclopedia: state.encyclopedia }

// }

// export default connect(mapStateToProps)(EncyclopediaList);

