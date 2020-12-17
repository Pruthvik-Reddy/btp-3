import { StatusBar } from 'expo-status-bar';
import React,{useState, Component} from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import Navigator from './routes/homeStack';


export default function App() {


  return (
    <Navigator />
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

