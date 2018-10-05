import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    console.ignoredYellowBox = ['Setting a timer'];

    if (!firebase.apps.length) {
      firebase.initializeApp(appRegConfig);
    }
  }
  render() {
    return (
      <AppNavigation/>
    );
  }
}


const AppNavigation = () => (
  <RootSwitchNavigator/>
);
