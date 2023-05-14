import React, {useState} from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Button, TextInput ,Subheading} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import firebase from 'firebase/compat/app';

const SignIn = () => {
    const navigation =useNavigation();
 
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("");
    
    const signIn = async () =>{
        setIsLoading(true);
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password);
            navigation.navigate("Chat Listesi");
            
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            
            
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Ionicons name="chatbubbles-outline" size={70} color="#0047AB"></Ionicons>
                    <Text style={{ fontSize: 30, color: "#0047AB" }}>Chat App</Text>
                </View>
                {!!error && (<Subheading style={styles.hata}>{error}</Subheading>)}
                <TextInput style={styles.input} label="Email" value={email} onChangeText={(txt)=>setEmail(txt)}  keyboardType="email-address"/>
                <TextInput style={styles.input} label="Şifre" value={password} onChangeText={(txt)=>setPassword(txt)} secureTextEntry/>
                <Button style={{ marginTop: 20, width: 100, height: 50, marginLeft: 100 }} buttonColor="#FFC0CB" textColor="white" onPress={()=>signIn()} loading={isLoading}>Giriş Yap</Button>
                <Text style={{ marginTop: 10,  marginLeft: 80 , color:"#FFC0CB"}} onPress={() => navigation.navigate('Kayıt Ol')}>
                    Hesabın yok mu? Kayıt ol
                </Text>
            </View>
        </View>
    );
};
export default SignIn;

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 80,
    },
    icon: {
        marginLeft: 110,
        justifyContent: "center",
        marginBottom: 25,
    },
    input: {
        margin: 6,
        backgroundColor: "#FFF"
    },
    hata:{
        color:"red",
        textAlign:"center",
        marginBottom:16,
    }
});