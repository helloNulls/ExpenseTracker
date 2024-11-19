import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from '../styles/LoginStyle';
import googleimg from '../Img/google.png'
import facebookImg from '../Img/facebook.png'
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5002/signin', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        console.log('Login Success');
        Alert.alert('Login Success', data.message);
      } else {
        Alert.alert('Login fails', data.message);
        console.log('Login fails');
      }
    } catch (error) {
      Alert.alert('Cannot connect to Server');
    }
  };

  return (
    <LinearGradient colors={['#9dd1eb', '#6dd9e3']}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }} style={styles.container}>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.inner}>
      <View style={styles.imgCon}>
      
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.innerContainer}>
        
        <Text style={styles.conText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.conText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
       <View style={styles.loginCon}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgetPWContainer}>
          <Text style={styles.forgetPW}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.pressButton} onPress={handleLogin}>
          <Text style={styles.login}>Login</Text> 
          <Feather name="log-in" size={28} color="black" />
        </TouchableOpacity> 
        </View>
   


    <View style={styles.otherLoginContainer}>
       <View style={styles.line} />
           <Text style={styles.signinwith}>Or Sign-In With</Text>
       <View style={styles.line} />
    </View>

        <TouchableOpacity style={styles.otherAccount}>       
        <Text style={styles.loginText}>Google Account</Text>
        <Image source={googleimg} style={styles.logoImg}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.otherAccount}>       
        <Text style={styles.loginText}>Facebook Account</Text>
        <Image source={facebookImg} style={styles.logoImg}></Image>
        </TouchableOpacity>


        <View style={styles.registerBox}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signin')}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
        </View>
       
      </ScrollView>
    </KeyboardAvoidingView>
    </LinearGradient>

  );
}

export default Login;
