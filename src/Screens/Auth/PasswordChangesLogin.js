/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-useless-escape */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {postRequestLogin} from '../../Actions/actions';
import {connect} from 'react-redux';
import {API_LOGIN_USER} from '../../Actions/type';
import deviceStorage from '../../Actions/deviceStorage';

import DrawerScreen from '../../Screens/Routes/AppNavigation';
class PasswordChangesLogin extends Component {
  state = {
    email: '',
    pass: '',
    password:'',
    passLength: false,
    isCap: false,
    hasSymbol: false,
    emailVerify: false,
    passwordVerify: false,
    hidePassword: true,
    fcmToken:''
  };

   
  async UNSAFE_componentDidMount() {
    console.log('ye hai login ke baad ka component did mount');
    console.log(this.props.loginReducer.LoginError);
    let fcmToken = await deviceStorage.getItem('fcmToken');
    console.log(fcmToken)
    this.setState({fcmToken:fcmToken})

  }


  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  
  register() {
     
 
   const data = {
        email: this.state.email,
        password: this.state.password,
        device_id:this.state.fcmToken
      };
      console.log(data,this.props);
      this.setState({spinner:true})
      this.props.postRequestLogin(data, API_LOGIN_USER);

  }
  checkEmail(e) {
    this.setState({email: e.trim()});
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e)) {
      this.setState({emailVerify: true});
    } else {
      this.setState({emailVerify: false});
    }
  }

  checkPassword(e)
    {
      this.setState({password: e});
      if (e.length !== 0) 
      {
        this.setState({passwordVerify:true})
      }
      else
      {
        this.setState({passwordVerify:false})
      }        
    }
  render() {
    var variable = 2;

    return {
      ...(Platform.OS === 'android' ? (
        <View style={{flex: 1}} >
           
          {this.props.loginReducer.isLoggedin ? (
          <DrawerScreen />)
            :    
           <View style={[styles.container]}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              
              style={styles.logob}
              source={require('../../../assets/images/backIcon.png')}
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={[styles.section]}>
              <Image
                
                style={styles.logo}
                source={require('../../../assets/images/auth-logo1.jpg')}
              />
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: '',
                marginVertical: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.nameHeading}>Password Changed !</Text>
              <Text style={styles.infoText}>
                Your password has been updated. You may use it below to sign in.
              </Text>
            </View>
            <View
              style={{flex: 3, marginBottom: 15, justifyContent: 'flex-start'}}>
              <View>
                <View style={[styles.tagline]}>
                  <Text style={[styles.text]}>Email Address</Text>
                </View>
                <TextInput
                  placeholderTextColor="#fff"
                  autoCapitalize="none"
                  style={styles.textInput}
                  onChangeText={text => this.checkEmail(text)}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtnEm}
                  onPress={this.managePasswordVisibility}>
                  <Image
                    source={
                      this.state.emailVerify == true
                        ? require('../../../assets/images/tick-icon.png')
                        : null
                    }
                    style={styles.btnImagee}
                  />
                </TouchableOpacity>
              </View>
 {        
                   this.props.loginReducer.LoginError !== null?
                    <View style= {{flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >
                    
                        <Text style={[styles.text, {color: '#ffacac'}]}> {this.props.loginReducer.LoginError}</Text>
                       
                 
                </View>:null
                 }
              <View style={[styles.tagline]}>
                <Text style={[styles.text]}>Password</Text>
              </View>
              <View>
                <TextInput
                  placeholderTextColor="#fff"
                  autoCorrect={false}
                  // keyboardType="password"
                  underlineColorAndroid="transparent"
                  secureTextEntry={this.state.hidePassword}
                  style={styles.textInput}
                  onChangeText={
                    text => this.checkPassword(text)
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}>
                  <Image
                    source={
                      this.state.hidePassword
                        ? require('../../../assets/images/eye.png')
                        : require('../../../assets/images/eye-off.png')
                    }
                    style={styles.btnImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            

            {this.state.passwordVerify == true && this.state.emailVerify == true ? (
              <View style={[styles.bottomView]}>
                <TouchableOpacity
                  // style={styles.continueButton}
                  style={ this.state.passwordVerify == true &&
                    this.state.emailVerify == true  ?  styles.continueButton:[styles.continueButton, {opacity:0.4}] }
                        disabled= {this.state.passwordVerify == true &&
                    this.state.emailVerify == true ? false : true}
                  onPress={() => this.register()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      //   marginTop: 5,
                      color: '#ffffff',
                      fontFamily: 'Avenir-Light',
                      letterSpacing: -0.2,
                      lineHeight: 22,
                      fontSize: 17,
                    }}>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.bottomView]}>
                <TouchableOpacity style={styles.continueButtonDisable}>
                  <Text
                    style={{
                      textAlign: 'center',
                      //   marginTop: 5,
                      color: '#ffffff',
                      fontFamily: 'Avenir-Light',
                      letterSpacing: -0.2,
                      lineHeight: 22,
                      fontSize: 17,
                    }}>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
    
        </View>
    }
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {this.props.loginReducer.isLoggedin ? (
          <DrawerScreen />)
            : 
          <View style={{flex: 1}} style={[styles.container]}>
             
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                
                style={styles.logob}
                source={require('../../../assets/images/backIcon.png')}
              />
            </TouchableOpacity>

            <ScrollView>
              <View style={[styles.section]}>
                <Image
                  
                  style={styles.logo}
                  source={require('../../../assets/images/auth-logo1.jpg')}
                />
              </View>
              <View
                style={{
                  flex: 3,
                  backgroundColor: '',
                  marginVertical: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.nameHeading}>Password Changed !</Text>
                <Text style={styles.infoText}>
                  Your password has been updated. You may use it below to sign in.
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  marginBottom: 15,
                  justifyContent: 'flex-start',
                }}>
                <View>
                  <View style={[styles.tagline]}>
                    <Text style={[styles.text]}>Email Address</Text>
                  </View>
                  <TextInput
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={text => this.checkEmail(text)}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.visibilityBtnEm}
                    // onPress={this.managePasswordVisibility}
                    >
                    <Image
                      source={
                        this.state.emailVerify == true
                          ? require('../../../assets/images/tick-icon.png')
                          : null
                      }
                      style={styles.btnImagee}
                    />
                  </TouchableOpacity>
                </View>
                {        
                   this.props.loginReducer.LoginError !== null?
                    <View style= {{flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >
                    
                        <Text style={[styles.text, {color: '#ffacac'}]}> {this.props.loginReducer.LoginError}</Text>
                       
                 
                </View>:null
                 }
                <View style={[styles.tagline]}>
                  <Text style={[styles.text]}>Password</Text>
                </View>
                <View>
                  <TextInput
                    placeholderTextColor="#fff"
                    autoCorrect={false}
                    // keyboardType="password"
                    underlineColorAndroid="transparent"
                    secureTextEntry={this.state.hidePassword}
                    style={styles.textInput}
                    onChangeText={text => this.checkPassword(text)} 
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.visibilityBtn}
                    onPress={this.managePasswordVisibility}>
                    <Image
                      source={
                        this.state.hidePassword
                          ? require('../../../assets/images/eye.png')
                          : require('../../../assets/images/eye-off.png')
                      }
                      style={styles.btnImage}
                    />
                  </TouchableOpacity>
                </View>
                {/* {
                   this.state.passLength>0 ?
                    <View style= {{flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >
                    {  this.state.passLength<8 || this.state.isCap==false || this.state.hasSymbol==false?
                        <Text style={[styles.text, {color: '#ffacac'}]}>Password does not meet requirements</Text>
                        :null
                    }
                 
                </View>:null
                 } */}
              </View>
               
               
              
              <View style={[styles.bottomView]}>
                <TouchableOpacity
                        style={ this.state.passwordVerify == true &&
                    this.state.emailVerify == true  ?  styles.continueButton:[styles.continueButton, {opacity:0.4}] }
                        disabled= {this.state.passwordVerify == true &&
                    this.state.emailVerify == true ? false : true}
                  // style={styles.continueButton}
                  onPress={() => this.register()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      //   marginTop: 5,
                      color: '#ffffff',
                      fontFamily: 'Avenir-Light',
                      letterSpacing: -0.2,
                      lineHeight: 22,
                      fontSize: 17,
                    }}>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
              
            </ScrollView>
          </View>
          }
        </KeyboardAvoidingView>
      )),
    };
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  loadingReducer: state.loadingReducer
});
export default connect(
  mapStateToProps,
  {postRequestLogin},
)(PasswordChangesLogin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-around',
  },
  logob: {
    width: 27,
    height: 27,
    marginLeft: 10,
    marginTop: 10,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
  },
  section: {
    // flex: 1,
    alignItems: 'center',
    // marginHorizontal: 20,
  },
  logo: {
    width: 54,
    height: 42,
    // width: 100,
    // height: 40,
    // marginBottom: 15,
  },
  nameHeading: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.27,
    lineHeight: 24,
    fontSize: 22,
    width: '80%',
    fontWeight: 'bold',
    backgroundColor: 'black',
  },
  infoText: {
    color: 'white',
    fontFamily: 'Avenir-Medium',
    letterSpacing: -0.18,
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
    width: '75%',
    marginTop: 12,
    marginBottom: 2,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.2,
    lineHeight: 22,
    fontSize: 17,
  },
  iconCol: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  passText: {
    color: '#ffffff',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.16,
    lineHeight: 22,
    fontSize: 14,
    // opacity: 1,
  },
  textCol: {
    // backgroundColor:'red',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  passOptions: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 40,
    paddingHorizontal: 15,
    width: '70%',
    // justifyContent:'center',
    // alignItems:'center'
    // backgroundColor:'red'
  },
  continueButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 148,
    height: 42,
    // opacity:0.9,
    // marginTop: 70,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 40,
  },
  continueButtonDisable: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 148,
    height: 42,
    // marginTop: 70,
    borderColor: '#ccc',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 40,
  },
  textInput: {
    alignSelf: 'center',
    width: '75%',
    height: 40,
    backgroundColor: '#353535',
    color: '#ffffff',
    opacity: 1,
    marginTop: 15,
    fontSize: 17,
    paddingLeft: 7,
  },

  textInputred: {
    alignSelf: 'center',
    width: '80%',
    height: 40,
    paddingLeft: 2,

    backgroundColor: 'gray',
    color: '#ffffff',
    opacity: 1,
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 15,
    fontSize: 17,
  },
  registerLine: {
    // marginBottom: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomView: {
    // marginBottom: 20,
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  visibilityBtn: {
    position: 'absolute',
    right: 45,
    height: 40,
    width: 35,
    // top:10,

    // backgroundColor:'red',
    padding: 7,
  },

  btnImage: {
    // resizeMode: 'contain',
    height: 23,
    width: 23,
    opacity: 1,
    marginTop: 15,
    // backgroundColor: 'red'
  },
  visibilityBtnEm: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    top: 50,
    padding: 9,
    // backgroundColor:'red',
  },
  btnImagee: {
    // resizeMode: 'contain',
    height: 13,
    width: 13,
    // opacity: 1,
    // marginTop: 15,
  },
});
