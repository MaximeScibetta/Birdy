import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import { ActionConst } from 'react-native-router-flux';

const store = configureStore()
const RouterWithRedux = connect()(Router);

import Profile from './app/components/screens/Profile';
import Feed from './app/components/screens/Feed';
import MyFeed from './app/components/screens/MyFeed';

import Landing from './app/components/Landing';
import PageTwo from './app/components/PageTwo';
import Home from './app/components/Home';
import Search from './app/components/Search';
import Login from './app/components/Login';
import Detail from './app/components/Detail';


import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


const TabIcon = ({ selected, title }) => {
  return (

    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <Text style={{ color: selected ? 'red' : 'black' }} className="nav_title">{title}</Text>
    </View>
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
        console.log('login', this.state)
      }
      else {
        console.log('not')
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" type={ActionConst.RESET}>
              {/* Screen */}
            <Scene key="login" type="reset" component={Login} title="Login" initial={true}/>
              <Scene key="landing" component={Landing} title="Landing"/>
              <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
              <Scene key="detail" component={Detail} title="Detail"/>

              {/* Menu */}
              <Scene key="rootTabBar" tabs={true} tabBarStyle={{ backgroundColor: '#ffffff' }}>
                  <Scene key="home" component={Home} title="Accueil" icon={TabIcon} initial />
                  <Scene key="profile" component={Profile} title="Profile" icon={TabIcon} />
                  <Scene key="search" component={Search} title="Recherche" icon={TabIcon} />
                  <Scene key="feed" component={Feed} title="Fil d'actualité" icon={TabIcon} />
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