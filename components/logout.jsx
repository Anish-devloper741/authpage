import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";


export function Logout({navigation}){

  useEffect(()=>{
    let logoutuser = async ()=>{
      try{
      await AsyncStorage.removeItem("token");
      navigation.reset({
        index : 0,
        routes : [{name:"Register"}]
      })
      }catch(err){
        console.log(err);
      }
    }
    logoutuser();
  },[])

}