import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './app/store/configureStore';

const store = configureStore()
const RouterWithRedux = connect()(Router);


import Landing from './app/components/Landing';
import PageTwo from './app/components/PageTwo';
import Home from './app/components/Home';
import Search from './app/components/Search';
import Login from './app/components/Login';
import Detail from './app/components/Detail';
import firebase from 'firebase';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  )
}

export default class App extends Component {

  state = { loggedIn: null }


  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCwUPc6yBwmDFgwHro4P6upwuOlKS5zkFA",
      authDomain: "birdy-38cf5.firebaseapp.com",
      databaseURL: "https://birdy-38cf5.firebaseio.com",
      projectId: "birdy-38cf5",
      storageBucket: "birdy-38cf5.appspot.com",
      messagingSenderId: "528897884384"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="landing" component={Landing} title="Landing" />
            <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
            <Scene key="login" component={Login} title="Login" initial={true} />
            <Scene
              key="rootTabBar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#ffffff' }}>
              <Scene key="home" component={Home} title="Home" icon={TabIcon} initial />
              <Scene key="search" component={Search} title="Search" icon={TabIcon} />
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  tarBarStyle: {
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  }
})