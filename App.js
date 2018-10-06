import React, {Component} from 'react';

import { Alert, Button, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';

import { createTabNavigator, createStackNavigator, createSwitchNavigator, NavigationActions, createBottomTabNavigator } from 'react-navigation';

import { Permissions, Notifications } from 'expo';

import * as firebase from 'firebase';

import { styles, authStyles, colors } from './styles';

import {appRegConfig } from './config'

import { Dashboard } from './Dashboard'

import { AccessToken, LoginManager } from 'react-native-fbsdk';

import{ FBLoginButton } from './FBLoginButton';

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
      .then(() => navigate('Welcome'))
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
            <Text>{'Welcome to the Facebook SDK for React Native!'}</Text>
            <FBLoginButton />
          </View>
        </View>
      )
    }
  }
  class WelcomeScreen extends Component {
    constructor(){
      super();
    }

    componentDidMount() {
      this.registerForPushNotifications();
    }

    registerForPushNotifications = async () => {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = status;
      console.log(finalStatus);
      if (status !== 'granted'){
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') { return; }

      let expoTok = await Notifications.getExpoPushTokenAsync();
      let fireTok = await Notifications.getDevicePushTokenAsync();
      let uid = firebase.auth().currentUser.uid;

      firebase.database().ref("users").child(uid).update({
        expoToken: expoTok,
        fireToken: fireTok,
      })
    }
    render() {
      return (
        <TabNavigator/>
      )
    }
  }

const RootSwitchNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },
  Login: { screen: LoginScreen },
  SignUp: {screen: SignUpScreen },
  Welcome: { screen: WelcomeScreen },

  Main: {screen: Dashboard }

})
const AppNavigation = () => (
  <RootSwitchNavigator/>
);
