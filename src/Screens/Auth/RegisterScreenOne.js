/* eslint-disable space-infix-ops */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
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

export default class RegisterScreenOne extends Component {
  state = {
    firstname: '',
    lastname: '',
    firstnameVerify: false,
    lastnameVerify: false,
    firstnameError: '',
    lastnameError: '',
  };
  register() {
    console.log("object", this.state);

    // this.props.navigation.navigate('LoginScreen');
    if (this.state.firstname.length == 0) {
      this.setState({errorfirst: true, firstnameError: 'Please enter first name !'});
      this.setState({firstnameVerify: false});
      return;
    }
    if (this.state.firstname.length > 20) {
      this.setState({error: true, firstnameError: 'First name must me less than 20 characters !'});
      this.setState({firstnameVerify: false});
      return;
    }
    if (this.state.lastname.length == 0) {
      this.setState({errorsecond: true, lastnameError: 'Please enter last name !'});
      this.setState({lastnameVerify: false});
      return;
    }
    if (this.state.lastname.length > 20) {
      this.setState({error: true, lastnameError: 'Last name must me less than 20 characters !'});
      this.setState({lastnameVerify: false});
      return;
    }
    this.props.navigation.navigate('Register', this.state);
    // const data = {
    //   user_name: this.state.username,
    //   email: this.state.email,
    //   password: this.state.pass,
    //   role: '',
    //   first_name: this.state.firstname,
    //   last_name: this.state.lastname,
    //   phone_number: this.state.phonenumber,
    // };

    // this.props.postRequestRegister(data, API_REGISTER_USER);

    // alert(this.state.email)
  }
  render() {
    var variable = 2;

    return {
      ...(Platform.OS === 'android' ? (
        <View style={{flex: 1}} style={[styles.container]}>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}

          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              // resizeMode="center"
              style={styles.logob}
              source={require('../../../assets/images/backIcon.png')}
            />
          </TouchableOpacity>
          <ScrollView>
            <View style={[styles.section]}>
              <Image
                // resizeMode="center"
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
              <Text style={styles.nameHeading}>What's your name ?</Text>
              <Text style={styles.infoText}>
                We need a little bit more information to setup your account.
              </Text>
            </View>
            <View style={{flex: 3, justifyContent: 'flex-start'}}>
              <View style={[styles.tagline]}>
                <Text style={[styles.text]}>First Name</Text>
              </View>
              <TextInput
                placeholderTextColor="#fff"
                style={ styles.textInput}
                onChangeText={text =>
                  this.setState({firstname: text, firstnameVerify: true, errorfirst: false})
                }
              />
              {this.state.errorfirst && (
                <View>
                <Text style={styles.errMsg}>{this.state.firstnameError}</Text>
                </View>
              )}
              <View style={[styles.tagline]}>
                <Text style={[styles.text]}>Last Name</Text>
              </View>
              <TextInput
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={text =>
                  this.setState({lastname: text, lastnameVerify: true, errorsecond: false})
                }
              />
              {this.state.errorsecond && (
                <View>
                <Text style={styles.errMsg}>{this.state.lastnameError}</Text>
                </View>
              )}
            </View>

            {/* {this.state.lastnameVerify == true &&
            this.state.firstnameVerify == true ? ( */}
              <View style={[styles.bottomView]}>
                <TouchableOpacity
                style={ this.state.lastnameVerify == true &&
            this.state.firstnameVerify == true  ?  styles.continueButton:[styles.continueButton, {opacity:0.4}] }
                disabled= {this.state.lastnameVerify == true &&
            this.state.firstnameVerify == true ? false : true}
                  // style={styles.continueButton}
                  onPress={() => this.register()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#ffffff',
                      fontFamily: 'Avenir-Light',
                      letterSpacing: -0.2,
                      lineHeight: 22,
                      fontSize: 17,
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            {/* ) : ( */}
              {/* <View style={[styles.bottomView]}>
                <TouchableOpacity
                  style={styles.continueButtonDisable}
                  // style={styles.continueButton}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      //   marginTop: 5,
                      color: '#ffffff',
                      fontFamily: 'Avenir-Light',
                      letterSpacing: -0.2,
                      lineHeight: 22,
                      fontSize: 15,
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
          </ScrollView>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <View style={{flex: 1}} style={[styles.container]}>
            {/* <ActivityIndicator size="large" color="#0000ff" /> */}

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                // resizeMode="center"
                style={styles.logob}
                source={require('../../../assets/images/backIcon.png')}
              />
            </TouchableOpacity>
            <ScrollView>
              <View style={[styles.section]}>
                <Image
                  // resizeMode="center"
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
                <Text style={styles.nameHeading}>What's your name ?</Text>
                <Text style={styles.infoText}>
                  We need a litle bit more information to setup your account.
                </Text>
              </View>
              <View style={{flex: 3, justifyContent: 'flex-start'}}>
                <View style={[styles.tagline]}>
                  <Text style={[styles.text]}>First Name</Text>
                </View>
                <TextInput
                  placeholderTextColor="#fff"
                  style={styles.textInput
                  }
                  onChangeText={text =>
                    this.setState({firstname: text, firstnameVerify: true})
                  }
                />
                <View style={[styles.tagline]}>
                  <Text style={[styles.text]}>Last Name</Text>
                </View>
                <TextInput
                  placeholderTextColor="#fff"
                  // placeholder="Last Name"
                  style={ styles.textInput
                    // this.state.lastnameVerify == true
                    //   ? styles.textInput
                    //   : styles.textInputred
                  }
                  onChangeText={text =>
                    this.setState({lastname: text, lastnameVerify: true})
                  }
                />
              </View>

              <View style={[styles.bottomView]}>
                <TouchableOpacity
                style={ this.state.lastnameVerify == true &&
            this.state.firstnameVerify == true  ?  styles.continueButton:[styles.continueButton, {opacity:0.4}] }
                disabled= {this.state.lastnameVerify == true &&
            this.state.firstnameVerify == true ? false : true}
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
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
              {/* {this.state.lastnameVerify == true &&
              this.state.firstnameVerify == true ? (
                <View style={[styles.bottomView]}>
                  <TouchableOpacity
                    style={styles.continueButton}
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
                        fontSize: 15,
                      }}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.bottomView]}>
                  <TouchableOpacity
                    style={styles.continueButtonDisable}
                    // style={styles.continueButton}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        //   marginTop: 5,
                        color: '#ffffff',
                        fontFamily: 'Avenir-Light',
                        letterSpacing: -0.2,
                        lineHeight: 22,
                        fontSize: 15,
                      }}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              )} */}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )),
    };
  }
}

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
    letterSpacing: -0.18,
    lineHeight: 20,
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
    letterSpacing: -0.3,
    lineHeight: 22,
    fontSize: 17,
  },
  continueButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    opacity: 1,
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
    width: '80%',
    height: 50,
    backgroundColor: '#353535',
    color: '#ffffff',
    // opacity: 0.3,
    marginTop: 15,
    fontSize: 17,
    paddingLeft: 7,

    marginBottom: 10,
  },
  textInputred: {
    alignSelf: 'center',
    width: '80%',
    height: 50,
    paddingLeft: 2,
    marginBottom: 15,

    backgroundColor: 'gray',
    color: '#ffffff',
    opacity: 1,
    borderWidth: 2,
    // borderColor: 'red',
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
  errMsg: {
    // position: 'absolute',
    color: 'red',
    alignSelf: 'flex-start',
    marginHorizontal: '10%',
  },
});
