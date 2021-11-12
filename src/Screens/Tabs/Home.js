/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState, Fragment, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  BackHandler,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Tooltip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import {getRequestCourses, getRecentlyAdded, getRequestUserData} from '../../Actions/actions';
import {useFocusEffect} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import {createFilter} from 'react-native-search-filter';
// import { FlatList } from 'react-native-gesture-handler';

function Home({
  homeReducer,
  courseReducer,
  navigation,
  getRequestCourses,
  getRequestUserData,
  getRecentlyAdded,
}) {
  let backPressed = 0;

  const [state, setstate] = useState({
    selectedIndex: 0,
    data: [],
    search: '',
    count: courseReducer.count,
  });

  useFocusEffect(
    useCallback(() => {
      //   const unsubscribe = API.subscribe(userId, user => setUser(user));
      console.log('hellohello');
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      getRequestCourses();
      getRecentlyAdded();

      setstate({...state, count: courseReducer['count']});
      // console.log(courseReducer['count']);
      //   return () => unsubscribe();

      return function cleanup() {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }, []),
  );

  const handleBackButton = props => {
    // BackHandler.exitApp();
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  const renderItem = ({item}) => (
    <View style={HomeS.item}>
      <Text style={HomeS.faith}>{item.name}</Text>
    </View>
  );
  const handleSingleIndexSelect = index => {
    console.log(index, 'idrr');
    //handle tab selection for single Tab Selection SegmentedControlTab
    // this.setState(prevState => ({...prevState, selectedIndex: index}));
    setstate({...state, selectedIndex: index});
    // setstate({...state, count: courseReducer['count']});
  };

  const updateSearch = sear => {
    // this.setState({search});
    setstate({...state, search: sear});
  };

  const {control, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);

  const KEYS_TO_FILTERS = ['Category', 'data.title', 'data.data.name'];

  const filteredData = courseReducer['courses'].filter(
    createFilter(state.search, KEYS_TO_FILTERS),
  );

  return (
    <View style={HomeS.container}>
      {/* <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
      /> */}
      {homeReducer.showBar ? (
        <View>
          <View style={HomeS.searchbar}>
            <SearchBar
              searchIcon={false}
              backgroundColor="#fff"
              placeholderTextColor="#b2b2b2"
              placeholder="Type Here..."
              clearIcon={{style: {color: 'red'}}}
              inputContainerStyle={{backgroundColor: 'white', borderRadius: 3}}
              inputStyle={{
                backgroundColor: 'white',
                // borderRadius: 5,
                fontSize: 16,
                lineHeight: 22,
                fontFamily: 'Avenir-Light',
              }}
              containerStyle={{
                backgroundColor: 'black',
                borderWidth: 1,
                padding: 0,
              }}
              onChangeText={e => updateSearch(e)}
              value={state.search}
            />
          </View>
          <View style={HomeS.divider} />
        </View>
      ) : (
        <SegmentedControlTab
          values={['All', 'Recently Added']}
          selectedIndex={state.selectedIndex}
          onTabPress={val => handleSingleIndexSelect(val)}
          tabsContainerStyle={HomeS.tabsContainerStyle}
          tabStyle={HomeS.tabStyle}
          firstTabStyle={HomeS.firstTabStyle}
          lastTabStyle={HomeS.lastTabStyle}
          tabTextStyle={HomeS.tabTextStyle}
          activeTabStyle={HomeS.activeTabStyle}
          activeTabTextStyle={HomeS.activeTabTextStyle}
          badges={[0, courseReducer.count]}
          tabBadgeStyle={HomeS.tabBadgeStyle}
          activeTabBadgeStyle={HomeS.activeTabBadgeStyle}
          tabBadgeContainerStyle={HomeS.activeTabBadgeContainerStyleAndroid}
          activeTabBadgeContainerStyle={
            HomeS.activeTabBadgeContainerStyleAndroid
          }
          // tabBadgeContainerStyle={...Platform.OS === 'android' ? HomeS.tabBadgeContainerStyleAndroid : HomeS.tabBadgeContainerStyle }
          // activeTabBadgeContainerStyle={...Platform.OS === 'android' ? HomeS.activeTabBadgeContainerStyleAndroid : HomeS.activeTabBadgeContainerStyle}
        />
      )}

      {state.selectedIndex == 0 && courseReducer['courses'].length > 0 ? (
        <ScrollView
          style={{marginBottom: 60}}
          showsVerticalScrollIndicator={false}>
          {filteredData.map((data, index) => (
            <Fragment key={index}>
              <View style={HomeS.mainCourseTextView}>
                <Text style={HomeS.mainCourseText}>{data.Category}</Text>
                <Tooltip
                  backgroundColor="white"
                  skipAndroidStatusBar={true}
                  overlayColor="transparent"
                  popover={<Text>All of the {data.Category} courses are listed.</Text>}>
                  <Icon
                    style={{marginLeft: 10}}
                    name="ios-help-circle-outline"
                    size={24}
                    color="#CACCCE"
                  />
                </Tooltip>

                {/* <Text style={HomeS.questionMark}>?</Text> */}
              </View>

              {data['data'].map((data, i) => (
                <Fragment key={i}>
                  {data['data'].length > 0 ? (
                    <Fragment>
                      {data.title ? (
                        <View style={HomeS.faithTextView}>
                          <Text style={HomeS.faithText}>{data.title}</Text>
                        </View>
                      ) : null}

                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={HomeS.horizontalScrollView}>
                        {data['data'].map((innerdata, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() =>
                              navigation.navigate('CourseHome', innerdata)
                            }>
                            <ImageBackground
                              source={{
                                uri: innerdata.image,
                              }}
                              style={{
                                width: 110,
                                height: 150,
                                marginLeft: 5,
                                //   height: '100%',
                                //   resizeMode: 'cover',
                              }}
                              imageStyle={{borderRadius: 5}}
                              resizeMode="stretch">
                              {/* <Text style={HomeS.backgroundText}>{ innerdata.image}</Text> */}
                            </ImageBackground>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </Fragment>
                  ) : null

                  // <View style={HomeS.contentWait}>
                  //   <Text style={HomeS.main}>No Course Added</Text>
                  // </View>
                  }
                </Fragment>
              ))}
              {index < courseReducer['courses'].length - 1 ? (
                <View style={HomeS.divider2} />
              ) : null}
            </Fragment>
          ))}
        </ScrollView>
      ) : state.selectedIndex == 0 ? (
        <View style={HomeS.contentWait}>
          <ActivityIndicator size="large" />

          <Text style={HomeS.main}>Please wait</Text>
        </View>
      ) : null}

      {state.selectedIndex == 1 && courseReducer.count > 0 ? (
        <ScrollView
          style={{marginBottom: 60}}
          showsVerticalScrollIndicator={false}>
          {/* {courseReducer['recentlyAdded'].map((data, index) => ( */}
          <Fragment>
            <View style={HomeS.grid}>
              {courseReducer['recentlyAdded'].map((innerdata, i) => (
                <View style={{marginBottom: 25}}>
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      navigation.navigate('CourseHome', innerdata)
                    }>
                    <ImageBackground
                      source={{
                        uri: innerdata.image,
                      }}
                      style={{
                        width: 110,
                        height: 150,
                        marginLeft: 5,
                        //   height: '100%',
                        //   resizeMode: 'cover',
                      }}
                      imageStyle={{borderRadius: 5}}
                      resizeMode="stretch">
                      {/* <Text style={HomeS.backgroundText}>{ innerdata.image}</Text> */}
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Fragment>
          {/* ))} */}
        </ScrollView>
      ) : null}

      {state.selectedIndex == 1 && courseReducer.count < 1 ? (
        <View style={HomeS.contentWait}>
          <Text style={HomeS.main}>There are no courses added recently.</Text>
        </View>
      ) : null}
      {courseReducer.isLogout == true ? navigation.navigate('Auth') : null}
    </View>
  );
}

const mapStateToProps = state => ({
  homeReducer: state.homeReducer,
  courseReducer: state.courseReducer,
});

export default connect(
  mapStateToProps,
  {getRequestUserData, getRequestCourses, getRecentlyAdded},
)(Home);

const HomeS = StyleSheet.create({
  contentWait: {
    flex: 1,
    // height: '100%',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  loadingView: {
    flex: 1,
    height: '100%',
    fontSize: 22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    backgroundColor: 'black',
  },
  mainCourseTextView: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'red',
  },
  mainCourseText: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
  },
  faithTextView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 20,
  },
  faithText: {
    color: 'white',
    fontFamily: 'Avenir-Light',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.19,
  },
  horizontalScrollView: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 5,
  },
  backgroundText: {
    // width: '60%',
    marginLeft: 13,
    marginTop: 13,
    color: '#ffe88e',
    fontFamily: 'Avenir-Heavy',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 15.17,
    letterSpacing: -0.16,
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
    // fontFamily: 'Avenirltstd-light',
  },
  searchbar: {
    backgroundColor: 'white',
    // width: '95%',
    marginHorizontal: 18,
    // height:20,
    marginTop: 15,
  },
  ScrollContainer: {
    width: '100%',
    // backgroundColor: 'red',
    height: '18%',
    paddingLeft: 15,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  main: {
    color: 'white',
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 16,
    // fontFamily: 'Avenirltstd-light',
    // fontFamily: 'Roboto-Bold',
    fontFamily: 'Avenir-Heavy',

    // fontWeight: '800',
    paddingLeft: 0,
  },
  faith: {
    color: 'white',
    padding: 10,
    marginBottom: 10,
    paddingLeft: 0,
  },
  imageSize: {
    height: 130,
    width: 97,
    borderRadius: 3,
    marginRight: 2,
    marginLeft: 2,
  },
  tabsContainerStyle: {
    //custom styles
    width: '92%',
    margin: 10,
    marginHorizontal: 13,
    color: 'white',
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  tabStyle: {
    //custom styles
    borderColor: 'white',
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 8,
    paddingRight: 0,
  },
  firstTabStyle: {
    //custom styles
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    color: 'white',
    paddingRight: 1,
  },
  lastTabStyle: {
    //custom styles
    color: 'white',
    borderTopRightRadius: 3,
    paddingRight: 1,

    borderBottomRightRadius: 3,
  },
  tabTextStyle: {
    //custom styles
    color: 'white',
    fontFamily: 'Avenir-Light',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.11,
  },
  activeTabStyle: {
    //custom styles
    paddingRight: 0,

    color: 'black',
    borderColor: 'white',
    backgroundColor: 'white',
  },
  activeTabTextStyle: {
    //custom styles
    color: 'black',
    fontFamily: 'Avenir-Medium',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.19,
  },
  inactiveTabTextStyle: {
    color: 'red',
    fontFamily: 'Avenir-Light',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.19,
  },
  tabBadgeContainerStyle: {
    //custom styles
    color: 'white',
    backgroundColor: 'red',
    padding: 1.8,
    position: 'absolute',
    right: -25,
    borderRadius: 50,
  },
  activeTabBadgeContainerStyle: {
    //custom styles
    padding: 1.8,
    position: 'absolute',
    right: -25,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'red',
  },
  tabBadgeContainerStyleAndroid: {
    //custom styles
    color: 'white',
    backgroundColor: 'red',
    padding: 1,
    position: 'absolute',
    right: -28,
    borderRadius: 50,
  },
  activeTabBadgeContainerStyleAndroid: {
    //custom styles
    padding: 1,
    position: 'absolute',
    right: -28,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'red',
  },
  tabBadgeStyle: {
    padding: 2,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'red',
  },
  activeTabBadgeStyle: {
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'red',
    //custom styles
  },
  divider: {
    width: '100%',
    height: 0.5,
    opacity: 0.3,
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 20,
  },
  divider2: {
    width: '90%',
    height: 0.7,
    alignSelf: 'center',
    opacity: 0.5,
    backgroundColor: '#ffffff',
    marginTop: 30,
    // marginBottom: 20
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    padding: 5,
  },
  gridItem: {
    // margin: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
