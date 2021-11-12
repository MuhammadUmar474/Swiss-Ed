import React, {Component} from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CourseCompleted extends Component {
    render()
    {
        const ParamsData = this.props.route.params

        return(

            <SafeAreaView style={styles.container}>

                <View style={{ alignSelf: 'flex-end' }}>
                    <Icon.Button 
                        name="ios-close-circle-outline"
                        size= {30}
                        backgroundColor= "transparent"
                        color="#ffffff"
                        onPress={this.crossButton}>
                    </Icon.Button>
                </View>

                <View>
                    <Text style={styles.boldText}>Congratulations on completing</Text>
                    <Text style={styles.boldText}>" {ParamsData.courseName} "</Text>
                    <Text style={[styles.boldText, {color: '#d5a400'}]}>You are awesome !</Text>
                </View>

                <View style={styles.imageView}>
                    <Image source= {require('../../../assets/images/celebrate.png')} />
                </View>

                <View style={ styles.divider }/>

                <View>
                    <Text style={styles.normalText}>Based on your learning we recommend the following courses to continue your learning journey</Text>
                </View>

                <ImageBackground
                    source={require('../../../assets/images/courseComplete-background.jpg')}
                    imageStyle={{opacity: 1}}
                    resizeMode= 'stretch'
                    style={{flex:1}}>

                    <View style={styles.otherCourses}>

                        <View>
                            <Image style={{borderRadius: 5}} source= {require('../../../assets/images/image3.jpg')} />
                            <View style={{alignSelf: "center"}}>
                                <TouchableOpacity>
                                    <View style={styles.btn}>
                                    <Text style={styles.btnTxt}>Start</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flex:0.2}}/>

                        <View>
                            <Image style={{borderRadius: 5}} source= {require('../../../assets/images/image2.jpg')} />
                            <View style={{alignSelf: "center"}}>
                                <TouchableOpacity>
                                    <View style={styles.btn}>
                                    <Text style={styles.btnTxt}>Start</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </ImageBackground>

            </SafeAreaView>

        );
    }

    crossButton = () => {
        this.props.navigation.goBack();
      }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    boldText: {
        fontSize: 22,
        fontFamily:'Avenir-Heavy',
        lineHeight:25,
        color: '#ffffff',
        marginTop: 5,
        textAlign: "center"
    },
    normalText: {
        fontSize: 15,
        fontFamily:'Avenir-Medium',
        lineHeight:18,
        color: '#ffffff',
        marginTop: 20,
        marginHorizontal: 20,
        textAlign: "center"
    },
    imageView: {
        alignItems: "center",
        marginVertical: 24
    },
    divider: {
        width: '90%',
        height: 1,
        opacity: 0.2,
        backgroundColor: '#ffffff',
        marginStart: 20,
    },
    otherCourses: {
        flexDirection: "row",
        flex: 2,
        justifyContent: "space-between",
        // backgroundColor: 'red',
        alignSelf: "center",
        marginTop: '8%',
    },
    btn: {
        backgroundColor: '#f1b300',
        padding: 10,
        borderRadius: 7,
        width: 90,
        position: "absolute",
        bottom: -25,
        // right:50,
        left:-45
    },
    btnTxt: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

})

