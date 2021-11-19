/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import reducer from '../../Reducers/reducers';
import Spinner from 'react-native-loading-spinner-overlay';
import {forgotPasswordRequest} from '../../Actions/actions';
import {connect} from 'react-redux';
import {API_LOGIN_USER, FORGOT_PASSWORD, LOGIN_ERROR} from '../../Actions/type';
class ForgotPwEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailVerify: false,
      spinner: false,
    };
  }

  sendEmail() {
    this.props.forgotPasswordRequest(this.state.email,FORGOT_PASSWORD);
    // if(this.state.emailVerify){
    // this.props.navigation.navigate('LoginPassword', this.state.email);
    // }else{
    //     alert("Please Enter Email Addresss to continue")
    // }
  }

  checkEmail(e) {
    console.log(this.props.route.params);
    // { this.props.route.params === undefined ? this.setState({email: e}) : this.setState({email: this.props.route.params}) }
    this.setState({email: e});
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e)) {
      this.setState({emailVerify: true});
    } else {
      this.setState({emailVerify: false});
    }
  }

  async componentDidMount() {
    await this.setState({email: this.props.route.params});
    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
        this.state.email,
      )
    ) {
      this.setState({emailVerify: true});
    } else {
      this.setState({emailVerify: false});
    }
  }

  render() {
    return (
      <View style={{flex: 1}} >
        {
          this.props.forgotPasswordRed.forgotPwSuccess? this.props.navigation.navigate('Help'):
       <View style={[styles.container]}>
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
            width: '100%',
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.nameHeading}>Forgot Password ?</Text>
          <Text style={styles.infoText}>
            Enter the email address you signed up with and we will send you
            password instructions.
          </Text>
        </View>
        <View style={[styles.tagline]}>
          <Text style={[styles.text, {fontSize: 17}]}>Email Address</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <TextInput
            value={this.state.email}
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={text => this.checkEmail(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}
          />
          { this.props.forgotPasswordRed.forgotPwError ? (
                
                <View style= {{flexDirection: "row", marginHorizontal: 45, marginTop: 10 }} >
                  <Image source = { require('../../../assets/images/error-icon.png') } style = {{marginTop: 3, marginRight: 10, height: 16, width: 18}} />
                  <Text style={[styles.text, {color: '#ffacac'}]}>{this.props.forgotPasswordRed.forgotPwError}</Text>
                </View>
        ):null
                // <View style= {{flexDirection: "row", marginHorizontal: 45, marginTop: 10 }} >
                //   {/* <Image source = { require('../../../assets/images/eye-off.png') } style = {{height: 15, width: 15, resizeMode: "center", margin: 3}} /> */}
                //   {this.props.loginReducer.LoginError==undefined?
                //   <Text style={[styles.text, {color: '#ffacac'}]}>Please Try Again</Text>
                //   :null                  
                //   }
                // </View>
              }
        </View>

        <View style={{flex: 3, justifyContent: 'flex-start'}}>
          <TouchableOpacity
            style={
              this.state.emailVerify == false
                ? [styles.continueButton, {opacity: 0.4}]
                : styles.continueButton
            }
            disabled={this.state.emailVerify == true ? false : true}
            onPress={() => this.sendEmail()}>
            <Text style={{textAlign: 'center', color: '#ffffff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        </View>
         }
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  forgotPasswordRed: state.forgotPasswordRed,
  loadingReducer: state.loadingReducer,
});
export default connect(
  mapStateToProps,
  {forgotPasswordRequest},
)(ForgotPwEmail);

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
    marginBottom: 15,
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
