import React,{ Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Image} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import storage from '@react-native-firebase/storage'; 
//import {firebase} from '../btp-proj-3/src/firebase';
import * as firebase from 'firebase';
import 'firebase/storage';
import {LinearGradient} from 'expo-linear-gradient';



    export default function three({navigation}) {

        const [singleImage_output, setSingleImage] = useState('');



        useEffect(() => {
            let imageRef = firebase.storage().ref('uploads/outputs/000000_front.jpg' );
                imageRef
                .getDownloadURL()
    .then((url) => {
        setSingleImage(url);
        console.log(imageRef);
        console.log(imageRef.bucket);
        console.log(imageRef.path_); 
        console.log(url);  
    })
  .catch((e) => console.log('getting downloadURL of image error => ', e));
            
        })
         
        
      return (
        <View style={ styles.container }>
            <Text>
                Third Screen!
            </Text>
            < Image source={{uri:singleImage_output}}   style={{  width: '100%', height: '100%' }} />
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
    
    