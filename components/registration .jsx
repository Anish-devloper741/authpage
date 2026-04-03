import { 
  View, Text, ImageBackground, StyleSheet, 
  TextInput, TouchableOpacity, ActivityIndicator
} from 'react-native';

import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Registration = ({ navigation }) => {

  let [checked, setChecked] = useState(false);
  let [showpassword, setshowpassword] = useState(true);
  let [loading, setloading] = useState(false);

  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [number, setnumber] = useState("");

  let API_URL = "http://172.16.73.118:3000/users/register";

  let register = async () => {

    if (!name.trim() || !email.trim() || !password.trim() || !number.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setloading(true);

      let res = await axios.post(API_URL, {
        FullName: name,
        Email: email,
        Password: password,
        PhoneNumber: number
      }, {
        timeout: 5000
      });

      if (res.status === 200 || res.status === 201) {
        alert("Registration Successful");

        setname("");
        setemail("");
        setpassword("");
        setnumber("");

        navigation.replace("Login");
      }

    } catch (err) {
      console.log("ERROR:", err?.response || err.message);

      if (err.code === "ECONNABORTED") {
        alert("Server taking too long. Try again.");
      } else if (err.response) {
        alert(err.response.data?.message || "Server error");
      } else {
        alert("Network error");
      }

    } finally {
      setloading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>

      {/* Top Image */}
      <ImageBackground
        resizeMode='cover'
        style={styles.background}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFXMVsqeqstL0GCNxoVwhjfqmumLoghY4ywQ&s"
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.box}>
            <Text style={styles.heading}>
              Registration into your Account
            </Text>
            <Text style={styles.subText}>
              Please fill in the details to create your account
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Form */}
      <View style={styles.formContainer}>

        <TextInput
          value={name}
          onChangeText={setname}
          style={styles.input}
          placeholder='Enter Your Fullname'
          placeholderTextColor={"#ccc"}
        />

        <TextInput
          value={email}
          onChangeText={setemail}
          style={styles.input}
          placeholder='Enter Your Email'
          placeholderTextColor={"#ccc"}
          keyboardType="email-address"
        />

        {/* Password */}
        <View style={{ position: "relative" }}>
          <TextInput
            value={password}
            onChangeText={setpassword}
            secureTextEntry={showpassword}
            style={styles.input}
            placeholder='Enter Your Password'
            placeholderTextColor={"#ccc"}
          />

          <TouchableOpacity
            onPress={() => setshowpassword(!showpassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showpassword ? "eye-off" : "eye"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
              setshowpassword(!checked); // FIXED LOGIC
            }}
            style={[
              styles.checkbox,
              checked && styles.checkboxActive
            ]}
          >
            {checked && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </TouchableOpacity>

          <Text style={styles.checkboxText}>Show Password</Text>
        </View>

        <TextInput
          value={number}
          onChangeText={setnumber}
          style={styles.input}
          placeholder='Enter Your Phonenumber'
          placeholderTextColor={"#ccc"}
          keyboardType="numeric"
        />

        {/* Button */}
        <TouchableOpacity 
          onPress={register} 
          disabled={loading} 
          style={{ margin: 10 }}
        >
          <LinearGradient
            colors={['#4F2EE8', '#3B82F6']}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Register
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Login */}
        <View style={styles.bottomText}>
          <Text style={{ color: "#fff" }}>I have account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  box: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  heading: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold"
  },

  subText: {
    color: "#ddd",
    textAlign: "center",
    marginTop: 10
  },

  formContainer: {
    flex: 1.5,
    backgroundColor: "#000",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#444",
    margin: 10,
    color: "#fff",
    borderRadius: 8,
    padding: 12
  },

  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 22
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5
  },

  checkbox: {
    height: 22,
    width: 22,
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },

  checkboxText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },

  button: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },

  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },

  loginText: {
    color: "#3B82F6",
    marginLeft: 5
  }

});