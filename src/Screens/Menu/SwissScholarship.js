import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SwissScholarship extends Component {

  render() {
    return (

    <View style={styles.container}>
       
       <ImageBackground
            source={require('../../../assets/images/books.jpg')}
            imageStyle={{opacity: 1}}
            style={styles.image}>

        <View style={{ alignSelf: 'flex-end' }}>
          <Icon.Button 
            name="ios-close-circle"
            size= {30}
            backgroundColor= "transparent"
            color="#ffffff"
            onPress={this.crossButton}>
          </Icon.Button>
        </View>
         
        <Text
          style={ styles.titleText }> SWISS Scholarship Program
        </Text>

        <Text
        style={ styles.styleText }>The SWISS Scholarship Program supports students, families who are financially burdened and dont have the access to Islamic Education. We've launched this initiative to support those students and families.
        </Text>

        <Text
        style={ styles.styleText1 }>For only $10.00 a month, you can give someone access to Islamic education.
        </Text>

         
    </ImageBackground>

    </View> 

    );
  }

  crossButton = () => {
    this.props.navigation.goBack();
  }

}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  styleText: {
    marginLeft: 15,
    marginRight: 90,
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    lineHeight: 18,
    letterSpacing: -0.19,
    marginTop: 40,
    color: '#ffffff'
  },
  styleText1: {
    marginLeft: 15,
    marginRight: 90,
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    lineHeight: 18,
    letterSpacing: -0.18,
    marginTop: 40,
    color: '#ffffff'
  },
  btn: {
    backgroundColor: '#f1b300',
    padding: 8,
    borderRadius: 4,
    width: '35%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
    lineHeight: 22,
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
    lineHeight: 24,
    letterSpacing: -0.27,
    color: '#ffffff',
    marginBottom: 10,
    marginHorizontal: 10,
    textAlign: "left"
  }

});