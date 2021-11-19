/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {resetStateFP} from '../../Actions/actions';
import {connect} from 'react-redux';

class Help extends Component {
   

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailVerify: false,
      spinner: false,
    };
  }
  UNSAFE_componentWillMount(){
    this.props.resetStateFP();
  }
  
 

  render() {
    return (
      <View style={{flex: 1}} style={[styles.container]}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.logob}
            source={require('../../../assets/images/backIcon.png')}
          />
        </TouchableOpacity>

        <View style={[styles.section]}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/auth-logo1.jpg')}
          />
        </View>
        <View
          style={{
            flex:1,
            width: '100%',
            // marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.nameHeading}>Help is on the way !</Text>
          <Text style={styles.infoText}>
            Check your inbox, we have just sent you an email with a link to reset your password.
          </Text>
        </View>
        <View
          style={{
            flex:2,
            width: '100%',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
           
        </View>
      </View>
    );
  }
}
 
 
export default connect(
  null,
  {resetStateFP},
)(Help);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-around',
  },

  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
  },
  section: {
    // flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  logob: {
    width: 27,
    height: 27,
    marginLeft: 10,
    marginTop: 10,
  },
  logo: {
    width: 54,
    height: 42,
    // width: 70,
    // height: 20,
    // marginBottom: 15,
  },
  nameHeading: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.27,
    lineHeight: 25,
    fontSize: 22,
    width: '80%',
    backgroundColor: 'black',
  },
  infoText: {
    color: 'white',
    fontFamily: 'Avenir-Medium',
    letterSpacing: -0.20,
    lineHeight: 17,
    fontSize: 15,
    marginTop: 10,
    width: '80%',

    backgroundColor: 'black',
  },
  tagline: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '74%',
    marginTop: 12,
    marginBottom: 2,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.22,
    lineHeight: 24,
    fontSize: 17,
  },
  Stext: {
    color: '#ffffff',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.22,
    lineHeight: 22,
    fontSize: 17,
  },
  continueButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    marginTop: 70,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 20,
  },
  textInput: {
    alignSelf: 'center',
    width: '77%',
    height: 40,
    backgroundColor: '#353535',
    color: 'white',
    marginTop: 10,
    paddingLeft: 5,
    fontFamily: 'Avenir-light',

    fontSize: 17,
  },
  registerLine: {
    marginBottom: 30,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  visibilityBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 12,
    top: 12,
    padding: 7,
  },

  btnImage: {
    resizeMode: 'center',
  },
});
