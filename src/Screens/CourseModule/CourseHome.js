import React, { Component, Fragment } from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
  StyleSheet,
  Linking,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CourseHeader from '../Shared/CourseHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCoursesByID, setVideoFavourite, contentFavourite } from '../../Actions/actions';
import favouritesReducer from '../../Reducers/favouritesReducer';
import { ActivityIndicator } from 'react-native';

class CourseHome extends Component {
  image = { uri: '../../assets/images/download.jpg' };
  constructor(props) {
    super(props);


    this.state = {
      selectedIndex: 0,
      data: [],
    };
  }
  componentWillMount() {
    console.log('in hereee course home', this.props, this.props.route.params);
    this.props.getCoursesByID(this.props.route.params._id);
  }


  setFavourite(i, j, video_id, option) {
    console.log('idr se fav')
    this.props.setVideoFavourite(i, j, video_id, option);
  }

  setFavouriteContent(i, j, content_id, option) {
    this.props.contentFavourite(i, j, content_id, option);
  }

  handleSingleIndexSelect = index => {
    // this.props.getCoursesByID(this.props.route.params._id);

    //handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <SafeAreaView style={courseDet.container}>
        {
          this.props.courseReducer.FavLoading == true ?

            <View style={courseDet.loadingView}>
              <ActivityIndicator size="large" />
              <Text style={courseDet.main}>Please wait</Text></View> : null
        }
        <View style={courseDet.container}>
          {this.props.route.params.banner_image ? (
            <View style={courseDet.container}>
              <ImageBackground
                source={{
                  uri: this.props.route.params.banner_image,
                }}
                resizeMode="stretch"
                style={courseDet.image}>
                <View style={courseDet.headerOp}>
                  <CourseHeader
                    navigation={this.props.navigation}
                    title={this.props.route.params.name}
                  />
                </View>
                <View style={courseDet.rowContainerOp}>
                  <View style={courseDet.buttonCol}>
                    <SegmentedControlTab
                      values={['Home', 'Assignments']}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress={this.handleSingleIndexSelect}
                      tabsContainerStyle={courseDet.tabsContainerStyle}
                      tabStyle={courseDet.tabStyle}
                      firstTabStyle={courseDet.firstTabStyle}
                      lastTabStyle={courseDet.lastTabStyle}
                      tabTextStyle={courseDet.tabTextStyle}
                      activeTabStyle={courseDet.activeTabStyle}
                      activeTabTextStyle={courseDet.activeTabTextStyle}
                    />
                  </View>
                </View>
              </ImageBackground>

              <View style={courseDet.content}>
                {/* <Text style={courseDet.main}>Hiii</Text> */}
                {this.state.selectedIndex == 0 && this.props.courseReducer['CourseData']?.length > 0 ? (
                  <ScrollView style={courseDet.rowContainer3}>
                    {this.props.courseReducer['CourseData'].map((item, i) => (
                      <View style={courseDet.rowContainerLesson}>
                        <View style={courseDet.rowContainer2}>
                          <View style={courseDet.buttonCol}>
                            <Text style={courseDet.btnTxt}>
                              {item.lessonName}
                            </Text>
                          </View>
                        </View>
                        {item['videos'].map((data, j) => (
                          <Fragment>
                            {data.video_title ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    style={courseDet.tochble}
                                    onPress={() =>
                                      navigation.navigate('CourseDetail', {
                                        data: data,
                                        outerIndex: i,
                                        innerIndex: j,
                                        banner_image: this.props.route.params
                                          .banner_image,
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo}
                                      source={require('../../../assets/images/Play.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    style={courseDet.tochble}
                                    onPress={() =>
                                      navigation.navigate('CourseDetail', {
                                        data: data,
                                        outerIndex: i,
                                        innerIndex: j,
                                        banner_image: this.props.route.params
                                          .banner_image,
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {data.video_title}
                                    </Text>
                                    <Text style={courseDet.duration}>
                                      watch {data.duration}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.sideIcons}>
                                  {
                                    data.favourite == true ?
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavourite(i, j, data.id, 2)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart1.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavourite(i, j, data.id, 1)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                  }


                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['content'].map((contentData, j) => (
                          <Fragment>
                            {contentData.pdffile ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: contentData,
                                        type: 'content',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Read.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: contentData,
                                        type: 'content',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {contentData.title}
                                    </Text>
                                    <Text style={courseDet.duration}>
                                      read {contentData?.duration}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.sideIcons}>
                                  {
                                    contentData.favourite == true ?
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavouriteContent(i, j, contentData._id, 2)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart1.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavouriteContent(i, j, contentData._id, 1)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                  }
                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['quizes'].map(quizesData => (
                          <Fragment>
                            {quizesData.link ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: quizesData,
                                        type: 'quiz',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Read.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: quizesData,
                                        type: 'quiz',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {quizesData.title}
                                    </Text>


                                  </TouchableOpacity>

                                </View>

                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['assignments'].map(assignmentsData => (
                          <Fragment>
                            {assignmentsData.pdffile ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: assignmentsData,
                                        type: 'assignment',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Assignment.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: assignmentsData,
                                        type: 'assignment',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {assignmentsData.title}
                                    </Text>
                                  </TouchableOpacity>

                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <View style={courseDet.contentWait}>
                    {
                      this.state.selectedIndex == 0?(
                        <Fragment>
                          {
                              this.state.selectedIndex == 0 && this.props.courseReducer.CourseDataError ?
                              <Text style={courseDet.main}>{this.props.courseReducer.CourseDataError}</Text> :
                              <Fragment>
                                <ActivityIndicator size="large" />
                                <Text style={courseDet.main}>Please wait</Text>
                              </Fragment>
                          }
                        </Fragment>
                      ):null
                    
                    }

                  </View> 
                   
                )}

                {this.state.selectedIndex == 1 && this.props.courseReducer['CourseData']?.length > 0 ? (
                  <ScrollView style={courseDet.rowContainer3}>
                    {this.props.courseReducer['CourseData'].map((item, i) => (
                      <Fragment>
                        {item['assignments'].length > 0 ? (


                          <View style={courseDet.rowContainerLesson}>
                            <View style={courseDet.rowContainer2}>
                              <View style={courseDet.buttonCol}>
                                <Text style={courseDet.btnTxt}>
                                  {item.lessonName}
                                </Text>
                              </View>
                            </View>
                            {item['assignments'].map(assignmentsData => (
                              <Fragment>
                                {assignmentsData.pdffile ? (
                                  <View style={courseDet.rowContainerLessonList}>
                                    <View style={courseDet.sideIconsLeft}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate('PDFViewer', {
                                            data: assignmentsData,
                                            type: 'assignment',
                                          })
                                        }>
                                        <Image
                                          style={courseDet.logo2}
                                          source={require('../../../assets/images/Assignment.png')}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                    <View style={courseDet.Textt}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate('PDFViewer', {
                                            data: assignmentsData,
                                            type: 'assignment',
                                          })
                                        }>
                                        <Text style={courseDet.main}>
                                          {assignmentsData.title}
                                        </Text>
                                      </TouchableOpacity>

                                    </View>
                                  </View>
                                ) : null}
                              </Fragment>
                            ))}
                          </View>
                        ) :
                          null
                        }
                      </Fragment>
                    ))}
                  </ScrollView>
                ) : (null
                  // <View style={courseDet.contentWait}>
                  //   {
                  //     this.props.courseReducer.CourseDataError ?
                  //       <Text style={courseDet.main}>{this.props.courseReducer.CourseDataError}</Text> :
                  //       <Fragment>
                  //         <ActivityIndicator size="large" />
                  //         <Text style={courseDet.main}>No Assignments</Text>
                  //       </Fragment>
                  //   }

                  // </View>
                )}
              </View>
            </View>
          ) : (
            <View style={courseDet.noImage}>
              <View style={courseDet.noimageheader}>
                <CourseHeader
                  navigation={this.props.navigation}
                  title={this.props.route.params.name}
                />
              </View>
              <View style={courseDet.rowContainer}>
                <View style={courseDet.buttonCol}>
                  <SegmentedControlTab
                    values={['Home', 'Assignments']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleSingleIndexSelect}
                    tabsContainerStyle={courseDet.tabsContainerStyle}
                    tabStyle={courseDet.tabStyle}
                    firstTabStyle={courseDet.firstTabStyle}
                    lastTabStyle={courseDet.lastTabStyle}
                    tabTextStyle={courseDet.tabTextStyle}
                    activeTabStyle={courseDet.activeTabStyle}
                    activeTabTextStyle={courseDet.activeTabTextStyle}
                  />
                </View>
              </View>
              <View style={courseDet.content}>
                {/* <Text style={courseDet.main}>Hiii</Text> */}
                {this.state.selectedIndex == 0 && this.props.courseReducer['CourseData'].length > 0 ? (
                  <ScrollView style={courseDet.rowContainer3}>
                    {this.props.courseReducer['CourseData'].map((item, i) => (
                      <View style={courseDet.rowContainerLesson}>
                        <View style={courseDet.rowContainer2}>
                          <View style={courseDet.buttonCol}>
                            <Text style={courseDet.btnTxt}>
                              {item.lessonName}
                            </Text>
                          </View>
                        </View>
                        {item['videos'].map((data, j) => (
                          <Fragment>
                            {data.video_title ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    style={courseDet.tochble}
                                    onPress={() =>
                                      navigation.navigate('CourseDetail', {
                                        data: data,
                                        outerIndex: i,
                                        innerIndex: j,
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo}
                                      source={require('../../../assets/images/Play.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    style={courseDet.tochble}
                                    onPress={() =>
                                      navigation.navigate('CourseDetail', {
                                        data: data,
                                        outerIndex: i,
                                        innerIndex: j,
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {data.video_title}
                                    </Text>
                                    <Text style={courseDet.duration}>
                                      watch {data.duration}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.sideIcons}>
                                  {
                                    data.favourite == true ?
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavourite(i, j, data.id, 2)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart1.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavourite(i, j, data.id, 1)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                  }


                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['content'].map((contentData, j) => (
                          <Fragment>
                            {contentData.pdffile ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: contentData,
                                        type: 'content',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Read.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: contentData,
                                        type: 'content',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {contentData.title}
                                    </Text>
                                    <Text style={courseDet.duration}>
                                      read {contentData?.duration}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.sideIcons}>
                                  {
                                    contentData.favourite == true ?
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavouriteContent(i, j, contentData._id, 2)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart1.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity
                                        onPress={() =>
                                          this.setFavouriteContent(i, j, contentData._id, 1)
                                        }>
                                        <Image
                                          source={require('../../../assets/images/Heart.png')}
                                          style={{
                                            width: 23,
                                            height: 21,
                                          }}
                                        />
                                      </TouchableOpacity>
                                  }
                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['quizes'].map(quizesData => (
                          <Fragment>
                            {quizesData.link ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: quizesData,
                                        type: 'quiz',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Read.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: quizesData,
                                        type: 'quiz',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {quizesData.title}
                                    </Text>


                                  </TouchableOpacity>
                                </View>
                                {/* <View style={courseDet.sideIcons}>
                         <Image
                           source={require('../../../assets/images/Heart.png')}
                           style={{
                             width: 23,
                             height: 21,
                           }}
                         />
                       </View> */}
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                        {item['assignments'].map(assignmentsData => (
                          <Fragment>
                            {assignmentsData.pdffile ? (
                              <View style={courseDet.rowContainerLessonList}>
                                <View style={courseDet.sideIconsLeft}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: assignmentsData,
                                        type: 'assignment',
                                      })
                                    }>
                                    <Image
                                      style={courseDet.logo2}
                                      source={require('../../../assets/images/Assignment.png')}
                                    />
                                  </TouchableOpacity>
                                </View>
                                <View style={courseDet.Textt}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('PDFViewer', {
                                        data: assignmentsData,
                                        type: 'assignment',
                                      })
                                    }>
                                    <Text style={courseDet.main}>
                                      {assignmentsData.title}
                                    </Text>
                                  </TouchableOpacity>
                                  {/* <Text style={courseDet.duration}>read {assignmentsData?.duration}</Text> */}
                                </View>
                              </View>
                            ) : null}
                          </Fragment>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                ) : (

                  <View style={courseDet.contentWait}>
                     {
                      this.state.selectedIndex == 0?(
                        <Fragment>
                          {
                              this.state.selectedIndex == 0 && this.props.courseReducer.CourseDataError ?
                              <Text style={courseDet.main}>{this.props.courseReducer.CourseDataError}</Text> :
                              <Fragment>
                                <ActivityIndicator size="large" />
                                <Text style={courseDet.main}>Please wait</Text>
                              </Fragment>
                          }
                        </Fragment>
                      ):null
                    
                    }


                  </View>
                )}
                 {this.state.selectedIndex == 1 && this.props.courseReducer['CourseData']?.length > 0 ? (
                  <ScrollView style={courseDet.rowContainer3}>
                    {this.props.courseReducer['CourseData'].map((item, i) => (
                      <Fragment>
                        {item['assignments'].length > 0 ? (


                          <View style={courseDet.rowContainerLesson}>
                            <View style={courseDet.rowContainer2}>
                              <View style={courseDet.buttonCol}>
                                <Text style={courseDet.btnTxt}>
                                  {item.lessonName}
                                </Text>
                              </View>
                            </View>
                            {item['assignments'].map(assignmentsData => (
                              <Fragment>
                                {assignmentsData.pdffile ? (
                                  <View style={courseDet.rowContainerLessonList}>
                                    <View style={courseDet.sideIconsLeft}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate('PDFViewer', {
                                            data: assignmentsData,
                                            type: 'assignment',
                                          })
                                        }>
                                        <Image
                                          style={courseDet.logo2}
                                          source={require('../../../assets/images/Assignment.png')}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                    <View style={courseDet.Textt}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          navigation.navigate('PDFViewer', {
                                            data: assignmentsData,
                                            type: 'assignment',
                                          })
                                        }>
                                        <Text style={courseDet.main}>
                                          {assignmentsData.title}
                                        </Text>
                                      </TouchableOpacity>

                                    </View>
                                  </View>
                                ) : null}
                              </Fragment>
                            ))}
                          </View>
                        ) :
                          null
                        }
                      </Fragment>
                    ))}
                  </ScrollView>
                ) : (null
                  // <View style={courseDet.contentWait}>
                  //   {
                  //     this.props.courseReducer.CourseDataError ?
                  //       <Text style={courseDet.main}>{this.props.courseReducer.CourseDataError}</Text> :
                  //       <Fragment>
                  //         <ActivityIndicator size="large" />
                  //         <Text style={courseDet.main}>No Assignments</Text>
                  //       </Fragment>
                  //   }

                  // </View>
                )}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  courseReducer: state.courseReducer,
  favouritesReducer: state.favouritesReducer,
});
export default connect(
  mapStateToProps,
  { getCoursesByID, setVideoFavourite, contentFavourite },
)(CourseHome);

const courseDet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  noImage: {
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
  image: {
    flex: 1,
    // backgroundColor: 'red',
    // opacity: 0.8
    // paddingBottom: "12%",
    // resizeMode: 'cover',
    // justifyContent: 'center',
  },
  headerOp: {
    height: '70%',
    backgroundColor: 'rgba(0,0,0,0.6)',

    // opacity: 1
  },
  rowContainerOp: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 1,
    height: '30%',
  },
  header: {
    height: '20%',
    backgroundColor: 'black',
  },
  noimageheader: {
    height: '15%',
    backgroundColor: 'black',
  },
  tochble: {
    width: '100%',
    // flexDirection: 'row',
    // flex: 10,
    // backgroundColor: 'red',
  },
  content: {
    height: '80%',
    backgroundColor: 'black',
  },
  contentWait: {
    flex: 1,
    // height: '100%',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: 'black',

    height: '6%',
  },
  rowContainer2: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 3,
    // paddingVertical: 2,
    // height:'20%',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, .3)',
    // height: '5%',
  },
  sideIcons: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
    // backgroundColor:'red',
    flexDirection: 'row',
    alignContent: 'flex-end',

    padding: 2,
  },
  logo: {
    justifyContent: 'center',
    // width:'100%'
    width: 28,
    height: 28,
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

  rowContainerLesson: {
    width: '90%',
    paddingVertical: 15,
    marginHorizontal: 15,
  },
  rowContainerLessonList: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    // paddingVertical: 4,
    // backgroundColor:'red',
    borderColor: 'rgba(255, 255, 255, .3)',
  },
  rowContainer3: {
    width: '100%',
    height: '100%',
    marginBottom: 60,
  },
  textLeft: {
    flex: 9,
  },
  iconRight: {
    flex: 3,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  item: {
    // padding: 16,
    // borderBottomWidth: 1,
    // backgroundColor:'red',
    // borderColor: 'rgba(255, 255, 255, .3)',
  },
  Textt: {
    flex: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    // alignItems:'center',
    alignContent: 'center',
    // backgroundColor:'green',
    // padding: 7,
  },
  main: {
    color: '#ccc',
    // padding: 8,
    // paddingLeft:6,
    // // paddingTop:1,
    fontFamily: 'Avenir-Light',
    letterSpacing: 0,
    lineHeight: 16,
    fontSize: 15,
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
  link: {
    color: '#ccc',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.14,
    lineHeight: 16,
    fontSize: 14,
  },
  buttonCol: {
    flex: 3,
    textTransform: 'uppercase',
  },
  progressCol: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  btn: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 7,
    width: '30%',
  },
  btnTxt: {
    width: '100%',
    color: '#ccc',
    paddingVertical: 8,
    fontFamily: 'Avenir-Medium',
    letterSpacing: -0.14,
    lineHeight: 14,
    fontSize: 13,
    textTransform: 'uppercase',
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
    width: '68%',
    // margin: 10,
    // paddingLeft: 10,
    height: '100%',

    // marginHorizontal: 13,
    color: 'white',
    paddingVertical: 0,
    // backgroundColor: 'green',
  },
  tabStyle: {
    //custom styles
    borderColor: 'white',
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: 'white',
    // textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 8,
    marginEnd: 10,
  },
  firstTabStyle: {
    //custom styles
    textAlign: 'left',
    // width: '30%',
    // backgroundColor: 'black',

    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderRightWidth: 0,

    color: 'white',
  },
  lastTabStyle: {
    //custom styles
    // backgroundColor: 'red',

    textAlign: 'center',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    color: 'white',
  },
  tabTextStyle: {
    color: 'white',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.18,
    lineHeight: 17,
    fontSize: 15,
    // fontSize:10,
    //custom styles
  },
  activeTabStyle: {
    //custom styles
    color: 'white',
    borderColor: 'white',
    padding: 15,
    borderBottomWidth: 3,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',

    backgroundColor: 'transparent',
  },
  activeTabTextStyle: {
    //custom styles
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.18,
    lineHeight: 17,
    fontSize: 15,
    color: 'white',
  },
  inactiveTabTextStyle: {
    color: 'black',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.18,
    lineHeight: 17,
    fontSize: 15,
  },

  listcontainer: {
    width: '95%',
    // height: '9%',
    padding: 5,
    marginHorizontal: 10,
    // marginTop:2,
    marginBottom: 2,
  },
  list: {
    width: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flex: 1,
  },
});
