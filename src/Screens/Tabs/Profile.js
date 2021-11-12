/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import {cancelSubscripion, getRequestUserData} from '../../Actions/actions';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {Fragment} from 'react';
import call from 'react-native-phone-call';
import { ActivityIndicator } from 'react-native';

function Profile({
  userReducer,
  navigation,
  getRequestUserData,
  cancelSubscripion,
}) {
  const [state, setstate] = useState({
    cardNumber: '1234567891234567',
    hideAccount: '',
    fourDigit: '',
  });
  useFocusEffect(
    React.useCallback(() => {
      getRequestUserData();
      // hideAccountNumber(state.cardNumber)
    }, []),
  );

  const hideAccountNumber = number => {
    console.log(number, 'uyahaaaaan');
    var no = number;
    var len = number.length;
    var lstFour = no.substr(len - 4);
    let strs = '';
    console.log(lstFour);

    var temp = 1;
    for (let k = 0; k < len - 4; k++) {
      strs += '.';
      if (temp == 4) {
        strs += ' ';
        temp = 0;
      }
      temp++;
    }
    console.log(strs + lstFour);
    // await setstate({ cardNumber: '' })

    setstate({...state, hideAccount: strs, fourDigit: lstFour});
  };
  const callUsFn = () => {
    const args = {
      number: '+14088055590', // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };
  const gotoEditProfile = () => {
    if (userReducer.UserData.first_name) {
      navigation.navigate('EditProfile');
    }
  };
  const cancelSubscriptionFn = () => {
    console.log('in funcion');
    cancelSubscripion(userReducer.UserData.id);
  };
  return (
    <View style={styles.sideMenuContainer}>
       {
          userReducer.Loading == true ?

            <View style={styles.loadingView}>
              <ActivityIndicator size="large" />
              <Text style={styles.infoText}>Please wait</Text></View> : null
        }
      <ScrollView>
        <View style={{marginTop: 20}} />

        <View style={styles.rowView}>
          <View style={styles.accountView}>
            <Text style={styles.rowText}> My Account Details</Text>
          </View>

          <View style={styles.editView}>
            <TouchableOpacity onPress={gotoEditProfile}>
              <Text style={styles.editText}> Edit account details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.arrowView}>
            <TouchableOpacity onPress={gotoEditProfile}>
              <Image
                style={styles.logoc}
                source={require('../../../assets/images/arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.informationView}>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>First Name</Text>
            <Text style={styles.infoText}>
              {' '}
              {userReducer.UserData.first_name}{' '}
            </Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>Last Name</Text>
            <Text style={styles.infoText}>
              {userReducer.UserData.last_name}
            </Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>Account Email</Text>
            <Text style={styles.infoText}>{userReducer.UserData.email}</Text>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.infoText}>Password</Text>
            <Text style={styles.infoText}>********</Text>
          </View>
        </View>

        {userReducer.UserData.subscribed == true ? (
          <Fragment>
            <View style={styles.rowView}>
              <View style={styles.accountView}>
                <Text onPress={this.liveOfficeHours} style={styles.rowText}>
                  {' '}
                  My Billing Details
                </Text>
              </View>

              <View style={styles.editView}>
                <TouchableOpacity onPress={this.liveOfficeHours}>
                  <Text style={styles.editText}> Manage billing details</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.arrowView}>
                <TouchableOpacity onPress={this.liveOfficeHours}>
                  <Image
                    style={styles.logoc}
                    source={require('../../../assets/images/arrow.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.informationView}>
              <View style={styles.infoView}>
                <Text style={styles.rowText}>
                  Your Next billing date is{' '}
                  {userReducer.UserData.next_bill_date}{' '}
                </Text>
              </View>
              <View style={styles.billingRow}>
                <View style={styles.card}>
                  <Image source={require('../../../assets/images/card.png')} />
                </View>
                <View style={styles.cardNum}>
                  <Text
                    style={{
                      ...styles.rowText,
                      fontSize: 30,
                      fontWeight: 'bold',
                      lineHeight: 23,
                      color: '#bebebe',
                    }}>
                    .... .... ....{' '}
                  </Text>
                  <Text style={{...styles.rowText}}>{userReducer.UserData.card_number}</Text>
                </View>
              </View>
              <View style={[{marginTop: 20}]}>
                <View style={[styles.infoView, {marginTop: 15}]}>
                  <Text style={styles.rowText}>Need more assistance? </Text>
                  <View style={styles.billingRow}>
                    <View style={styles.styleText}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                          <Text style={styles.btnTxt}>Email us</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.styleText}>
                      <TouchableOpacity onPress={callUsFn}>
                        <View style={styles.btn}>
                          <Text style={styles.btnTxt}>Call us</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={cancelSubscriptionFn}>
                    <Text style={{textAlign: 'center', color: '#ffffff'}}>
                      Cancel Subscription
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginBottom: 50}} />
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <View style={styles.divider} />
            <View style={[{paddingLeft: 15}]}>
              <View style={[styles.infoView, {marginTop: 15}]}>
                <Text style={styles.rowText}>Need more assistance? </Text>
                <View style={styles.billingRow}>
                  <View style={styles.styleText}>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Text style={styles.btnTxt}>Email us</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.styleText}>
                    <TouchableOpacity onPress={callUsFn}>
                      <View style={styles.btn}>
                        <Text style={styles.btnTxt}>Call us</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => ({
  userReducer: state.userReducer,
});

export default connect(
  mapStateToProps,
  {getRequestUserData, cancelSubscripion},
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:40,
    // height:290,
    backgroundColor: 'black',
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
  logoc: {
    width: 7,
    height: 14,
    marginRight: 3,
    marginBottom: 3,
  },

  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  divider: {
    width: '90%',
    height: 1,
    opacity: 0.5,
    backgroundColor: '#ffffff',
    marginStart: 12,
  },
  accountView: {
    flex: 7,
    // backgroundColor: 'red',
  },
  editView: {
    flex: 7,
    // backgroundColor: 'red',
  },
  arrowView: {
    flex: 1,
    paddingLeft: 10,
    // backgroundColor: 'green',
  },
  rowView: {
    flexDirection: 'row',
    // justifyContent: "flex-end",
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    paddingEnd: 10,
    paddingBottom: 5,
    backgroundColor: '#000',
    width: '100%',
    // marginTop: 20,
    // height: "8%"
  },
  informationView: {backgroundColor: '#000', padding: 12},
  infoView: {
    marginTop: 15,
    // width:'100%'
  },
  editText: {
    fontFamily: 'Avenir-Heavy',

    textAlign: 'right',
    fontSize: 14,
    color: '#ffffff',
  },
  rowText: {
    fontFamily: 'Avenir-Light',

    fontSize: 16,
    color: '#ffffff',
  },
  infoText: {
    fontFamily: 'Avenir-Light',

    fontSize: 14,
    color: '#ffffff',
  },
  card: {
    paddingLeft: 5,
  },
  cardNum: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  billingRow: {
    flexDirection: 'row',
    marginTop: 13,
  },
  styleText: {
    fontSize: 22,
    fontFamily: 'Avenir-Light',
    lineHeight: 25,
    justifyContent: 'flex-start',
    letterSpacing: -0.27,
    width: '30%',
    color: '#ffffff',
  },

  btn: {
    backgroundColor: '#f1b300',
    padding: 4,
    borderRadius: 4,
    // marginTop: 5,
    width: '80%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  continueButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 35,
    marginTop: 30,
    textTransform: 'uppercase',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
  },
});
