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
import {postService} from '../../Actions/apiServices';
import Ionicons from 'react-native-vector-icons/Ionicons';

import reducer from '../../Reducers/reducers';
import CourseHeader from '../Shared/CourseHeader';

import {WebView} from 'react-native-webview';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {COURSES_API_ENDPOINT_IMAGE} from '../../Actions/type';

export class FavouriteDetail extends Component {
  videoPlayer;
  image = {uri: '../../../assets/images/download.jpg'};
  constructor(props) {
    super(props);
    // console.log(props, 'props yahan');

    // console.log(props.route.params, 'yahan');
    this.state = {
      //   selectedIndex: 0,
      data: [],
      videosrc: null,

      //video states
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
  }

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    // alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({screenType: 'cover'});
    else this.setState({screenType: 'content'});
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({currentTime});

  // static getDerivedStateFromProps(nextProps, prevState) {}

  componentDidMount() {}

  renderItem = ({item}) => (
    <View style={favouriteDet.item}>
      <Text style={favouriteDet.faith}>{item.name}</Text>
    </View>
  );

  handleSingleIndexSelect = index => {
    // this.props.getCoursesByID(this.props.route.params._id);
    //handle tab selection for single Tab Selection SegmentedControlTab
    // this.setState(prevState => ({...prevState, selectedIndex: index}));
  };
  async UNSAFE_componentWillMount() {
    console.log(
      'in hereee favourite detail',
      this.props.route.params.data.cloudflare_preview,
      this.props.route.params.banner_image,
      this.props.route.params,
    );
    await this.setState({
      videosrc: this.props.route.params.data.cloudflare_uid,
    });
    // this.setState({videosrc: 'https://youtu.be/U4gxLwibkvg'});
    console.log('in hereee favourite detail', this.state.videosrc);
  }
  UNSAFE_componentWillUnMount() {
    // alert('hi')
    this.setState({videosrc: null});
  }
  render() {
    // const {data} = this.props.data;

    return (
      <SafeAreaView style={favouriteDet.container}>
        <View style={favouriteDet.container}>
          {/* <View style={favouriteDet.container}> */}
          <View style={favouriteDet.image}>
            <View style={{height: '30%'}}>
              <CourseHeader
                navigation={this.props.navigation}
                title={this.props.route.params.data.video_title}
              />
            </View>
          </View>
        </View>

        <View style={favouriteDet.content}>
          {this.state.videosrc ? (
            <View style={favouriteDet.containerVid}>
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

                  // '<stream src="c5d09ad32f724368bb68ef8ccb0a58a3"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.videodelivery.net/embed/r4xu.fla9.latest.js?video=c5d09ad32f724368bb68ef8ccb0a58a3"></script>'
                }}
              />
            </View>
          ) : (
            <View style={favouriteDet.containerVid}>
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

export default // connect(
//   mapStateToProps,
//   mapDispatchToProps,
FavouriteDetail;

const favouriteDet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // flexDirection:'column'
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
    height: '70%',
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
    height: '70%',
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
});
