/* eslint-disable eqeqeq */
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import DrawerScreen, {
  AuthStackScreen,
} from './src/Screens/Routes/AppNavigation';
import {
  Linking,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
// import {reducer} from '/src/Reducers/reducers';
import Store from './src/Store';
import AsyncStorage from '@react-native-community/async-storage';
import deviceStorage from './src/Actions/deviceStorage';
import {setURL} from './src/Actions/actions';
import firebase from 'react-native-firebase';

class App extends Component {
  state = {
    isLoggedin: 2,
    loading: false,
    isUrl: false,
  };
  linking = {
    prefixes: ['SwissEdApp://', 'https://test.suhaibwebb.org'],
    config: {
      screens: {
        AuthStackScreen: {
          initialRouteName: 'LoginEmail',
          screens: {
            LoginEmail: 'LoginEmail',
          },
        },
      },
    },
  };

  async UNSAFE_componentWillMount() {
    const tkn = await deviceStorage.getItem('isLoggedin');
    console.log('yahaaaaaaan', tkn);

    await this.setState({isLoggedin: tkn});

    await SplashScreen.hide();

    // setTimeout(() => SplashScreen.hide(), 15000);

    console.log('yahan aya');
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = async event => {
    console.log(event.url);
    var url = event.url.replace('https://appleapp.suhaibwebb.org/', '');
    console.log('ye he new url', url);
    deviceStorage.saveItem('emailUrl', url);
    Store.dispatch(setURL());

    console.log(this.state.isUrl);
  };

  async checkAuth() {}

  async componentDidMount() {
    //we check if user has granted permission to receive push notifications.
    this.checkPermission();
    // Register all listener for notification
    this.createNotificationListeners();
    // setTimeout(() => SplashScreen.hide(), 15000);
  }
  async checkPermission() {
    console.log('in heree permission');
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken, 'yerhaaa  fcm token');

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken, 'yerhaaa  fcm token');
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        console.log(notification);
        console.log(notification);

        this.displayNotification(title, body);
      });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {body, image} = notificationOpen.notification;
        console.log(notificationOpen);
        this.displayNotification(body, image);
      });

    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {body, image} = notificationOpen.notification;
      console.log(notificationOpen);

      this.displayNotification(body, image);
    }
  }

  displayNotification(body, mediaUrl) {
    // we display notification in alert box with title and body
    // Alert.alert(mediaUrl)
    Alert.alert(
      body,
      mediaUrl,
      [{text: 'Ok', onPress: () => console.log('ok pressed')}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={Store}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <NavigationContainer
          // ref={navigatorRef => {
          //   setTopLevelNavigator(navigatorRef);
          // }}
          >
            {/* {this.state.loading ? (
              <View style={styles.activity}>
                <ActivityIndicator color="#ffffff" size="large" />
              </View>
            ) : (
              <View  >
              </View>
            )} */}
            {// <AuthStackScreen />
            // setTimeout(() => {
            this.state.isLoggedin == 'true' ? (
              <DrawerScreen />
            ) : (
              // <DrawerScreen />

              [
                this.state.isLoggedin == false ||
                this.state.isLoggedin == 'false' ||
                this.state.isLoggedin == null ? (
                  // <DrawerScreen />

                  <AuthStackScreen check={this.state.isUrl} />
                ) : null,
                // <DrawerScreen />
              ]
            )}
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
