import React,{useState, Component} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import storage from '@react-native-firebase/storage'; 
//import {firebase} from '../btp-proj-3/src/firebase';
import * as firebase from 'firebase';
import 'firebase/storage';
import {LinearGradient} from 'expo-linear-gradient';

firebase.initializeApp({
    apiKey: "AIzaSyCepAcNEj3IT9eXbntsFTz0mYDdxXG1EPY",
    authDomain: "btp-react-native.firebaseapp.com",
    projectId: "btp-react-native",
    storageBucket: "btp-react-native.appspot.com",
    messagingSenderId: "990017537512",
    appId: "1:990017537512:web:20387aa9789d87a2fe905d"

	});


export default function two({navigation}) {

  const [singleFile, setSingleFile] = useState('');
  const [singleImage, setSingleImage] = useState('');

  const pressHandler_21 = () => {
    //navigation.navigate('ReviewDetails');
    navigation.push('three');
  }


  async function func(){
  let res = await DocumentPicker.getDocumentAsync({
    type: "*/*",// all files
    copyToCacheDirectory:true
    // type: "image/*" // all images files
    // type: "audio/*" // all audio files
    // type: "application/*" // for pdf, doc and docx
    // type: "application/pdf" // .pdf
    // type: "application/msword" // .doc
    // type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
    // type: "vnd.ms-excel" // .xls
    // type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    // type: "text/csv" // .csv
  });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      setSingleFile(res);
  }



  uriToBlob2 = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase2 = (blob) => {

    return new Promise((resolve, reject)=>{

      var storageRef = firebase.storage().ref();

      storageRef.child('uploads/file.pdf').put(blob, {
        contentType: 'application/pdf'
      }).then((snapshot)=>{

        blob.close();

        resolve(snapshot);

      }).catch((error)=>{

        reject(error);

      });

    });


  }      


  handleOnPress2 = () => { 

    DocumentPicker.getDocumentAsync({ 
                                                                  mediaTypes: "*/*"
                                                                  }).then((result)=>{ 

                                                                              if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        setSingleFile(result);
      
        return uriToBlob2(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase2(blob);

    }).then((snapshot)=>{

      console.log("Txt File uploaded to Firebase");
   
    }).catch((error)=>{

      throw error;

    }); 

  }



  uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = (blob) => {

    return new Promise((resolve, reject)=>{

      var storageRef = firebase.storage().ref();

      storageRef.child('uploads/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{

        blob.close();

        resolve(snapshot);

      }).catch((error)=>{

        reject(error);

      });

    });


  }      


  handleOnPress = () => { 

                            ImagePicker.launchImageLibraryAsync({ 
                                                                  mediaTypes: "Images"
                                                                  }).then((result)=>{ 

                                                                              if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        setSingleImage(result);
      
        return uriToBlob(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase(blob);

    }).then((snapshot)=>{

      console.log("Image uploaded to Firebase");
   
    }).catch((error)=>{

      throw error;

    }); 

  }


 httpcall=()=>{

  return fetch('https://us-central1-btp-react-native.cloudfunctions.net/startvmfunction')
    .then((response) => console.log(JSON.stringify(response)))
    .catch((error) => {
      console.error(error);
    });


 }

  return (
    <View >
      <StatusBar  barStyle="light-content"/>
        <View >
            <Text >Welcome!</Text>
        </View>
        
      <Button  title="Upload File" onPress={handleOnPress2}>
        
      </Button>
      <Text>File Name: {singleFile.name ? singleFile.name : ''}</Text>
      <Text>Choose Photo</Text>
      <Button  title="Upload Image" onPress={handleOnPress}></Button>
      <Text>Status: {singleImage.uri ? "Image Uploaded" : ''}</Text>
      <Button  title="Upload to the cloud" onPress={httpcall}>
        </Button>
      <Text></Text>
      <Button  title="Get the Output" onPress={pressHandler_21}>
        </Button>
      
      
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});