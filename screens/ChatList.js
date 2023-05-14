import React,{useState,useEffect} from "react";
import {View,StyleSheet} from 'react-native';
import {List,Avatar,Divider,FAB,Portal,Dialog, TextInput, Button} from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/core";


const ChatList=()=>{
const [isDialogVisible,setIsDialogVisible]=useState(false);
const [email,setEmail]=useState("");
const [userEmail,setUserEmail]=useState("");


useEffect(()=>{
  firebase.auth().onAuthStateChanged(user=>{
    setEmail(user?.email ?? "");
  });
},[]);
const [isLoading, setIsLoading]=useState(false);
const navigation =useNavigation();

const createChat = async () => {
  if(!email || !userEmail){
    return;
  }
  setIsLoading(true);
  const response = await firebase.firestore().collection('chats').add({
    users: [email,userEmail]
  });
  setIsLoading(false);
  setIsDialogVisible(false);
  navigation.navigate("Chat",{chatId:response.id});
};
const [chats,setChats]=useState([]);
useEffect(() => {
  return firebase
  .firestore()
  .collection('chats')
  .where('users','array-contains',email)
  .onSnapshot((querySnapshot) => { 
    setChats(querySnapshot.docs);
  })
},[email]);

    return(
      <View style={styles.container}>
        {chats.map(chat =>(
          <React.Fragment>
            <List.Item style={styles.List} title={chat.data().users.find((x)=>x !== email)}description={(chat.data().messages ?? [])[0]?.text ?? undefined} left={()=><Avatar.Text label={chat.data().users.find((x)=>x !== email).split(" ").reduce((prev, current)=>prev+current[0],"")} size={56}/>}
            onPress={()=>navigation.navigate("Chat",{chatId: chat.id})}/>
            <Divider inset />
          </React.Fragment>
        ))}
        
        <Portal>
            <Dialog style={styles.dialog} visible={isDialogVisible} onDismiss={()=>setIsDialogVisible(false)}>
                <Dialog.Title>Yeni Mesaj</Dialog.Title>
                <Dialog.Content>
                    <TextInput style={{backgroundColor:"white"}} label="Email adresini giriniz " value={userEmail} onChangeText={(txt)=>setUserEmail(txt)} keyboardType="email-address"/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button  onPress={()=> setIsDialogVisible(false)} >İptal</Button>
                        <Button onPress={()=>createChat()} loading={isLoading}>Oluştur</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
        <FAB style={styles.Fab} icon="pencil-outline" color="white" onPress={()=>setIsDialogVisible(true)}/>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    List: {
      marginLeft: 15,
    },
    Fab :{
        position:"absolute",
        bottom:16,
        right:16,
        borderRadius:100,
        backgroundColor:"#4a804d"
    },
    dialog:{
      backgroundColor:"white"
    }
    
    
  });

  export default ChatList;
