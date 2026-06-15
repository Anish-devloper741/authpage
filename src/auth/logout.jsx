import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ... existing imports

export function Logout({ navigation }) {
  const logoutUser = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "userName", "userEmail", "profileImage"]);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn', params: { screen: 'Login' } }], 
      });
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});