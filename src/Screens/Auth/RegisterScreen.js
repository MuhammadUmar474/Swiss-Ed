import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {postRequestRegister} from '../../Actions/actions';
import {connect} from 'react-redux';
import {API_REGISTER_USER} from '../../Actions/type';

class RegisterScreen extends Component {
  state = {
    email: '',
    pass: '',
    confirmpass: '',
    username: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    passLength: false,
    isCap: false,
    hasSymbol: false,
    emailVerify: false,
    passVerify: false,
    usernameVerify: false,
    firstnameVerify: false,
    lastnameVerify: false,
    phonenumberVerify: false,
    hidePassword: true,
  };

  UNSAFE_componentWillMount() {
    console.log(this.props);
    let fname = this.props.route.params.firstname;
    let lname = this.props.route.params.lastname;
    console.log(fname, lname);

    this.setState({firstname: fname, lastname: lname});
  }

  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  async checkPassword(e) {
    var error;
    if (/^(?=.*[!@#$%^&*])/.test(e)) {
      console.log('in heree');
      await this.setState({hasSymbol: true});
    } else {
      await this.setState({hasSymbol: false});
    }
    //  if (/^(?=.*[!@#$%^&*])/.test(e)) {
    //    console.log('in heree')
    //   this.setState({hasSymbol: true});
    // } else {
    //   this.setState({hasSymbol: false});
    // }
    if (e.length > 6) {
      await this.setState({passLength: true});
      // error = 'This field cannot be empty.'
    } else {
      await this.setState({passLength: false});
    }

    // console.log(/^(?=.*[A-Z])/.test(e), /^(?=.*[!@#$%^&*])/.test(e));
    if (/^(?=.*[A-Z])/.test(e)) {
      await this.setState({isCap: true});
    } else {
      await this.setState({isCap: false});
    }

    await this.setState({pass: e});
    console.log(
      this.state.hasSymbol,
      this.state.isCap,
      this.state.passLength,
      e,
    );
    if (this.state.hasSymbol && this.state.isCap && this.state.passLength) {
      await this.setState({passVerify: true});
    }
  }
  register() {
    // console.log(
    //   /^(?=.[A-Z])(?=.[a-z])(?=.[!@#$%^&*])[\w!@#$%^&*](?=.{7,})$/.test(
    //     this.state.pass,
    //   ),
    // );

    // // this.props.navigation.navigate('LoginScreen')

    // if (this.state.email.length == 0) {
    //   alert('Enter Email');
    //   this.setState({emailVerify: false});

    //   return;
    // }

    // if (this.state.pass.length == 0) {
    //   alert('Enter password');
    //   this.setState({passwordVerify: false});

    //   return;
    // }

    // if (this.state.pass !== this.state.confirmpass) {
    //   alert('Your password does not match');
    //   this.setState({passwordVerify: false});

    //   return;
    // }

    // if (this.state.phonenumber.length == 0) {
    //   alert('Enter phonenumber');
    //   this.setState({phonenumberVerify: false});

    //   return;
    // }
    const data = {
      user_name: '',
      email: this.state.email,
      password: this.state.pass,
      role: '',
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      phone_number: '',
    };

    this.props.postRequestRegister(data, API_REGISTER_USER);

    // alert(this.state.email)
  }
  checkEmail(e) {
    this.setState({email: e.trim()});
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e)) {
      this.setState({emailVerify: true});
    } else {
      this.setState({emailVerify: false});
    }
  }
  render() {
    var variable = 2;

    return {
      ...(Platform.OS === 'android' ? (
        <View style={{flex: 1}} style={[styles.container]}>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
          {this.props.registerReducer.registerResponse !== null
            ? this.props.navigation.navigate('LoginEmail', this.state.email)
            : null}
          {/* <Icon.Button
              
              name="ios-arrow-dropleft"
              size={30}
              backgroundColor="black"
              color="white"
              onPress={() => this.props.navigation.goBack()}
            /> */}
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
              <Text style={styles.nameHeading}>Last Step !</Text>
              <Text style={styles.infoText}>
                We need a litle bit more information to setup your account.
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
              {this.props.registerReducer.registerError !== null ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 50,
                    marginTop: 10,
                  }}>
                  <Text style={[styles.text, {color: '#ffacac'}]}>
                    {' '}
                    {this.props.registerReducer.registerError}
                  </Text>
                </View>
              ) : null}
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
                    // this.setState({pass: text})
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
            <View style={styles.passOptions}>
              <View style={styles.iconCol}>
                {this.state.passLength ? (
                  <Image
                    style={{height: 12, width: 12}}
                    source={require('../../../assets/images/check.png')}
                  />
                ) : null}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.passText]}>8 Characters</Text>
              </View>
            </View>
            <View style={styles.passOptions}>
              <View style={styles.iconCol}>
                {this.state.isCap ? (
                  <Image
                    style={{height: 12, width: 12}}
                    source={require('../../../assets/images/check.png')}
                  />
                ) : null}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.passText]}>One uppercase letter</Text>
              </View>
            </View>
            <View style={styles.passOptions}>
              <View style={styles.iconCol}>
                {this.state.hasSymbol ? (
                  <Image
                    style={{height: 12, width: 12}}
                    source={require('../../../assets/images/check.png')}
                  />
                ) : null}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.passText]}>One symbol</Text>
              </View>
            </View>

            {this.state.passVerify == true && this.state.emailVerify == true ? (
              <View style={[styles.bottomView]}>
                <TouchableOpacity
                  // style={styles.continueButton}
                  style={
                    this.state.passVerify == true &&
                    this.state.emailVerify == true
                      ? styles.continueButton
                      : [styles.continueButton, {opacity: 0.4}]
                  }
                  disabled={
                    this.state.passVerify == true &&
                    this.state.emailVerify == true
                      ? false
                      : true
                  }
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
                    Create Account
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
                    Create Accountt
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {this.props.registerReducer.registerResponse !== null
            ? this.props.navigation.navigate('LoginEmail', this.state.email)
            : null}
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
                <Text style={styles.nameHeading}>Last Step !</Text>
                <Text style={styles.infoText}>
                  We need a litle bit more information to setup your account.
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
                {this.props.registerReducer.registerError !== null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 50,
                      marginTop: 10,
                    }}>
                    <Text style={[styles.text, {color: '#ffacac'}]}>
                      {' '}
                      {this.props.registerReducer.registerError}
                    </Text>
                  </View>
                ) : null}
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
                    // onChangeText={
                    //   text => this.checkPassword(text)
                    onChangeText={text => this.checkPassword(text)}
                    // this.setState({pass: text})
                    // }
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
              <View style={styles.passOptions}>
                <View style={styles.iconCol}>
                  {this.state.passLength ? (
                    <Image
                      style={{height: 12, width: 12}}
                      source={require('../../../assets/images/check.png')}
                    />
                  ) : (
                    <Image
                      style={{height: 12, width: 12, opacity: 0}}
                      source={require('../../../assets/images/check.png')}
                    />
                    // <Icon.Button
                    //   name="ios-arrow-dropleft"
                    //   size={1}
                    //   backgroundColor="red"
                    //   color="black"
                    // />
                  )}
                </View>
                <View style={styles.textCol}>
                  <Text style={[styles.passText]}>8 Characters</Text>
                </View>
              </View>
              <View style={styles.passOptions}>
                <View style={styles.iconCol}>
                  {this.state.isCap ? (
                    <Image
                      style={{height: 12, width: 12}}
                      source={require('../../../assets/images/check.png')}
                    />
                  ) : (
                    <Image
                      style={{height: 12, width: 12, opacity: 0}}
                      source={require('../../../assets/images/check.png')}
                    />
                    // <Icon.Button
                    //   name="ios-arrow-dropleft"
                    //   size={1}
                    //   backgroundColor="red"
                    //   color="black"
                    // />
                  )}
                </View>
                <View style={styles.textCol}>
                  <Text style={[styles.passText]}>One uppercase letter</Text>
                </View>
              </View>
              <View style={styles.passOptions}>
                <View style={styles.iconCol}>
                  {this.state.hasSymbol == true ? (
                    <Image
                      style={{height: 12, width: 12}}
                      source={require('../../../assets/images/check.png')}
                    />
                  ) : (
                    <Image
                      style={{height: 12, width: 12, opacity: 0}}
                      source={require('../../../assets/images/check.png')}
                    />
                    // <Icon.Button

                    //   name="ios-arrow-dropleft"
                    //   size={1}
                    //   backgroundColor="red"
                    //   color="black"
                    // />
                  )}
                </View>
                <View style={styles.textCol}>
                  <Text style={[styles.passText]}>One symbol</Text>
                </View>
              </View>
              <View style={[styles.bottomView]}>
                <TouchableOpacity
                  style={
                    this.state.passVerify == true &&
                    this.state.emailVerify == true
                      ? styles.continueButton
                      : [styles.continueButton, {opacity: 0.4}]
                  }
                  disabled={
                    this.state.passVerify == true &&
                    this.state.emailVerify == true
                      ? false
                      : true
                  }
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
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
              {/* {this.state.passVerify == true &&
              this.state.emailVerify == true ? (
                <View style={[styles.bottomView]}>
                  <TouchableOpacity
                    style={styles.continueButton}
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
                        // opacity:1,
                      }}>
                      Create Account
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
                        // opacity:0.4,
                      }}>
                      Create Account
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

const mapStateToProps = state => ({
  registerReducer: state.registerReducer,
});
export default connect(
  mapStateToProps,
  {postRequestRegister},
)(RegisterScreen);

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
    lineHeight: 15,
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
