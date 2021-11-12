/* eslint-disable semi */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { updateUserPassword, updateUserProfile } from '../../Actions/actions';

class EditProfile extends Component {
    state = {
        firstname: '',
        lastname: '',
        firstnameVerify: false,
        lastnameVerify: false,
        email: '',
        pass: '',
        confirmpass: '',
        emailVerify: false,
        passVerify: false,
        newPass: '',
        newPassVerify: false,
        hideconfirmPassword: true,
        confirmPass: '',
        confirmPassVerify: false,

        hidePassword: true,
        hideNewPassword: true,
        passwordError: null,
        infoError: null
    };
    constructor(props) {
        super(props);

        //    console.log(props.navigation,props.navigation.canGoBack())
        //    props.navigation.canGoBack =false
    }
    async componentDidMount() {
        console.log(this.props.userReducer, 'yahan')
        await this.setState(
            {
                firstname: this.props.userReducer.UserData.first_name,
                lastname: this.props.userReducer.UserData.last_name,
                email: this.props.userReducer.UserData.email,
                firstnameVerify: true,
                emailVerify: true,
                lastnameVerify: true,
            }
        )
    }
    checkEmail(e) {
        this.setState({ email: e.trim() });
        if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e)) {
            this.setState({ emailVerify: true });
        } else {
            this.setState({ emailVerify: false });
        }
    }
    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    };
    manageNewPasswordVisibility = () => {
        this.setState({ hideNewPassword: !this.state.hideNewPassword });
    };
    manageconfirmPasswordVisibility = () => {
        this.setState({ hideconfirmPassword: !this.state.hideconfirmPassword });
    }
    async updatePassword() {
        // this.props.navigation.navigate('LoginScreen');
        if (this.state.pass.length == 0) {
            this.setState({ passwordError: 'Enter Old password' });
            this.setState({ passVerify: false });
            return;
        }
        if (this.state.newPass.length == 0) {
            this.setState({ passwordError: 'Enter New Password' });
            this.setState({ newPassVerify: false });

            return;
        }
        if (this.state.confirmPass.length == 0) {
            this.setState({ passwordError: 'Enter Confirm Password' });
            this.setState({ confirmPassVerify: false });

            return;
        }

        if (this.state.confirmPass !== this.state.newPass) {
            this.setState({ passwordError: 'Passwords Mismatch' });
            return;
        }
        const formData = new FormData();
        formData.append('old_password', this.state.pass);
        formData.append('new_password', this.state.newPass);
        formData.append('id', await AsyncStorage.getItem("USER_ID"));

        this.props.updateUserPassword(formData);

        // alert(this.state.email)
    }
    async update() {
        // this.props.navigation.navigate('LoginScreen');
        if (this.state.firstname.length == 0) {
            this.setState({ infoError: 'Enter First Name' });
            this.setState({ firstnameVerify: false });
            return;
        }
        if (this.state.lastname.length == 0) {

            this.setState({ infoError: 'Enter Last Name' });
            this.setState({ lastnameVerify: false });

            return;
        }
        if (this.state.email.length == 0) {
            this.setState({ infoError: 'Enter email' });
            this.setState({ emailVerify: false });

            return;
        }

        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('first_name', this.state.firstname); 
        formData.append('last_name', this.state.lastname);
        formData.append('id', await AsyncStorage.getItem("USER_ID"));

        this.props.updateUserProfile(formData);

        // alert(this.state.email)
    }
    render() {
        var variable = 2;
        if (this.props.userReducer.profileUpdated) {
            console.log("after props is URL: ", this.props.userReducer.profileUpdated)
            this.props.navigation.goBack()
        }
        return {
            ...(Platform.OS === 'android' ? (

                <View style={{ flex: 1 }} style={[styles.container]}>
                    {
                        this.props.userReducer.updateLoading == true ?

                            <View style={styles.loadingView}>
                                <ActivityIndicator size="large" />
                                <Text style={styles.infoText}>Please wait</Text></View> : null
                    }
                    <View style={[styles.container]}>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image
                                style={styles.logob}
                                source={require('../../../assets/images/backIcon.png')}
                            />
                        </TouchableOpacity>

                        <ScrollView>

                            <View
                                style={{
                                    flex: 3,
                                    backgroundColor: '',
                                    marginVertical: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                            </View>
                            <View style={{ flex: 3, justifyContent: 'flex-start' }}>
                                <View style={[styles.tagline]}>
                                    <Text style={[styles.text]}>First Name</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    style={styles.textInput}
                                    value={this.state.firstname}
                                    onChangeText={text =>
                                        this.setState({ firstname: text, firstnameVerify: true })
                                    }
                                />
                                <View style={[styles.tagline]}>
                                    <Text style={[styles.text]}>Last Name</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    value={this.state.lastname}

                                    style={styles.textInput
                                    }
                                    onChangeText={text =>
                                        this.setState({ lastname: text, lastnameVerify: true })
                                    }
                                />
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
                                        value={this.state.email}

                                        style={styles.textInput}
                                        onChangeText={text => this.checkEmail(text)}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.visibilityBtnEm}
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


                            </View>

                            <View style={[styles.bottomView]}>
                                <TouchableOpacity
                                    style={this.state.lastnameVerify == true &&
                                        this.state.firstnameVerify == true ? styles.continueButton : [styles.continueButton]}


                                    onPress={() => this.update()}>
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
                                        Update
            </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider} />
                            {
                                this.props.userReducer.passwordError !== null ?
                                    <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >

                                        <Text style={[styles.text, { color: '#ffacac' }]}> {this.props.userReducer.passwordError}</Text>


                                    </View> : null
                            }
                            {
                                this.state.passwordError !== null ?
                                    <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >

                                        <Text style={[styles.text, { color: '#ffacac' }]}> {this.state.passwordError}</Text>


                                    </View> : null
                            }
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>Old Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hidePassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ pass: text, passVerify: true })}

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
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>New Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hideNewPassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ newPass: text, newPassVerify: true })}

                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.visibilityBtn}
                                    onPress={this.manageNewPasswordVisibility}>
                                    <Image
                                        source={
                                            this.state.hideNewPassword
                                                ? require('../../../assets/images/eye.png')
                                                : require('../../../assets/images/eye-off.png')
                                        }
                                        style={styles.btnImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>Confirm New Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hideconfirmPassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ confirmPass: text, confirmPassVerify: true })}

                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.visibilityBtn}
                                    onPress={this.manageconfirmPasswordVisibility}>
                                    <Image
                                        source={
                                            this.state.hideconfirmPassword
                                                ? require('../../../assets/images/eye.png')
                                                : require('../../../assets/images/eye-off.png')
                                        }
                                        style={styles.btnImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.bottomView]}>
                                <TouchableOpacity
                                    style={this.state.passVerify == true &&
                                        this.state.newPassVerify == true ? styles.continueButton : [styles.continueButton]}


                                    onPress={() => this.updatePassword()}>
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
                                        Update Password
            </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginBottom: 50 }} />

                </View>
            ) : (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled>

                    <View style={[styles.container]}>
                        {
                            this.props.userReducer.updateLoading == true ?

                                <View style={styles.loadingView}>
                                    <ActivityIndicator size="large" />
                                    <Text style={styles.infoText}>Please wait</Text></View> : null
                        }
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image
                                style={styles.logob}
                                source={require('../../../assets/images/backIcon.png')}
                            />
                        </TouchableOpacity>

                        <ScrollView>
                            {
                                this.state.infoError !== null ?
                                    <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >
                                        <Text style={[styles.text, { color: '#ffacac' }]}> {this.state.infoError}</Text>
                                    </View> : null
                            }
                            <View
                                style={{
                                    flex: 3,
                                    backgroundColor: '',
                                    marginVertical: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                            </View>
                            <View style={{ flex: 3, justifyContent: 'flex-start' }}>
                                <View style={[styles.tagline]}>
                                    <Text style={[styles.text]}>First Name</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    style={styles.textInput}
                                    value={this.state.firstname}
                                    onChangeText={text =>
                                        this.setState({ firstname: text, firstnameVerify: true })
                                    }
                                />
                                <View style={[styles.tagline]}>
                                    <Text style={[styles.text]}>Last Name</Text>
                                </View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    value={this.state.lastname}

                                    style={styles.textInput
                                    }
                                    onChangeText={text =>
                                        this.setState({ lastname: text, lastnameVerify: true })
                                    }
                                />
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
                                        value={this.state.email}

                                        style={styles.textInput}
                                        onChangeText={text => this.checkEmail(text)}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.visibilityBtnEm}
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


                            </View>

                            <View style={[styles.bottomView]}>
                                <TouchableOpacity
                                    style={this.state.lastnameVerify == true &&
                                        this.state.firstnameVerify == true ? styles.continueButton : [styles.continueButton,]}


                                    onPress={() => this.update()}>
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
                                        Update
                                        </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider} />
                            {
                                this.props.userReducer.passwordError !== null ?
                                    <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >

                                        <Text style={[styles.text, { color: '#ffacac' }]}> {this.props.userReducer.passwordError}</Text>


                                    </View> : null
                            }
                            {
                                this.state.passwordError !== null ?
                                    <View style={{ flexDirection: "row", marginHorizontal: 50, marginTop: 10 }} >

                                        <Text style={[styles.text, { color: '#ffacac' }]}> {this.state.passwordError}</Text>


                                    </View> : null
                            }
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>Old Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hidePassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ pass: text, passVerify: true })}

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
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>New Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hideNewPassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ newPass: text, newPassVerify: true })}

                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.visibilityBtn}
                                    onPress={this.manageNewPasswordVisibility}>
                                    <Image
                                        source={
                                            this.state.hideNewPassword
                                                ? require('../../../assets/images/eye.png')
                                                : require('../../../assets/images/eye-off.png')
                                        }
                                        style={styles.btnImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.tagline]}>
                                <Text style={[styles.text]}>Confirm New Password</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholderTextColor="#fff"
                                    autoCorrect={false}

                                    underlineColorAndroid="transparent"
                                    secureTextEntry={this.state.hideconfirmPassword}
                                    style={styles.textInput}

                                    onChangeText={text => this.setState({ confirmPass: text, confirmPassVerify: true })}

                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.visibilityBtn}
                                    onPress={this.manageconfirmPasswordVisibility}>
                                    <Image
                                        source={
                                            this.state.hideconfirmPassword
                                                ? require('../../../assets/images/eye.png')
                                                : require('../../../assets/images/eye-off.png')
                                        }
                                        style={styles.btnImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.bottomView]}>
                                <TouchableOpacity
                                    style={this.state.passVerify == true &&
                                        this.state.newPassVerify == true ? styles.continueButton : [styles.continueButton]}


                                    onPress={() => this.updatePassword()}>
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
                                        Update Password
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginBottom: 40 }} />

                </KeyboardAvoidingView>
            )),
        };
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer,
});
export default connect(
    mapStateToProps,
    { updateUserProfile, updateUserPassword },
)(EditProfile);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        // marginBottom:20,
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
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // paddingHorizontal: 30,
    },
    section: {

        alignItems: 'center',

    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        height: 1,
        opacity: 0.5,
        backgroundColor: '#ffffff',
        // marginStart: 15,
        marginTop: 15,
        marginBottom: 10,
    },
    logob: {
        width: 27,
        height: 27,
        marginLeft: 10,
        marginTop: 10,

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
        lineHeight: 15,
        fontSize: 15,
        // marginTop: 10,
        width: '80%',
        backgroundColor: 'black',
    },
    tagline: {
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '75%',
        marginBottom: 2,
    },
    text: {
        color: '#ffffff',
        fontFamily: 'Avenir-Light',
        letterSpacing: -0.2,
        lineHeight: 22,
        fontSize: 17,
    },
    continueButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 155,
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
        width: 155,
        height: 40,
        // marginTop: 70,
        borderColor: '#ccc',
        opacity: 0.5,
        borderWidth: 1,
        borderRadius: 40,
    },
    textInput: {
        alignSelf: 'center',
        width: '80%',
        height: 40,
        backgroundColor: '#353535',
        color: '#ffffff',

        marginTop: 10,
        fontSize: 17,
        paddingLeft: 7,

        marginBottom: 10,
    },


    bottomView: {

        // marginTop: 25,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    visibilityBtn: {
        position: 'absolute',
        right: 45,
        height: 40,
        width: 35,

        padding: 7,
    },

    btnImage: {

        height: 23,
        width: 23,
        opacity: 1,
        marginTop: 15,

    },
    visibilityBtnEm: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        top: 40,
        padding: 9,

    },
    btnImagee: {

        height: 13,
        width: 13,

    },
});
