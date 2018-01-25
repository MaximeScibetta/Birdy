import React, { Component } from 'React';
import { connect } from 'react-redux';
import { FlatList, Text, ScrollView, View, Button } from 'react-native';
import ListItem from './ListItem';
import Sound from 'react-native-sound';

class EncyclopediaList extends Component {

    constructor(props){
        super(props)
        this.state = { list: [], loading: false };
    }

    componentDidMount(){
        const datas = fetch('https://www.xeno-canto.org/api/2/recordings?query=bearded%20bellbird%20q:A');

        datas
            .then(data => data.json())
            .then(data => this.setState({ list: data.recordings }));

    }

    playTrack = () => {
        const track = new Sound('http://www.xeno-canto.org/334312/download', null, (e) => {
            if (e) {
                console.log('error loading track:', e)
            } else {
                track.play()
            }
        })
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
                <Button title="play me" onPress={this.playTrack} />
            </View>
        )
    }

    render(){
        console.log(this.state)
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

