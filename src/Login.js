import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { login } from './Api/Auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/Slice/authSlice';
import { useNavigation } from '@react-navigation/native';
import { getLawyerProfileStatus } from './Api/Auth'; // Assuming you have a function for API calls

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res) {
        const { token, user } = res;
        dispatch(loginSuccess({ token, user }));

        console.log("email:", email);

        // Check if lawyer profile exists
        const profileStatusRes = await getLawyerProfileStatus(email);
        console.log("loginnnnn:", profileStatusRes)
        if (profileStatusRes.profileExists) {
          navigation.navigate('Dashboard'); // Navigate to dashboard if profile exists
        } else {
          navigation.navigate('LModule'); // Navigate to profile creation module if profile does not exist
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error logging in');
    }
  };

  return (
    <LinearGradient colors={['#f8fafc', '#e0f7fa']} style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginTop: 40, marginBottom: 60, alignItems: 'center' }}>
          <Image source={require('../assets/SaadLogo.png')} style={{ width: 150, height: 100 }} />
        </View>
        <Text style={styles.title}>Get access to app</Text>
        <TextInput
          placeholder='Enter Your Email Address'
          placeholderTextColor="#666"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Please Enter a Correct Password'
          placeholderTextColor="#666"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={handleLogin}>
          <View style={styles.loginButton}>
            <AntDesign name="login" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
          <Text style={styles.signupText}>Don't Have an Account? Sign up</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#03a9f4',
    width: 200,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
