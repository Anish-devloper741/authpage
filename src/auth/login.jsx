import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StatusBar, 
  ImageBackground 
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // UI State
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);
 
  // Form Data State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://10.158.161.118:3000/users/login";

  // ==========================================
  // HANDLERS
  // ==========================================
  const login = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all details");
      return; 
    }

    try {
      setLoading(true);
      
      let response = await axios.post(API_URL, {
        Email: email,
        Password: password,
      });

     await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', email.split('@')[0]); // Fallback name

      let token = await AsyncStorage.getItem('token');

      if (token) {
        setEmail("");
        setPassword("");
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        });
      } else {
        alert("User Not found");
      }
    } catch (err) {
      console.log("ERROR:", err.response?.status, err.response?.data);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />

      {/* --- Header Image & Overlay --- */}
      <ImageBackground
        resizeMode='cover'
        style={styles.background}
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFXMVsqeqstL0GCNxoVwhjfqmumLoghY4ywQ&s" }}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            
          
            
           
            <View style={styles.headerBox}>
              <Ionicons name="lock-closed" size={40} color="#3B82F6" style={{ marginBottom: 10 }} />
              <Text style={styles.heading}>Welcome Back</Text>
              <Text style={styles.subText}>Log in to your existing account</Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      {/* --- Main Form Section --- */}
      <View style={styles.formContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={[styles.inputWrapper, { marginBottom: 30 }]}>
            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry={isPasswordSecure}
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordSecure(!isPasswordSecure)}>
              <Ionicons 
                name={isPasswordSecure ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            onPress={login} 
            disabled={loading} 
            activeOpacity={0.8} 
            style={styles.buttonContainer}
          >
            <LinearGradient 
              colors={['#4F2EE8', '#3B82F6']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Bottom Link to Registration */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}> Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

// ==========================================
// STYLESHEET
// ==========================================
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212',
  },
  background: { 
    height: 300, 
    width: '100%',
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  safeArea: { 
    flex: 1,
  },
  backButton: {
    position: 'absolute', 
    top: Platform.OS === 'ios' ? 10 : 40, 
    left: 20, 
    zIndex: 10,
    height: 40, 
    width: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 20,
  },
  headerBox: { 
    flex: 1, 
    justifyContent: "flex-end", 
    alignItems: "center", 
    paddingHorizontal: 25, 
    paddingBottom: 50,
  },
  heading: { 
    color: "#ffffff", 
    fontSize: 34, 
    fontWeight: "800", 
    letterSpacing: 0.5,
  },
  subText: { 
    color: "#E0E0E0", 
    fontSize: 16, 
    marginTop: 8, 
    fontWeight: "400",
  },
  formContainer: {
    flex: 1.5, 
    backgroundColor: "#121212", 
    marginTop: -25, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 25, 
    paddingTop: 40,
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1E1E1E',
    borderRadius: 12, 
    marginBottom: 16, 
    paddingHorizontal: 15, 
    borderWidth: 1, 
    borderColor: '#2C2C2C', 
    height: 55,
  },
  inputIcon: { 
    marginRight: 10,
  },
  input: { 
    flex: 1, 
    color: "#ffffff", 
    fontSize: 16,
  },
  buttonContainer: { 
    shadowColor: "#3B82F6", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 5, 
    marginBottom: 20,
  },
  button: { 
    height: 55, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    letterSpacing: 0.5,
  },
  bottomTextContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 15,
  },
  bottomText: { 
    color: "#A0A0A0", 
    fontSize: 15,
  },
  registerText: { 
    color: "#3B82F6", 
    fontSize: 15, 
    fontWeight: "bold", 
    marginLeft: 5,
  }
});