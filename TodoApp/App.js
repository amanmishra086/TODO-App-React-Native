import React from 'react';

import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Provider} from 'react-redux';

import {store} from './redux/store';
import RNVisionCamera from './RNVisionCamera';
import ToDoContainer from './ToDoContainer';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import DynamsoftScanner from './DynamsoftScanner';
import {CameraPage} from './CameraPage';

import Photo from './photoCapture/Photo';
import MediaPage from './photoCapture/MediaPage';
import Video from './VideoCapture/Video';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const FistScreen = ({navigation}) => {

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
       
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{backgroundColor: '#fff000', margin: 30, width: '80%'}}
        onPress={() => {
          //navigation.navigate('RNVisionCamera');
          createTwoButtonAlert();
        }}>
        <Text style={{fontSize: 25, padding: 15, alignSelf: 'center'}}>
          Scanner
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#fff000', marginBottom: 30, width: '80%'}}
        onPress={() => {
          navigation.navigate('DynasoftScanner');
        }}>
        <Text style={{fontSize: 25, padding: 15, alignSelf: 'center'}}>
          click photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#fff000', width: '80%'}}
        onPress={() => {
          navigation.navigate('VideoPage');
        }}>
        <Text style={{fontSize: 25, padding: 15, alignSelf: 'center'}}>
          record video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={FistScreen} />
          <Stack.Screen name="RNVisionCamera" component={RNVisionCamera} />
          <Stack.Screen name="DynasoftScanner" component={Photo} />
          <Stack.Screen name="MediaPage" component={MediaPage} />
          <Stack.Screen name="VideoPage" component={Video} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textShadowColor: 'white',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});

export default App;
