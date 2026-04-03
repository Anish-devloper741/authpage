import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {Ionicons} from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  let[email,setemail]=useState("");
  let[password,setpassword]=useState("");


  let API_URL = "http://172.16.73.118:3000/users/login";
  let  login = async ()=>{
    if(email.trim() == "" || password.trim() == ""){
      alert("Fill the details");
    }

    try{
      let response =  await axios.post(API_URL,{
        Email : email,
        Password : password
      })

    await AsyncStorage.setItem('token', response.data.token);

// 👇 IMPORTANT
let token = await AsyncStorage.getItem('token');

if (token) {
   navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    });
} else {
  alert("User Not found");
}
      setemail("");
    setpassword("");

    
  }catch(err){
    console.log("ERROR:", err.response?.status, err.response?.data);
    alert(err.response.data.message)
  
}
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
    
     <TouchableOpacity onPress={()=>navigation.goBack()}><Ionicons size={30} name='arrow-back'/></TouchableOpacity>
    
     <View style={{flex:1,alignItems:"center"}}>
      <Text style={{fontSize:30,fontWeight:"bold"}}>Login</Text>
      <Text style={{margin:20}}>Enter your Existing Account</Text>
      <Ionicons size={50} name='lock-closed-sharp'/>
     </View>
     </View>
     <View style={styles.box2}>
      <TextInput style={styles.input} placeholderTextColor={"white"} placeholder='Enter Your Email' value={email} onChangeText={setemail} />
      <TextInput style={styles.input}   secureTextEntry={true}   placeholderTextColor={"white"} placeholder='Enter Your Password' value={password} onChangeText={setpassword} />
      <View style={{flex:1,alignItems:"center"}}>
      <TouchableOpacity onPress={login} style={{height:42,width:"80%",backgroundColor:"#3B82F6",alignItems:"center",justifyContent:"center",margin:10,borderRadius:20}}>
        <Text style={{color:"white"}}>Login</Text>
      </TouchableOpacity></View>

     </View>
    </View>
  )
}

let styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#0febb7cf"},
  box:{flex:1,padding:10},
  box2:{flex:1.7,backgroundColor:"#000",borderTopLeftRadius:20,borderTopRightRadius:20,paddingHorizontal:40,paddingVertical:100,flexDirection : "center"},
  input:{borderWidth:1,color:"white",borderColor:"#444",margin:10,borderRadius:6}
})

export default Login