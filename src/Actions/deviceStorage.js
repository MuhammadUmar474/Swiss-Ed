// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const deviceStorage = {
  // our AsyncStorage functions will go here :)
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('localStorageSave: ', key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async getItem(key) {
    try {
      const token = await AsyncStorage.getItem(key);
      console.log('device storege token: ', token);
      return token;
      // console.log("localStorageSave: ", key)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeItem(key) {
    try {
      const token = await AsyncStorage.removeItem(key);
      console.log('device storege token: remove', token);
      return token;
      // console.log("localStorageSave: ", key)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
};

export default deviceStorage;
