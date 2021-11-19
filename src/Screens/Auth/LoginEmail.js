/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
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
} from 'react-native';
// const FORM_STATES = {
//     Email: 0,
//     Password: 1,
//     username: "",
//     pass: "",
//     email: "",
//     REGISTER: 1
//   };

export default class LoginEmail extends Component {
  // state = {
  //     // Current visible form
  //     formState: FORM_STATES.Email
  // };

  constructor(props) {
    super(props);
    // this.props.route.params == null ? this.setState({email: ''}) : this.setState({email: this.props.route.params})

    this.state = {
      email: '',
      emailVerify: false,
      spinner: false,
    };
  }

  gotoPassword() {
    // if(this.state.emailVerify){
    this.props.navigation.navigate('LoginPassword', this.state.email);
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
      <View style={{flex: 1}} style={[styles.container]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Image
            // resizeMode="center"
            style={styles.logob}
            source={require('../../../assets/images/backIcon.png')}
          />
        </TouchableOpacity>
        {/* <Icon.Button style = {{padding: 10}}
                    name="ios-arrow-dropleft"
                    size= {30}
                    backgroundColor= "black"
                    color="#ffffff"
                    onPress={() => this.props.navigation.goBack()}>
                </Icon.Button> */}

        <View style={[styles.section]}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/auth-logo1.jpg')}
          />
        </View>

        <View style={[styles.tagline]}>
          <Text style={[styles.text, {fontSize: 22}]}>Log in</Text>
        </View>

        <View>
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
            onPress={this.managePasswordVisibility}>
            {/* <Image source = { ( this.state.emailVerify == true ) ? require('../../../assets/images/tick-icon.png') : null } style = { styles.btnImage } /> */}
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={
              this.state.emailVerify == false
                ? [styles.continueButton, {opacity: 0.4}]
                : styles.continueButton
            }
            disabled={this.state.emailVerify == true ? false : true}
            onPress={() => this.gotoPassword()}>
            <Text style={{textAlign: 'center', color: '#ffffff'}}>
              Continue
              {/* {this.state.formState === FORM_STATES.Email
                        ? "Continue"
                        : "Login"} */}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.registerLine]}>
          <Text style={styles.text}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterOne')}>
            <Text style={[styles.Stext]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* </ImageBackground> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-around',
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
    marginHorizontal: 20,
    alignItems: 'center',
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
  continueButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    marginTop: 70,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 40,
  },
  textInput: {
    alignSelf: 'center',
    width: '75%',
    height: 40,
    backgroundColor: '#353535',
    // backgroundColor: 'rgba(53,53,53,0.9)',
    color: 'white',
    // opacity: 0.9,
    marginTop: 10,
    paddingLeft: 5,
    fontFamily: 'Avenir-light',
    // letterSpacing: -0.22,
    // lineHeight: 22,
    fontSize: 17,
  },
  registerLine: {
    marginBottom: 30,
    // marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // alignContent: 'flex-end',
    // backgroundColor: "red"
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
