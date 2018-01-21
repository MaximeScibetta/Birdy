import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FloatingActionButton from 'react-native-action-button';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Home</Text>
      <FloatingActionButton
        hideShadow={true} // this is to avoid a bug in the FAB library.
        buttonColor="rgba(231,76,60,1)"
        onPress={Actions.login} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
})

export default connect(({routes}) => ({routes}))(Home)