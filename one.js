import { StatusBar } from 'expo-status-bar';
import React,{useState, Component} from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';


export default function one({navigation}) {


    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('two');
      }


  return (
    <View style={ styles.container }>
        <ImageBackground source={require('./assets/btp1.jpg')} style={styles.backgroundImage} >
          <View style={ styles.loginForm }>
            <Text style={ styles.text }>Detect Objects</Text>
            <Button title='NEXT' onPress={pressHandler} />
          </View>
        </ImageBackground>
      </View>
  );


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  },

  loginForm: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#E9E6E5",
  }
});

