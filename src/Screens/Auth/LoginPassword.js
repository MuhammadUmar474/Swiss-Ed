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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {postRequestLogin} from '../../Actions/actions';
import {connect} from 'react-redux';
import {API_LOGIN_USER, LOGIN_ERROR} from '../../Actions/type';
import deviceStorage from '../../Actions/deviceStorage';
import Spinner from 'react-native-loading-spinner-overlay';

import DrawerScreen, {
  AuthStackScreen,
} from '../../Screens/Routes/AppNavigation';
import {returnRejectedPromiseOnError} from 'redux-axios-middleware';
// import { TestScheduler } from 'jest';

class LoginPassword extends Component {
  // constructor(props){
  //     super(props)
  //     console.log(props)
  //     this.state={
  //         password:'',
  //         passwordVerify:false,
  //         email:''
  //     }
  //     // this.setState({email:this.props.route.params})
  //     console.log(this.props.route.params,props.route.params)
  //     console.log(this.state)
  // }
  state = {
    password: '',
    passwordVerify: false,
    email: '',
    fcmToken: '',
    spinner: false,
    hidePassword: true,
  };

  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  stopLoading = () => {
    this.setState({spinner: false});
  };
  async componentDidMount() {
    console.log('ye hai login ke baad ka component did mount');
    console.log(this.props.loginReducer.LoginError);
    let fcmToken = await deviceStorage.getItem('fcmToken');
    console.log(fcmToken);
    this.setState({fcmToken: fcmToken});
  }

  async componentWillUnmount() {
    console.log('will unmount');
    this.setState({passwordVerify: false});
  }

  gotoHome() {
    // this.setState({email:this.props.route.params})
    // console.log(this.props.route.params,props.route.params)
    console.log(this.state);
    if (this.state.passwordVerify && this.props.route.params) {
      const data = {
        email: this.props.route.params,
        // email: "mhammad@codexnow.com",
        // password: "12345",

        password: this.state.password,
        device_id: this.state.fcmToken,
      };
      console.log(data, this.props);
      this.setState({spinner: true});
      this.props.postRequestLogin(data, API_LOGIN_USER);
      // this.props.navigation.navigate('Home')
    } else {
      // alert('Please Enter password to continue');
    }
  }

  checkPassword(e) {
    this.setState({password: e});
    if (e.length !== 0) {
      this.setState({passwordVerify: true});
    } else {
      this.setState({passwordVerify: false});
    }
  }

  render() {
    if (
      this.props.loginReducer.LoginError ||
      this.props.loginReducer.isLoggedin
    ) {
      console.log(
        'hiiiiii',
        this.props.loginReducer.LoginError,
        this.props.loginReducer.isLoggedin,
        this.state.spinner,
      );
      // if(this.state.spinner==true){
      // // this.setState({spinner:false})

      // }
    }
    return (
      <View style={{flex: 1}}>
        {this.props.loginReducer.isLoggedin ? (
          <DrawerScreen />
        ) : (
          <View style={[styles.container]}>
            {/* <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                // resizeMode="center"
                style={styles.logob}
                source={require('../../../assets/images/backIcon.png')}
              />
            </TouchableOpacity>
            {/* <Icon.Button
              style={{padding: 10}}
              name="ios-arrow-dropleft"
              size={30}
              backgroundColor="black"
              color="white"
              onPress={() => this.props.navigation.goBack()}
            /> */}

            <View style={[styles.section]}>
              <Image
                // resizeMode="center"
                style={styles.logo}
                source={require('../../../assets/images/auth-logo1.jpg')}
              />
            </View>

            {/* <View style={{flex: 3, justifyContent: 'flex-start'}}> */}
            <View style={[styles.tagline]}>
              <Text style={[styles.text, {fontSize: 22}]}>Password</Text>
            </View>

            <View>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
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

            {this.props.loginReducer.LoginError ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 45,
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../../assets/images/error-icon.png')}
                  style={{marginTop: 3, marginRight: 10, height: 16, width: 18}}
                />
                <Text style={[styles.text, {color: '#ffacac'}]}>
                  {this.props.loginReducer.LoginError}
                </Text>
              </View>
            ) : null
            // <View style= {{flexDirection: "row", marginHorizontal: 45, marginTop: 10 }} >
            //   {/* <Image source = { require('../../../assets/images/eye-off.png') } style = {{height: 15, width: 15, resizeMode: "center", margin: 3}} /> */}
            //   {this.props.loginReducer.LoginError==undefined?
            //   <Text style={[styles.text, {color: '#ffacac'}]}>Please Try Again</Text>
            //   :null
            //   }
            // </View>
            }

            <View>
              <TouchableOpacity
                style={
                  this.state.passwordVerify == false
                    ? [styles.continueButton, {opacity: 0.4}]
                    : styles.continueButton
                }
                disabled={this.state.passwordVerify == true ? false : true}
                onPress={() => this.gotoHome()}>
                <Text style={{textAlign: 'center', color: '#ffffff'}}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
            {this.props.loginReducer.Loading == true ? (
              <View style={styles.loadingView}>
                <ActivityIndicator size="large" />
                <Text style={styles.Stext}>Please wait</Text>
              </View>
            ) : null}

            <View style={[styles.forgotLine]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPwEmail')}>
                <Text style={[styles.Stext]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.registerLine]}>
              <Text style={[styles.text]}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('RegisterOne')}>
                <Text style={[styles.Stext]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* </ImageBackground> */}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  loadingReducer: state.loadingReducer,
});
export default connect(
  mapStateToProps,
  {postRequestLogin},
)(LoginPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'space-around',
  },
  loadingView: {
    // flex: 1,
    height: '100%',
    fontSize: 22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    // backgroundColor: 'red',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  logob: {
    width: 26,
    height: 26,
    marginLeft: 20,
    marginTop: 15,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
  },
  section: {
    // flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logo: {
    width: 110,
    height: 85,
    marginBottom: 15,
  },
  tagline: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: '12.5%',
    marginTop: 50,
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    height: 40,
    marginTop: 70,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 20,
  },
  textInput: {
    alignSelf: 'center',
    width: '75%',
    height: 40,
    backgroundColor: '#353535',
    color: 'white',
    opacity: 1,
    marginTop: 10,
    paddingLeft: 7,
    fontSize: 17,
  },
  textInputred: {
    alignSelf: 'center',
    width: '78%',
    height: 40,
    paddingLeft: 7,
    backgroundColor: 'gray',
    color: '#ffffff',
    opacity: 1,
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 15,
    fontSize: 17,
  },
  registerLine: {
    marginBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  forgotLine: {
    marginBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  visibilityBtn: {
    position: 'absolute',
    right: 45,
    height: 40,
    width: 35,
    padding: 7,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    opacity: 0.7,
    marginTop: 10,
    // backgroundColor: 'red'
  },
});
