import React, {useState} from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Button, TextInput ,Subheading} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import firebase from 'firebase/compat/app';

const SignUp = () => {
    const navigation =useNavigation();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [repass,setRepass]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("");
    
    const createAccount = async () =>{
        setIsLoading(true);
        try {
            if(password==repass){
            const response = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await response.user.updateProfile({displayName:name});
            navigation.navigate("Giriş Yap");
            }
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
                <TextInput style={styles.input} label="İsim" value={name} onChangeText={(txt)=>setName(txt)} />
                <TextInput style={styles.input} label="Email" value={email} onChangeText={(txt)=>setEmail(txt)}  keyboardType="email-address"/>
                <TextInput style={styles.input} label="Şifre" value={password} onChangeText={(txt)=>setPassword(txt)} secureTextEntry/>
                <TextInput style={styles.input} label="Şifre(Tekrar)" value={repass} onChangeText={(txt)=>setRepass(txt)} secureTextEntry/>
                <Button style={{ marginTop: 20, width: 100, height: 50, marginLeft: 100 }} buttonColor="#7b68ee" textColor="white" onPress={()=>createAccount()} loading={isLoading}>Kayıt Ol</Button>
                <Text style={{ marginTop: 10,  marginLeft: 60 , color:"#6959cd"}} onPress={() => navigation.navigate('Giriş Yap')}>
                    Zaten hesabın var mı? Giriş Yap
                </Text>
            </View>
        </View>
    );
};
export default SignUp;

const styles = StyleSheet.create({
    container: {

        margin: 30,
        marginTop: 50,

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