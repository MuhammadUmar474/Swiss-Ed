import React from 'react';
import DrawerScreen, {
  AuthStackScreen,
} from './src/Screens/Routes/AppNavigation';
import {Provider, connect} from 'react-redux';

import {
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import { useFocusEffect } from '@react-navigation/native';

function AppStart({loginReducer}) {
     
  return(
      <View>
{
               loginReducer.isLoggedin?<DrawerScreen />:<AuthStackScreen />
          } 
      </View>
  
  )
}

const mapStateToProps = state => ({
    loginReducer: state.loginReducer,
  });
  
  export default connect(
    mapStateToProps,
   null
  )(AppStart);
