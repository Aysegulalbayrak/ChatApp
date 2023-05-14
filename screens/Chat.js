import { useRoute } from "@react-navigation/core";
import React,{useEffect,useState} from "react";
import {View} from 'react-native';
import firebase from "firebase/compat/app";
import { GiftedChat } from "react-native-gifted-chat";

const Chat=()=>{
  const route=useRoute();
  const [messages,setMessages]=useState([]);
  const [userId,setUserId]=useState("");
  const [userName,setUserName]=useState("");

  useEffect(()=>{
    return firebase.auth().onAuthStateChanged(user=>{
      setUserId(user?.uid)
      setUserName(user?.displayName)
    })
  },[])
  useEffect(()=>{

    return firebase
    .firestore()
    .doc('chats/'+route.params.chatId)
    .onSnapshot((snapshot)=>{setMessages(snapshot.data()?.messages ?? []);
    });
  },[route.params.chatId]);


  const onSend=(m =[])=>{

    firebase.firestore()
    .doc('chats/'+route.params.chatId)
    .set(
      {
      messages: GiftedChat.append(messages,m)
      },
      {merge:true}
      );
  };
    return(
      <View style={{flex:1,backgroundColor:"white"}}>
      <GiftedChat 
      messages={messages.map(x=>({...x,createdAt:x.createdAt?.toDate(),}))}
      onSend={messages=>onSend(messages)}
      user={{
        _id:userId,
        name:userName,
      }}
      />
      </View>
    );
  };
  export default Chat;