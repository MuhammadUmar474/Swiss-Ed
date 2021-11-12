/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.handleBackButton = this.handleBackButton.bind(this);

    //    console.log(props.navigation,props.navigation.canGoBack())
    //    props.navigation.canGoBack =false
  }

  componentDidMount() {
    console.log('props is URL: ', this.props.homeReducer.isURL);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    console.log('unmount me aya');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    // BackHandler.exitApp();

    if (!this.props.navigation.canGoBack()) {
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.disableYellowBox= true;

    const {navigation} = this.props.navigation;
    if (this.props.homeReducer.isURL) {
      console.log('after props is URL: ', this.props.homeReducer.isURL);
      this.props.navigation.navigate('NewPassword');
    }
    return (
      <View style={{flex: 1}} style={styles.container}>
        <LinearGradient
          colors={['#00000000', '#00000000', '#00000000']}
          style={styles.linearGradient}>
          <View style={styles.section}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/auth-logo1.jpg')}
            />
            <Text style={[styles.text]}>A Rooted and Restorative</Text>
            <Text style={[styles.text]}>Learning Experience</Text>
          </View>
        </LinearGradient>

        <ImageBackground
          source={require('../../../assets/images/login-back.png')}
          style={styles.backgroundImage}
          resizeMode="contain">
          <View style={styles.section2}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate('LoginEmail')}>
              <Text style={{textAlign: 'center', color: '#ffffff'}}>
                Log In
              </Text>
            </TouchableOpacity>

            <View style={styles.tagline}>
              <Text style={[styles.text]}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('RegisterOne')}>
                <Text style={[styles.Stext]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    zIndex: 9,
  },

  backgroundImage: {
    flex: 1,
    zIndex: 10,
    // backgroundColor: 'red',
    // padding:40,
    // resizeMode: "contain"
  },
  section: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  section2: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,

    justifyContent: 'flex-end',
  },
  logo: {
    marginTop: 30,
    height: 85,
    width: 110,
    marginBottom: 15,
  },
  tagline: {
    alignItems: 'center',
    marginHorizontal: 40,
    justifyContent: 'flex-start',
    marginBottom: 40,
    marginTop: 15,
    flexDirection: 'row',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.22,
    lineHeight: 22,
    fontSize: 17,
  },
  Stext: {
    color: '#ffffff',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.22,
    lineHeight: 22,
    fontSize: 17,
  },
  loginButton: {
    width: '75%',
    height: '8%',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  homeReducer: state.homeReducer,
});

export default connect(
  mapStateToProps,
  null,
)(LoginScreen);
