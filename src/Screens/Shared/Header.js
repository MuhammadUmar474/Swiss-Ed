import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { setShowbar } from '../../Actions/homePage';
// import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaProvider,
  useSafeArea,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { SAVE_ACCESS_TOKEN, SAVE_REFRESH_TOKEN } from '../../Actions/type';

const Header = ({ homeReducer, navigation, title, setShowbar }) => {
  const insets = useSafeArea();
  const Title = title;
  const openMenu = e => {
    // alert(e)
    Keyboard.dismiss();
    navigation.openDrawer();
  };

  const showSearchBar = e => {
    // alert(e)
    Keyboard.dismiss();
    // AsyncStorage.setItem(SAVE_ACCESS_TOKEN,'666')
    // AsyncStorage.setItem(SAVE_REFRESH_TOKEN,'44')


    // navigation.openDrawer();
    setShowbar();
  };
  return (
    <View style={S.container}>
      <View style={S.menu}>
        <TouchableOpacity onPress={e => openMenu(e)}>
          <Ionicons name="ios-menu" size={34} color="white" />
        </TouchableOpacity>
      </View>
      <View style={S.title}>
        {Title == 'SWISS' ? (
          <Image
            style={S.image}
            source={require('../../../assets/images/logo.png')}
          />
        ) : (

            <Text style={S.head}>{title}</Text>
          )}
      </View>


      <View {...Platform.OS === 'android' ? style = S.searchAndroid : style = S.search} >
        {Title == 'SWISS' ? (
          <TouchableOpacity onPress={e => showSearchBar(e)}>
            {homeReducer.showBar ? (
              <Image
                style={S.searchim}
                source={require('../../../assets/images/search1.png')}
              />
            ) : (
                <Image
                  style={S.searchim}
                  source={require('../../../assets/images/search.png')}
                />
              )}
          </TouchableOpacity>

        ) : (
            <View style={{flex:1,padding:5,}}>

              <View {...Platform.OS === 'ios' ? style = S.searchIos : style = S.search} />

              <View {...Platform.OS === 'android' ? style = S.searchAndroid : style = S.search} />
            </View>

          )}
      </View>

    </View>
  );
};

const mapStateToProps = state => ({
  homeReducer: state.homeReducer,
});

export default connect(
  mapStateToProps,
  { setShowbar },
)(Header);

const S = StyleSheet.create({
  container: {
    alignContent: 'center',
    paddingHorizontal: 9,
    flex: 1,
    paddingTop: 5,
    // marginLeft: -15,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  head: {
    color: 'white',
    justifyContent: 'center',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.27,
    // backgroundColor: 'red',
    // lineHeight:22,
    fontSize: 22,

  },
  title: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',

    // paddingTop: 15,
    flex: 4,
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 45,
  },
  searchim: {
    width: 25,
    height: 25,
  },
  menu: {
    flexDirection: 'row',
    paddingLeft: 7,
  },
  search: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 5,
    // marginTop:4,  
    // backgroundColor:'red',
    paddingTop: 0,
  },
  searchIos: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex:3,
    // paddingRight: 25,
    // marginTop:4,  
    // backgroundColor:'red',
    paddingTop: 0,
  },
  searchAndroid: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 25,
    // marginTop:4,  
    // backgroundColor:'red',
    paddingTop: 0,
  },
});