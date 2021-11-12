import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaProvider,
  useSafeArea,
  SafeAreaView,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CourseHeader({navigation, title}) {
  // console.log(navigation,'course header ')
  const insets = useSafeArea();
  const Title = title;
  const openMenu = e => {
    // alert(e)
    navigation.openDrawer();
  };
  return (
    <View style={S.container}>
      <View style={S.menu}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // resizeMode="center"
            style={S.logo}
            source={require('../../../assets/images/backIcon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={S.title}>
        <Text numberOfLines={2} style={S.head}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: {
    paddingHorizontal: 9,
    paddingVertical: 9,
    opacity: 1,
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  head: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    width: '90%',
    // fontWeight:'bold',
    marginBottom: 7,
    fontFamily: 'Avenir-Heavy',

    opacity: 1,
  },
  icon: {
    // backgroundColor: "#CACCCE",
    color: '#ffffff',
    fontWeight: '100',

    // fontWeight:'100'
  },
  logo: {
    width: 27,
    height: 27,
  },
  title: {
    height: '100%',
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    opacity: 1,
  },
  menu: {
    flexDirection: 'row',
    paddingLeft: 4,
  },
  search: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingRight: 10,
  },
});
