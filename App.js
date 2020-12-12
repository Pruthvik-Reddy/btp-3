import { StatusBar } from 'expo-status-bar';
import React,{useState, Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import storage from '@react-native-firebase/storage'; 
//import {firebase} from '../btp-proj-3/src/firebase';
import * as firebase from 'firebase';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyCepAcNEj3IT9eXbntsFTz0mYDdxXG1EPY",
    authDomain: "btp-react-native.firebaseapp.com",
    projectId: "btp-react-native",
    storageBucket: "btp-react-native.appspot.com",
    messagingSenderId: "990017537512",
    appId: "1:990017537512:web:20387aa9789d87a2fe905d"

	});


export default function App() {

  const [singleFile, setSingleFile] = useState('');
  const [singleImage, setSingleImage] = useState('');


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

      console.log("File uploaded");
   
    }).catch((error)=>{

      throw error;

    }); 

  }


/*

  async function handleOnPress(){
  console.log(" Image Button Pressed");
  ImagePicker.launchImageLibraryAsync(
    {
      mediaTypes:"Images"
    }
  ).then(async (result)=>{
    if(!result.cancelled){
      const {image_height,image_width}=result;
      setSingleImage(result);
      let image_uri=result.uri;
      
      console.log(result.uri);
      console.log(image_uri);
      let uploadUrl = await uploadImageAsync(image_uri);
      console.log(uploadUrl);
      console.log(result);
      


    }
  })

}
async function uploadImageAsync(uri) {
  

  
  
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			resolve(xhr.response);
    };
    console.log(uri);
		xhr.onerror = function(e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
    xhr.responseType = 'blob';
    console.log("Working");
		xhr.open('GET', uri, true);
		xhr.send(null);
  });
  console.log("Working too");
  
  const ref = firebase
		.storage()
		.ref('/');
	const snapshot = await ref.put(blob);

	blob.close();

	return await snapshot.ref.getDownloadURL();
  
}
*/


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!!</Text>
      <Button title="Click Me" onPress={func}></Button>
      <Text>File Name: {singleFile.name ? singleFile.name : ''}</Text>
      <Text>Choose Photo</Text>
      <Button title="Upload Image" onPress={handleOnPress}></Button>
      <Text>Status: {singleImage.uri ? "Image Uploaded" : ''}</Text>
      
      <StatusBar style="auto" />
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});