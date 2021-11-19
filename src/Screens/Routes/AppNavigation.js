/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Tabs/Home';
import Profile from '../Tabs/Profile';
import Favorites from '../Tabs/Favorites';
import Learn from '../Tabs/Learn';
import Header from '../Shared/Header';
import CustomSidebarMenu from '../Shared/CustomSidebarMenu';
import LoginScreen from '../Auth/LoginScreen';
import LoginEmail from '../Auth/LoginEmail';
import LoginPassword from '../Auth/LoginPassword';
import CourseDetail from '../CourseModule/CourseDetail';
import SwissScholarship from '../Menu/SwissScholarship';
import LiveOfficeHours from '../Menu/LiveOfficeHours';
import RegisterScreen from '../Auth/RegisterScreen';
import CourseHome from '../CourseModule/CourseHome';
import {Image} from 'react-native';
import RegisterScreenOne from '../Auth/RegisterScreenOne';
import ForgotPwEmail from '../Auth/ForgotPwEmail';
import Help from '../Auth/Help';
import NewPassword from '../Auth/NewPassword';
import PasswordChangesLogin from '../Auth/PasswordChangesLogin';
import PDFViewer from '../CourseModule/PDFViewer';
import EditProfile from '../Account/EditProfile';
import FavouriteDetail from '../Tabs/FavouriteDetail';

// import CourseCompleted from '../CourseModule/CourseCompleted';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// stack navigators
const HomeStack = createStackNavigator();
const DownloadedStack = createStackNavigator();
const LearnStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const AuthStack = createStackNavigator();

export function AuthStackScreen({check}) {
  console.log('check: ', check);

  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={() => ({
          drawerLockMode: 'locked-closed',
        })}
        headerStyle={{
          backgroundColor: 'red',
          width: '100%',
          flex: 1,
        }}
      />
      <AuthStack.Screen name="LoginEmail" component={LoginEmail} />
      <AuthStack.Screen name="ForgotPwEmail" component={ForgotPwEmail} />

      <AuthStack.Screen name="LoginPassword" component={LoginPassword} />
      <AuthStack.Screen name="Help" component={Help} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />

      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="RegisterOne" component={RegisterScreenOne} />
      <AuthStack.Screen
        name="PasswordChangesLogin"
        component={PasswordChangesLogin}
      />
    </AuthStack.Navigator>
  );
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Header navigation={navigation} title="SWISS" />
          ),
        })}
        headerStyle={{
          width: '100%',
        }}
        // headerForceInset: { top: 'never', bottom: 'never' }
      />
      <HomeStack.Screen
        name="CourseDetail"
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
        component={CourseDetail}
      />
      <HomeStack.Screen
        name="CourseHome"
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
        component={CourseHome}
      />
      <HomeStack.Screen
        name="PDFViewer"
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
        component={PDFViewer}
      />

      {/* <HomeStack.Screen
        name="CourseCompleted"
        options={{
          headerShown: false
        }}
        component={CourseCompleted}
      /> */}
    </HomeStack.Navigator>
  );
}
function DownloadedStackScreen() {
  return (
    <DownloadedStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <DownloadedStack.Screen
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Header navigation={navigation} title="Profile" />
          ),
        })}
        headerStyle={{
          backgroundColor: 'red',
          width: '100%',
          flex: 1,
        }}
      />
      <DownloadedStack.Screen
        name="EditProfile"
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
        component={EditProfile}
      />
    </DownloadedStack.Navigator>
  );
}
function LearnStackScreen() {
  return (
    <LearnStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <LearnStack.Screen
        name="Home"
        component={Learn}
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Header navigation={navigation} title="Learn" />
          ),
        })}
        headerStyle={{
          backgroundColor: 'red',
          width: '100%',
          flex: 1,
        }}
      />
    </LearnStack.Navigator>
  );
}
function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <FavoriteStack.Screen
        name="Home"
        component={Favorites}
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Header navigation={navigation} title="Favourites" />
          ),
        })}
        headerStyle={{
          backgroundColor: 'red',
          width: '100%',
          flex: 1,
        }}
      />

      <FavoriteStack.Screen
        name="FavouriteDetail"
        component={FavouriteDetail}
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
      />

      <FavoriteStack.Screen
        name="PDFViewer"
        options={{
          headerStyle: {
            position: 'absolute',
            backgroundColor: 'red',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
          headerLeft: null,
          headerShown: false,
          headerTransparent: false,
        }}
        component={PDFViewer}
      />
    </FavoriteStack.Navigator>
  );
}

function TabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            return (
              <Image
                source={
                  focused
                    ? require('../../../assets/images/home1.png')
                    : require('../../../assets/images/home.png')
                }
                style={{
                  width: 20,
                  height: 21,
                  // borderRadius: 40 / 2,
                }}
              />
            );
            // iconName = focused ?  (<Image source={require('../../../assets/images/shape.svg')}   />)
            // : 'ios-home';
          } else if (route.name === 'Favourite') {
            return (
              <Image
                source={
                  focused
                    ? require('../../../assets/images/Heart1.png')
                    : require('../../../assets/images/Heart.png')
                }
                style={{
                  width: 23,
                  height: 21,
                  // borderRadius: 40 / 2,
                }}
              />
            );
            // iconName = focused ? 'ios-heart' : 'ios-heart-empty';
            // return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Learn') {
            return (
              <Image
                source={
                  focused
                    ? require('../../../assets/images/learn1.png')
                    : require('../../../assets/images/learn.png')
                }
                style={{
                  width: 34,
                  height: 23,
                  // borderRadius: 40 / 2,
                }}
              />
            );
            // iconName = focused ? 'ios-book' : 'ios-book';
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={
                  focused
                    ? require('../../../assets/images/profileselected.png')
                    : require('../../../assets/images/profile.png')
                }
                style={
                  focused
                    ? {
                        width: 22,
                        height: 21,
                      }
                    : {
                        width: 21,
                        height: 21,
                        // borderRadius: 40 / 2,
                      }
                }
              />
            );
            // iconName = focused ? 'ios-cloud-download' : 'ios-cloud-outline';
          }
          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        showIcon: true,
        inactiveTintColor: 'white',
        backgroundColor: 'transparent',
        // fontFamily: 'Avenir-Heavy',
        // tabBarTextFontFamily: 'Avenir-Medium',
        tabStyle: {
          // fontFamily: 'Avenir-Heavy',

          backgroundColor: 'rgba(0,0,0,0.8)',
        },
        labelStyle: {
          fontFamily: 'Avenir-Medium',
          // fontSize:10
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopColor: 'transparent',
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Favourite" component={FavoriteStackScreen} />
      {/* <Tabs.Screen name="Learn" component={LearnStackScreen} /> */}
      <Tabs.Screen name="Profile" component={DownloadedStackScreen} />
    </Tabs.Navigator>
  );
}

export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerStyle={{width: '100%'}}
      initialRouteName="Home"
      edgeWidth={0}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={TabsScreen} />
      <Drawer.Screen name="SwissScholarship" component={SwissScholarship} />
      <Drawer.Screen name="LiveOfficeHours" component={LiveOfficeHours} />
      <Drawer.Screen name="Auth" component={AuthStackScreen} />
    </Drawer.Navigator>
  );

  // return (
  //   <Drawer.Navigator initialRouteName="Home">
  //     <Drawer.Screen name="Home" component={TabsScreen} />
  //     <Drawer.Screen name="Login" component={AuthStackScreen} />
  //   </Drawer.Navigator>
  // );
}

//   export default  DrawerScreen;
