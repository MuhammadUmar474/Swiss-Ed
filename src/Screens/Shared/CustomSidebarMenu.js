import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwissScholarship from '../Menu/SwissScholarship';
import deviceStorage from '../../Actions/deviceStorage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {logout} from '../../Actions/actions';

class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    //Setting up the Main Top Large Image of the Custom Sidebar
    // this.proileImage =
    //   'https://c.tribune.com.pk/2019/08/2044092-hania-1566982980.jpg';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/

    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'First Screen',
        screenToNavigate: 'SwissScholarship',
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'Second Screen',
        screenToNavigate: SwissScholarship,
      },
      {
        navOptionThumb: 'build',
        navOptionName: 'Third Screen',
        screenToNavigate: 'SwissScholarship',
      },
    ];
  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        {/* <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        /> */}

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={this.crossButton}>
            <Image
              style={styles.logob}
              source={require('../../../assets/images/cross.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleText}> Menu</Text>

        {/*Divider between Top Image and Sidebar Option*/}

        <View style={[styles.divider, {marginTop: 25}]} />

        {/*Setting up Navigation Options from option array using loop*/}

        <View style={styles.rowView}>
          <Text onPress={this.aboutSwiss} style={styles.rowText}>
            {' '}
            About Swiss
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowView}>
          <Text onPress={this.liveOfficeHours} style={styles.rowText}>
            {' '}
            Live Office Hours
          </Text>

          <View style={{alignSelf: 'flex-end', marginEnd: 15}}>
            <TouchableOpacity onPress={this.liveOfficeHours}>
              <Image
                style={styles.logoc}
                source={require('../../../assets/images/arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowView}>
          <Text onPress={this.swissScholarship} style={styles.rowText}>
            {' '}
            SWISS Scholarship Program
          </Text>
          <View style={{alignSelf: 'flex-end', marginEnd: 15}}>
            <TouchableOpacity onPress={this.swissScholarship}>
              <Image
                style={styles.logoc}
                source={require('../../../assets/images/arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />
        <View style={styles.rowView}>
          <TouchableOpacity style={styles.rowView} onPress={this.profile}>
            <Text style={styles.rowText}> My Account</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.rowView}>
          <Text style={styles.rowText}> </Text>
        </View> */}
        <View style={styles.divider} />

        <View style={styles.rowView}>
          <TouchableOpacity style={styles.rowView} onPress={this.myAccount}>
            <Text style={styles.rowText}> Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowView}>
          <Text
            style={[
              styles.rowText,
              {opacity: 0.5, fontSize: 12, letterSpacing: -0.14},
            ]}>
            {' '}
            V1.0
          </Text>
        </View>
      </View>
    );
  }

  crossButton = () => {
    this.props.navigation.closeDrawer();
  };

  aboutSwiss = () => {
    alert('Coming Soon')
    // this.props.navigation.navigate('CourseCompleted', { courseName: 'Essentials of Islamic Faith' });
  };
  profile = () => {
    
    this.props.navigation.navigate('Profile');
  };
  swissScholarship = () => {
    this.props.navigation.navigate('SwissScholarship');
  };

  liveOfficeHours = () => {
    this.props.navigation.navigate('LiveOfficeHours');
  };

  myAccount = () => {
    // this.props.loginReducer.isLoggedin = false;
    this.props.logout();
    this.props.navigation.navigate('Auth');
    if (this.props.navigation.popToTop !== undefined) {
      this.props.navigation.popToTop();
    }
  };
}
export default connect(
  null,
  {logout},
)(CustomSidebarMenu);
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  logob: {
    width: 25,
    height: 25,
    marginRight: 20,
    marginTop: 10,
  },
  logoc: {
    width: 7,
    height: 14,
    marginRight: 3,
    marginBottom: 3,
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
    height: 0.8,
    opacity: 0.44,
    backgroundColor: '#ffffff',
    marginStart: 20,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000',
    width: '100%',
    height: '7%',
  },
  rowText: {
    marginLeft: 20,
    position: 'absolute',
    left: 0,
    fontSize: 15,
    fontFamily: 'Avenir-Light',
    lineHeight: 17,
    letterSpacing: -0.18,
    color: '#ffffff',
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Avenir-Heavy',
    lineHeight: 24,
    letterSpacing: -0.27,
    color: '#ffffff',
    textAlign: 'center',
  },
});
