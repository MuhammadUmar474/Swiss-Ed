import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import PDFView from 'react-native-view-pdf';
import { COURSES_API_ENDPOINT_IMAGE } from '../../Actions/type';
import { WebView } from 'react-native-webview';

export default function PDFViewer({ route, props }) {
  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params, 'in heree');
    }, []),
  );

  const resourceType =  route.params['data'].pdffile;
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 0, flexDirection: 'row', marginTop: 10, backgroundColor: 'black' }}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              // resizeMode="center"
              style={styles.logob}
              source={require('../../../assets/images/backIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
          <Text numberOfLines={2} style={styles.main}>{route.params['data'].title}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {/* <Text style={styles.main}>title</Text> */}
        </View>
      </View>

      {/* Some Controls to change PDF resource */}
      {
        route.params.type == 'quiz' ?
          <WebView
            style={{ marginTop: 0, backgroundColor: 'white' }}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${route.params['data'].link}</body></html>`

            }}
          />

          : null
      }

      {
        route.params.type == 'assignment' ?
          <WebView
            style={{ marginTop: 0, backgroundColor: 'white' }}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${route.params['data'].pdffile}</body></html>`

            }}
          />
          : null
      }
      {
        route.params.type == 'content' ?
          ({
            ...Platform.OS === 'android' ?
              <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1 }}
                resource={resourceType.toString()}
                resourceType={'url'}
                onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                onError={() => console.log('Cannot render PDF', resourceType)}
              /> :
              <WebView
                style={{ marginTop: 0, backgroundColor: 'white' }}
                source={{
                  uri: resourceType

                }}
              />
          })

          : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  logob: {
    width: 26,
    height: 26,
    marginLeft: 10,
    // marginTop: 10,
    marginBottom: 10,
  },
  main: {
    color: '#ccc',
    // padding: 8,
    // paddingLeft:6,
    // // paddingTop:1,
    textTransform: 'capitalize',
    fontFamily: 'Avenir-Light',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: 16,
  },
});