import React,{useEffect,useState} from "react";
import {Text,View,StyleSheet} from 'react-native';
import { Avatar, Button, Subheading, Title } from "react-native-paper";
import firebase from "firebase/compat/app";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings=()=>{
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      setName(user?.displayName ?? "")
      setEmail(user?.email ?? "")
    })
  },[]);
  AsyncStorage.setItem("username",name);
  
    return(
      <View style={styles.container}>
        <Avatar.Text label={name.split(" ").reduce((prev, current)=>prev+current[0],"")} />
        <Title>{name}</Title>
        <Subheading>{email}</Subheading>
        <Button onPress={()=>firebase.auth().signOut()}>Çıkış Yap</Button>

      </View>
    );
  };
  
  export default Settings;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
        alignItems:"center",
        backgroundColor:"white"
        
    },
 
    
    
  });