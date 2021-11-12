import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getLiveOfficeHours} from '../../Actions/actions';

  function LiveOfficeHours({
    officeHoursReducer,
    getLiveOfficeHours,
  })
  {
    const navigation = useNavigation();

    useFocusEffect(
      React.useCallback(() => {
        getLiveOfficeHours();
      }, []),
    );

    return (

    <View style={styles.container}>
       
       <ImageBackground
            source={require('../../../assets/images/live-office-hours.jpg')}
            imageStyle={{opacity: 1}}
            style={styles.image}>

        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={() => {navigation.goBack()}} >
            <Image style={styles.logob} source={require('../../../assets/images/cross.png')} />
          </TouchableOpacity>
        </View>
         
        <Text
          style={ styles.titleText }> Live Office Hours
        </Text>

        <Text
        style={[ styles.styleText ]}>Live office hours with Suhaib Webb. Feel free to ask anything  related to the SWISS courses.
        </Text>

        <Text
        style={ styles.styleText1 }>SWISS is hosting its next live office hours with Imam Suhaib Webb on:
        </Text>
        {officeHoursReducer.OfficeHoursData['officeHours']?
         <Text
         style={[ styles.styleText1, {color: '#ffd263', width: '50%', fontFamily: 'Avenir-Heavy'} ]} >{officeHoursReducer.OfficeHoursData['officeHours'].date} {officeHoursReducer.OfficeHoursData['officeHours'].time}
         </Text>:null
        }
       

        <Text
        style={ styles.styleText1 }>Get your questions ready and we look forward to joining you then !
        </Text>

        {/* <View style={ styles.styleText }>
            <TouchableOpacity >
                <View style={styles.btn}>
                    <Text style={styles.btnTxt}>Notify Me</Text>
                </View>
            </TouchableOpacity>
        </View> */}

    </ImageBackground>

    </View> 

    );
  }

  const mapStateToProps = state => ({
    officeHoursReducer: state.officeHoursReducer,
  });
  
  export default connect(
    mapStateToProps,
    {getLiveOfficeHours},
  )(LiveOfficeHours);
  

  // crossButton = () => {
  //   this.props.navigation.goBack();
  // }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
  logob: {
    width: 26,
    height: 26,
    marginRight: 20,
    marginTop: 10,
  },
  styleText: {
    marginLeft: 15,
    marginRight: 40,
    fontSize: 22,
    fontFamily: 'Avenir-Light',
    lineHeight: 25,
    letterSpacing: -0.27,
    marginTop: 20,
    color: '#ffffff'
  },
  styleText1: {
    marginLeft: 15,
    marginRight: 40,
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    lineHeight: 18,
    letterSpacing: -0.18,
    marginTop: 20,
    color: '#ffffff'
  },
  btn: {
    backgroundColor: '#f1b300',
    padding: 8,
    borderRadius: 4,
    marginTop: 20,
    width: '35%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Avenir-Heavy',
    lineHeight: 25,
    letterSpacing: -0.27,
    color: '#ffffff',
    marginBottom: 10,
    marginHorizontal: 10,
    textAlign: "left"
  }

});