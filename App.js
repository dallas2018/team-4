import React, {Component} from 'react';

import { Alert, Button, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

import { createTabNavigator, createStackNavigator, createSwitchNavigator, NavigationActions, createBottomTabNavigator } from 'react-navigation';

import { Permissions, Notifications } from 'expo';

import * as firebase from 'firebase';

import { styles, authStyles, colors } from './styles';

import {appRegConfig } from './config';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { SellDashboard, BuyDashboard } from './Dashboard';

import {SetPreferencesScreen} from './SetPreferences';

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

class LoginWithFacebookButton extends Component {
  onLoginOrRegister = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        }
        // Retrieve the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
      })
      .catch((error) => {
        const { code, message } = error;
    });
  }
  render(){
    return (
        <TouchableOpacity onPress = {this.onLoginOrRegister}>
        <Text>{'Login with Facebook'}</Text>
        </TouchableOpacity>
    );
  }

}


class LoadingScreen extends Component {
  componentDidMount() {
    const { navigate } = this.props.navigation;
    //firebase.auth().onAuthStateChanged(user => {
    //  navigate(user ? 'Main' : 'SignUp')
    navigate('Login');
    //})
  }
  render() {
    return (
      <View>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}


class SignUpScreen extends React.Component {
  constructor(){
    super();
    this.state = { email: '', password: '', errorMessage: null }
  }

  handleSignUp = () => {
    const { navigate } = this.props.navigation;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => navigate('SetPrefs'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={authStyles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
        style = {authStyles.input}
          autoCapitalize="none"
          placeholder="Email"
          keyboardType='email-address'
          returnKeyType="next"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={authStyles.input}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style = {authStyles.buttonContainer} onPress={this.handleSignUp}>
          <Text  style={authStyles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {authStyles.buttonContainer} onPress={() => navigate('Login')}>
          <Text  style={authStyles.buttonText}>{"Already have an account? Log in"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class LoginScreen extends React.Component {
  constructor(){
    super();
    this.state = { email: '', password: '', errorMessage: null }
  }

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Welcome'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={authStyles.container}>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
          style = {authStyles.input}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType='email-address'
            returnKeyType="next"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={authStyles.input}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity style = {authStyles.buttonContainer} onPress={this.handleLogin}>
            <Text  style={authStyles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {authStyles.buttonContainer} onPress={() => navigate('SignUp')}>
            <Text  style={authStyles.buttonText}>{"Don't have an account? Sign Up"}</Text>
          </TouchableOpacity>
          <View style={styles.container}>
          </View>
        </View>
      )
    }
  }
  class WelcomeScreen extends Component {
    constructor(){
      super();
    }

    render() {
      return (
        <TabNavigator/>
      )
    }
  }
const TabNavigator = createBottomTabNavigator(
  {
  SellDash: {screen: SellDashboard,
    navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="dashboard" size={30} color={tintColor} />
          )
        }},
  BuyDash: {screen: BuyDashboard,
    navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="tag-heart" size={30} color={tintColor} />
          )
        }}
  }, {
  tabBarOptions: {
    activeTintColor: colors.colorOne,
    showLabel: false,
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
}
}
);
const RootSwitchNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },
  Login: { screen: LoginScreen },
  SignUp: {screen: SignUpScreen },
  Welcome: { screen: WelcomeScreen },
  SetPrefs: { screen: SetPreferencesScreen}

})
const AppNavigation = () => (
  <RootSwitchNavigator/>
);
