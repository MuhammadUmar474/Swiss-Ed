import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {connect} from 'react-redux';
import CourseHeader from '../Shared/CourseHeader';

import {WebView} from 'react-native-webview';
import {
  setDataForVideoPage,
  setVideoFavourite,
  setVideoFavouriteDetail,
} from '../../Actions/actions';

export class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      data: [],
      videosrc: null,
    };
  }

  componentDidMount() {}

  setFavouriteVideo = option => {
    this.props.setVideoFavouriteDetail(
      this.props.courseReducer.videoData,
      option,
    );
  };
  handleSingleIndexSelect = index => {
    this.setState(prevState => ({...prevState, selectedIndex: index}));
  };
  async UNSAFE_componentWillMount() {
    console.log(
      'in hereee course detail',

      this.props.route.params,
    );
    await this.setState({
      videosrc: this.props.route.params.data.cloudflare_uid,
    });
    const data = {
      i: this.props.route.params.outerIndex,
      j: this.props.route.params.innerindex,
      data: this.props.route.params.data,
    };
    this.props.route.params.data.i = this.props.route.params.outerIndex;
    this.props.route.params.data.j = this.props.route.params.innerIndex;

    this.props.setDataForVideoPage(this.props.route.params.data);
    console.log('in hereee course detail', this.state.videosrc);
  }
  UNSAFE_componentWillUnMount() {
    this.setState({videosrc: null});
  }
  render() {
    return (
      <SafeAreaView style={courseDet.container}>
        <View style={courseDet.container}>
          {/* <View style={courseDet.container}> */}
          {this.props.route.params.banner_image ? (
            <View>
              <ImageBackground
                source={{
                  uri: this.props.route.params.banner_image,
                }}
                imageStyle={{opacity: 1}}
                resizeMode="stretch"
                style={courseDet.image}>
                <View style={courseDet.header}>
                  <CourseHeader
                    navigation={this.props.navigation}
                    title={this.props.route.params.data.video_title}
                  />
                </View>
              </ImageBackground>
              <View style={courseDet.parentRowContainer}>
                <View style={courseDet.rowContainer}>
                  <View style={courseDet.textLeft}>
                    <Text style={courseDet.main}>
                      {this.props.courseReducer.videoData.video_description}
                    </Text>
                  </View>
                  <View style={courseDet.iconRight}>
                    {this.props.courseReducer.videoData.favourite == true ? (
                      <TouchableOpacity
                        onPress={() => this.setFavouriteVideo(2)}>
                        <Image
                          source={require('../../../assets/images/Heart1.png')}
                          style={{
                            width: 23,
                            height: 21,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.setFavouriteVideo(1)}>
                        <Image
                          source={require('../../../assets/images/Heart.png')}
                          style={{
                            width: 23,
                            height: 21,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/* <View style={courseDet.rowContainer}>
                  <View style={courseDet.buttonCol}>
                    <View style={courseDet.btn}>
                      <TouchableOpacity>
                        <Text style={courseDet.btnTxt}>Start</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={courseDet.progressCol} />
                </View> */}
                <View style={courseDet.rowContainer}>
                  <View style={courseDet.buttonCol}>
                    <SegmentedControlTab
                      values={['Introduction', 'Learning Instructions']}
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
              </View>
            </View>
          ) : (
            <View style={courseDet.image}>
              <View style={{height: '20%'}}>
                <CourseHeader
                  navigation={this.props.navigation}
                  title={this.props.route.params.data.video_title}
                />
              </View>

              <View style={courseDet.parentRowContainer}>
                <View style={courseDet.rowContainer}>
                  <View style={courseDet.textLeft}>
                  <Text style={courseDet.main}>
                      {this.props.courseReducer.videoData.video_description}
                    </Text>
                  </View>
                  <View style={courseDet.iconRight}>
                    {this.props.courseReducer.videoData.favourite == true ? (
                      <TouchableOpacity
                        onPress={() => this.setFavouriteVideo(2)}>
                        <Image
                          source={require('../../../assets/images/Heart1.png')}
                          style={{
                            width: 23,
                            height: 21,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.setFavouriteVideo(1)}>
                        <Image
                          source={require('../../../assets/images/Heart.png')}
                          style={{
                            width: 23,
                            height: 21,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {/* <View style={courseDet.rowContainer}>
                  <View style={courseDet.buttonCol}>
                    <View style={courseDet.btn}>
                      <TouchableOpacity>
                        <Text style={courseDet.btnTxt}>Start</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={courseDet.progressCol} />
                </View> */}
                <View style={courseDet.rowContainer}>
                  <View style={courseDet.buttonCol}>
                    <SegmentedControlTab
                      values={['Introduction', 'Learning Instructions']}
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
              </View>
            </View>
          )}
        </View>

        <View style={courseDet.content}>
          {this.state.videosrc ? (
            <View style={courseDet.containerVid}>
              {/* <Text style={{marginTop: 0,backgroundColor:'red'}}>hiii</Text> */}
              <WebView
                allowsFullscreenVideo={true}
                style={{marginTop: 0, backgroundColor: 'black'}}
                source={{
                  html: `
                <style>
                body{
                  padding:0px;
                  background-color:black;
                  // overflow:hidden;
                }
                </style>
                <div style="width:100%;height:100%;background-color:'black';padding:0px; overflow:hidden;">
                <iframe src="https://iframe.videodelivery.net/${
                  this.state.videosrc
                }" style="border: none;" height="720" width="100%" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
                
                </div>
 
              `,
                }}
              />
            </View>
          ) : (
            <View style={courseDet.containerVid}>
              <Text style={{marginTop: 0, backgroundColor: 'red'}}>
                no video
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  courseReducer: state.courseReducer,
});
export default connect(
  mapStateToProps,
  {setDataForVideoPage, setVideoFavourite, setVideoFavouriteDetail},
)(CourseDetail);

const courseDet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // flexDirection:'column'
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerVid: {
    flex: 1,
    marginTop: 10,
    // height: 290,
    backgroundColor: 'black',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  header: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    // opacity:0.6
  },
  image: {
    flex: 1,
  },
  content: {
    height: '50%',
    backgroundColor: 'black',

    // backgroundColor: 'rgba(18,11,3,0.9)',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 7,
  },
  parentRowContainer: {
    width: '100%',
    paddingLeft: 15,
    height: '60%',
    backgroundColor: 'black',
  },
  textLeft: {
    flex: 9,
  },
  iconRight: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  icon: {
    marginLeft: 20,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  main: {
    color: 'white',
    padding: 10,
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    letterSpacing: -0.18,
    lineHeight: 17,

    // fontWeight: '800',
    paddingLeft: 0,
  },
  buttonCol: {
    flex: 3,
  },
  btn: {
    backgroundColor: '#f1b300',
    padding: 10,
    borderRadius: 7,
    width: '30%',
  },
  btnTxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 22,
    textTransform: 'uppercase',
  },
  faith: {
    color: 'white',
    padding: 10,
    marginBottom: 10,
    paddingLeft: 0,
  },
  imageSize: {},
  tabsContainerStyle: {
    //custom styles
    width: '82%',
    color: 'white',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  tabStyle: {
    //custom styles
    borderColor: 'white',
    borderWidth: 0,

    backgroundColor: 'transparent',
    color: 'white',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'rgba(255, 255, 255, .3)',
  },
  firstTabStyle: {
    //custom styles
    borderRightWidth: 0,
    color: 'white',
    // backgroundColor: 'green',

    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  lastTabStyle: {
    //custom styles
    color: 'white',
    // width: '100%',
    // backgroundColor: 'red',

    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  tabTextStyle: {
    color: 'white',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.18,
    lineHeight: 15,
    fontSize: 15,
    //custom styles
  },
  activeTabStyle: {
    //custom styles
    color: 'white',
    borderColor: 'white',
    borderBottomWidth: 4,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: 'transparent',
  },

  activeTabTextStyle: {
    //custom styles
    color: 'white',
    // textDecorationLine:'underline',
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.18,
    lineHeight: 15,
    fontSize: 15,
  },
  inactiveTabTextStyle: {
    color: 'black',
    fontFamily: 'Avenir-Light',
    letterSpacing: -0.18,
    lineHeight: 15,
    fontSize: 15,
  },
});
