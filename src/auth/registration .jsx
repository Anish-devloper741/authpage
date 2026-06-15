import React, { useState } from 'react';
import { 
  View, Text, ImageBackground, StyleSheet, 
  TextInput, TouchableOpacity, ActivityIndicator,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registration = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const API_URL = "http://10.158.161.118:3000/users/register";

  const register = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !number.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      let res = await axios.post(API_URL, {
        FullName: name,
        Email: email,
        Password: password,
        PhoneNumber: number
      }, { timeout: 5000 });

      if (res.status === 200 || res.status === 201) {
        // Save Name & Email for the Profile Page
        await AsyncStorage.setItem('userName', name);
        await AsyncStorage.setItem('userEmail', email);

        alert("Registration Successful");
        setName(""); setEmail(""); setPassword(""); setNumber("");
        navigation.replace("SignIn");
      }
    } catch (err) {
      console.log("ERROR:", err?.response || err.message);
      if (err.code === "ECONNABORTED") alert("Server taking too long. Try again.");
      else if (err.response) alert(err.response.data?.message || "Server error");
      else alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        resizeMode='cover'
        style={styles.background}
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFXMVsqeqstL0GCNxoVwhjfqmumLoghY4ywQ&s" }}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerBox}>
              <Text style={styles.heading}>Create Account</Text>
              <Text style={styles.subText}>Sign up to get started</Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Full Name' placeholderTextColor="#888" />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder='Email Address' placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput value={password} onChangeText={setPassword} secureTextEntry={isPasswordSecure} style={styles.input} placeholder='Password' placeholderTextColor="#888" />
            <TouchableOpacity onPress={() => setIsPasswordSecure(!isPasswordSecure)}>
              <Ionicons name={isPasswordSecure ? "eye-off-outline" : "eye-outline"} size={22} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput value={number} onChangeText={setNumber} style={styles.input} placeholder='Phone Number' placeholderTextColor="#888" keyboardType="numeric" />
          </View>


          <TouchableOpacity onPress={register} disabled={loading} activeOpacity={0.8} style={styles.buttonContainer}>
            <LinearGradient colors={['#4F2EE8', '#3B82F6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.button}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.loginText}> Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  background: { height: 250, width: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  safeArea: { flex: 1 },
  headerBox: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 25, paddingBottom: 40 },
  heading: { color: "#ffffff", fontSize: 34, fontWeight: "800", letterSpacing: 0.5 },
  subText: { color: "#E0E0E0", fontSize: 16, marginTop: 8, fontWeight: "400" },
  formContainer: {
    flex: 1, backgroundColor: "#121212", marginTop: -20, 
    borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 25, paddingTop: 30,
  },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E',
    borderRadius: 12, marginBottom: 16, paddingHorizontal: 15, borderWidth: 1, borderColor: '#2C2C2C', height: 55,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#ffffff", fontSize: 16 },
  buttonContainer: { shadowColor: "#3B82F6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5, marginBottom: 20 },
  button: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  bottomTextContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 },
  bottomText: { color: "#A0A0A0", fontSize: 15 },
  loginText: { color: "#3B82F6", fontSize: 15, fontWeight: "bold", marginLeft: 5 }
});