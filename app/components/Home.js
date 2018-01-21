import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//import FloatingActionButton from 'react-native-action-button';
// import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    routes: PropTypes.object,
  };
  // const { region } = this.props;
  // console.log(region);
  render() {
    const { routes } = this.context;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Home</Text>
        {/* <FloatingActionButton
        hideShadow={true} // this is to avoid a bug in the FAB library.
        buttonColor="rgba(231,76,60,1)"
        onPress={Actions.login} /> */}
        {/* <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#bb0000',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  //   color: '#ffffff',
  // },
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 400,
  //   width: 400,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
  container: {
    flex: 1,
  },
})

export default connect(state => ({
  routes: state.routes
}), null)(Home);