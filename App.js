import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer,useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "./screens/ChatList";
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import { Provider } from "react-native-paper";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGofU0v-mgo7OUiiaetmaNHEUSjWEAcuE",
  authDomain: "chatapplication-33dd9.firebaseapp.com",
  projectId: "chatapplication-33dd9",
  storageBucket: "chatapplication-33dd9.appspot.com",
  messagingSenderId: "614673415255",
  appId: "1:614673415255:web:30ffbf9eb4545c070fb712"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

const Tabs =createBottomTabNavigator();

const TabsNavigator=()=>{
  const navigation =useNavigation();
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user =>{
    
    if(!user){
      navigation.navigate("Kayıt Ol");
    }
    });
  },[])
  return(
    <Tabs.Navigator screenOptions={({route})=>({
      tabBarIcon: ({ focused, color, size }) => {
        return <Ionicons name={route.name === "Chat Listesi" ? "chatbubble-ellipses-outline" : "settings"} color={color} size={size}/>
      }
    })}
  
      >
      <Tabs.Screen name="Chat Listesi" component={ChatList}/>
      <Tabs.Screen name="Ayarlar" component={Settings}/>
      
    </Tabs.Navigator>
  );
}

 const App=()=>{
  return(
    <NavigationContainer>
      <Provider>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabsNavigator} options={{headerShown:false}} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Giriş Yap" component={SignIn} options={{presentation:"fullScreenModal"}}/>
        <Stack.Screen name="Kayıt Ol" component={SignUp} options={{presentation:"fullScreenModal"}} />

      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
