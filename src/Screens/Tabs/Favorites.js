/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {Fragment, useState} from 'react';

import {View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getFavourites, RemoveFavorite} from '../../Actions/actions';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
function Favorites({
  favouritesReducer: {favouritesResponse, favLoading,favouritesError},
  getFavourites,
  RemoveFavorite,
  navigation,
}) {
  useFocusEffect(
    React.useCallback(() => {
      console.log('here in fav function');
      getFavourites();
    }, []),
  );

  const [videoSection, setVideoSection] = useState(false);

  const buttonPress = () => {
    console.log('state value', videoSection);
    setVideoSection(true);
  };

  const removeFromFavList = (index, id, option) => {
    console.log('here');
    RemoveFavorite(index, id, option);
  };
  // const navigation = this.props.navigation;

  return (
    <View style={favorites.container}>
      {favLoading == true ? (
        <View style={favorites.loadingView}>
          <ActivityIndicator size="large" />
          <Text style={favorites.main}>Please wait</Text>
        </View>
      ) : null}
      {favouritesResponse !== null ? (
        <Fragment>
          {favouritesResponse.videos.length == 0 &&
          favouritesResponse.contents.length == 0 ? (
            <View style={favorites.contentWait}>
              <Text style={favorites.Clickmain}>Click on the "Heart" icon to make Lesson Video/Content favourite in Course Detail</Text>
            </View>
          ) : null}
        </Fragment>
      ) : null}

{favouritesError !== null ? (
        <Fragment>
         
            <View style={favorites.contentWait}>
              <Text style={favorites.main}>{favouritesError.description}</Text>
            </View>
         
        </Fragment>
      ) : 
      <Fragment>
      {favouritesResponse !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Fragment>
            {favouritesResponse.videos.map((item, i) => (
              <View
                key={i}
                style={(favorites.listcontainer, {display: 'flex'})}>
                <View style={favorites.list}>
                  <View style={favorites.sideIcons}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={require('../../../assets/images/Play.png')}
                    />
                  </View>

                  <View style={favorites.Textt}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('FavouriteDetail', {
                          data: item,
                        })
                      }>
                      <Text style={favorites.title}>{item.video_title}</Text>
                      <Text style={favorites.secondaryTitle}>
                        Watch - {item.duration}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={favorites.sideIcons}>
                    <TouchableOpacity
                      onPress={() => removeFromFavList(i, item.id, 1)}>
                      <Image
                        source={require('../../../assets/images/Heart1.png')}
                        style={{
                          width: 23,
                          height: 21,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            {favouritesResponse.contents.map((contentData, i) => (
              // {contentData.pdffile ? (
              <View
                key={i}
                style={(favorites.listcontainer, {display: 'flex'})}>
                <View style={favorites.list}>
                  <View style={favorites.sideIconsLeft}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PDFViewer', {
                          data: contentData,
                          type: 'content',
                        })
                      }>
                      <Image
                        style={favorites.logo2}
                        source={require('../../../assets/images/Read.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={favorites.Textt}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PDFViewer', {
                          data: contentData,
                          type: 'content',
                        })
                      }>
                      <Text style={favorites.main}>{contentData.title}</Text>
                      <Text style={favorites.duration}>
                        read {contentData?.duration}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={favorites.sideIcons}>
                    <TouchableOpacity
                      onPress={() => removeFromFavList(i, contentData._id, 2)}>
                      <Image
                        source={require('../../../assets/images/Heart1.png')}
                        style={{
                          width: 23,
                          height: 21,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Fragment>
        </ScrollView>
      ) : (
       
        <View style={favorites.contentWait}>
          <ActivityIndicator size="large" />

          <Text style={favorites.main}>Please wait</Text>
        </View>
      )}</Fragment>
      }
    </View>
  );
}

const mapStateToProps = state => ({
  favouritesReducer: state.favouritesReducer,
});

export default connect(
  mapStateToProps,
  {getFavourites, RemoveFavorite},
)(Favorites);

const favorites = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,
    paddingBottom: '9%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingView: {
    // flex: 1,
    height: '100%',
    fontSize: 22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    position: 'absolute',
    // backgroundColor: 'red',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  contentWait: {
    flex: 1,
    padding: 10,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listcontainer: {
    width: '93%',
    // height: '9%',
    // backgroundColor: 'red',

    marginHorizontal: 11,
    // marginTop:2,
    // marginBottom: 2,
  },
  list: {
    width: '100%',
    height: '100%',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 5,
    paddingRight: 5,

    // marginVertical:4,

    borderBottomColor: 'rgba(255, 255, 255, .3)',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flex: 1,
  },
  sideIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // padding: 2,
  },
  Textt: {
    flex: 10,
    // backgroundColor: 'green',

    paddingLeft: 7,
  },
  title: {
    fontFamily: 'Avenir-Light',
    letterSpacing: 0,
    lineHeight: 18,
    fontSize: 15,
    color: 'white',
  },
  secondaryTitle: {
    fontSize: 12,
    opacity: 0.5,
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.14,
    lineHeight: 16,
    color: 'white',
  },
  video_container: {
    flex: 1,
    marginTop: 10,
    // height: 290,
    backgroundColor: 'red',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  logo2: {
    justifyContent: 'center',
    // width:'100%'
    width: 24,
    height: 30,
  },
  sideIconsLeft: {
    flex: 1,
    // backgroundColor:'red',
    // width:'100%',
    justifyContent: 'center',
    alignItems: 'center',

    // padding: 2,
  },
  Clickmain:{
    color: '#ccc',
    // padding: 8,
    // paddingLeft:6,
    // // paddingTop:1,
    fontFamily: 'Avenir-Light',
    letterSpacing: 0,
    lineHeight: 22,
    textAlign:'center',
    justifyContent: 'center',
    fontSize: 17,
  },
  main: {
    color: '#ccc',
    // padding: 8,
    // paddingLeft:6,
    // // paddingTop:1,
    fontFamily: 'Avenir-Light',
    letterSpacing: 0,
    lineHeight: 22,
    fontSize: 17,
  },
  duration: {
    color: '#ccc',
    // padding: 8,
    // paddingTop: 1,
    // // paddingVertical:0,
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.14,
    lineHeight: 14,
    fontSize: 12,
    // opacity:0.5,
    // textTransform:"capitalize",
    // fontWeight: '800',
    // paddingLeft: 0,
  },
});
