import React, { Component } from 'React';
import { connect } from 'react-redux';
import { FlatList, Text, ScrollView, View, Button } from 'react-native';
import ListItem from './ListItem';
import Sound from 'react-native-sound';

class EncyclopediaList extends Component {

    constructor(props){
        super(props)
        this.state = { list: [], loading: false };
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
                this.sound.play();                
            }
        });
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
                    <Button title="écouter le son" onPress={() => this.playTrack(data.file) } />
                    {/* <Button title="Mettre en pause" onPress={this.stopTrack()} /> */}
                </View>
            </View>
        )
    }

    render(){
        return(
            <View>
                {this.renderListItems()}
            </View>                
        )
    }
}
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

