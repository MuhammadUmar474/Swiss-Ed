import React, { Component } from 'react'

import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Learn extends Component {
   
    constructor() {

        super();
        this.state = {

            coursePercentage : "70%",

            favorites: [
                {
                    key: 1,
                    url: require("../../../assets/images/download.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 2,
                    url: require("../../../assets/images/image2.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 3,
                    url: require("../../../assets/images/download.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 4,
                    url: require("../../../assets/images/image3.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 5,
                    url: require("../../../assets/images/image2.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 6,
                    url: require("../../../assets/images/download.jpg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },
                {
                    key: 7,
                    url: require("../../assets/download.jpeg"),
                    fav: true,
                    title: 'Essentials of Islamic Faith'
                },  
                // {
                //     key: 5,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 6,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 7,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },  {
                //     key: 5,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 6,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 7,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },  {
                //     key: 5,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 6,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 7,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },  {
                //     key: 5,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 6,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 7,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },  {
                //     key: 5,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 6,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },
                // {
                //     key: 7,
                //     url: require("../../assets/download.jpeg"),
                //     fav: true,
                //     title: 'Essentials of Islamic Faith'
                // },

            ]
        };
    }

    removeItem(key) {
        var array = this.state.favorites.filter(function(item) {
            return item.key !== key
          });
          this.setState({
            favorites: array
          })
        // alert(key)
        // this.setState(this.state.favorites.splice(key-1,1))
        // var array = [...this.state.favorites]; // make a separate copy of the array
        // var index = array.indexOf(e.target.value)
        // if (index !== -1) {
        //   array.splice(index, 1);
        //   this.setState({favorites: array});
        // }
        // this.setState(prevTodos => {
        //     return prevTodos.filter(this.state.favorites => favorites.key != key);
        //   });
      }
    render() {
        return (
            <View style={favorites.container}>
                   <Text style={favorites.title}>Coming Soon!</Text>
                {/* <ScrollView showsVerticalScrollIndicator={false}>

                    {this.state.favorites.map(item => (
                        <View style={favorites.listcontainer}>
                            <View style={favorites.list}>
                                <View style={favorites.sideImage}>
                                     
                                     <Image source={item.url}
                                    style={favorites.imageSize} />
                                </View>
                                <View style={favorites.Textt}>
                                    <Text style={favorites.title}>{item.title}</Text>
                                    <View style={favorites.progressBar}>
                                    <View style={[StyleSheet.absoluteFill], {borderTopLeftRadius: 7,borderBottomLeftRadius: 7,padding:3,flex:1,backgroundColor: "#006b2b", width:this.state.coursePercentage}}></View>
                                    </View>
                                    
                                <Text style={favorites.secondaryTitle}>{this.state.coursePercentage} COMPLETED</Text>
                                </View>
                                <View style={favorites.sideIcons}>
                                    <View style={{ alignSelf: 'flex-end', marginEnd: 15 }}>
                                        <TouchableOpacity >
                                        <Image style={favorites.logob} source={require('../../../assets/images/arrow.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                    ))}
                </ScrollView> */}

            </View>
        )
    }
}

const favorites = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop:20,
        paddingBottom: "8%"
    },
    imageSize: {
        height: 90,
        width: 65,
        borderRadius: 3,
        marginRight: 2,
        marginLeft: 2,

    },
    logob:{
        width: 7,
        height: 14,
        marginRight: 2,
        // marginTop: 10,
    },
    listcontainer: {
        width: '97%',
        // height: '9%',
        padding: 5,
        marginHorizontal: 10,
        // marginTop:2,
        marginBottom:2,
    },
    list: {
        width: '100%',
        borderBottomColor: 'rgba(255, 255, 255, .2)',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        paddingBottom:5,
        flex: 1,

    },
    sideImage :{
        flex: 3,
        justifyContent: 'center',
        // padding: 2,
    },

    sideIcons: {
        flex: 2,
        marginTop: 30
    },
    Textt: {
        flex: 8,
        paddingLeft:8,
        paddingTop: 7,

    },
    progressBar: {
        height: 10,
        width: '90%',
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 0.5,
        marginTop:20,
        borderRadius: 7
      },
    title: {
        fontSize: 17,
        marginTop: 10,
        fontFamily: 'Avenir-Heavy',
        lineHeight: 21,
        letterSpacing: -0.2,
       
        color: 'white',
        width: '100%',
        height:'100%',
        justifyContent:'center',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        // backgroundColor:'red'
    },
    secondaryTitle: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: 'Avenir-Light',
        lineHeight: 15,
        letterSpacing: -0.14,
        color: 'white',
        marginBottom: 10
    }

})
