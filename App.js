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
import Bibli from './app/components/screens/Bibli';

import SearchProfile from './app/components/SearchProfile';
import Landing from './app/components/Landing';
import AddBird from './app/components/AddBird';
import Home from './app/components/Home';
import Search from './app/components/Search';
import Login from './app/components/Login';
import UpdateBirds from './app/components/UpdateBirds';
import SignUp from './app/components/SignUp';
import Icon from 'react-native-vector-icons/FontAwesome.js';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


const TabIcon = ({ selected, title, image }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <Icon size={20} name={image} />
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
          <Scene key="root" type={ActionConst.RESET}>
              {/* Screen */}
              <Scene key="login" type="reset" component={Login} title="Se connecter" initial={true}/>
              <Scene key="landing" component={Landing} title="Landing"/>
              <Scene key="addBird" component={AddBird} title="Ajouter un oiseau" />
              <Scene key="detail" component={UpdateBirds} title="Modifier votre capture" updateItem={false} />
              <Scene key="searchprofile" component={SearchProfile} title="Profile rechercher" user={false} />
              <Scene key="signup" component={SignUp} title="Inscription" />

              {/* Menu */}
              <Scene key="rootTabBar" tabs={true} tabBarStyle={{ backgroundColor: '#ffffff' }}>
                  <Scene key="home" component={Home} title="Accueil" image="home" icon={TabIcon} initial />
                  <Scene key="bibli" component={Bibli} title="Encyclopédie" image="book" icon={TabIcon}  />
                  <Scene key="profile" component={Profile} title="Profile" image="user" icon={TabIcon} />
                  <Scene key="search" component={Search} title="Recherche" image="search" icon={TabIcon} />
                  <Scene key="feed" component={Feed} title="Fil d'actualité" image="reorder" icon={TabIcon}/>
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