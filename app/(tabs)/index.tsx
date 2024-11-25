import React, { useState } from 'react';
import { 
  Image, 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Alert 
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from '../../styles/loginScreenStyles';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  ForgotPassword: undefined;
  signup: undefined;
};

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'signup'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const googleImg = require('../../assets/images/google.png');
  const facebookImg = require('../../assets/images/facebook.png');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
        Alert.alert('Login Failed', data.message);
        console.log('Login Failed');
      }
    } catch (error) {
      Alert.alert('Cannot connect to Server');
    }
  };

  return (
    <LinearGradient
      colors={['#9dd1eb', '#6dd9e3']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.inner}>
          <View style={styles.imgCon}></View>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgetPWContainer}
              >
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
            <Image source={googleImg} style={styles.logoImg} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.otherAccount}>
            <Text style={styles.loginText}>Facebook Account</Text>
            <Image source={facebookImg} style={styles.logoImg} />
          </TouchableOpacity>

          <View style={styles.registerBox}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;
