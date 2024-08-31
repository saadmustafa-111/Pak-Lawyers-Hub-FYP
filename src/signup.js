import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { signup } from './Api/Auth'; // Import the signup function from your API file
import { LinearGradient } from 'expo-linear-gradient';

const Signup = () => {
  const navigation = useNavigation();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    profilePic:'',
    userType: '',
  });

  // Handle input changes
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // Handle image picker
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult?.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result?.cancelled) {
        setFormData({
          ...formData,
          profilePic: result,
        });
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
      alert('Failed to pick an image. Please try again.');
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSignup = async (data) => {
    const { email, password, confirmPassword, profilePic, name, contact, userType, ...rest } = data;

    if (!name) {
      Alert.alert('Invalid Name', 'Please enter your name.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!contact) {
      Alert.alert('Invalid Contact Information', 'Please enter your contact information.');
      return;
    }

    if (!userType) {
      Alert.alert('User Type Required', 'Please select if you are a Client or a Lawyer.');
      return;
    }

    try {
      const res = await signup({...data, profilePic: profilePic?.assets[0]?.uri });
      if (res) {
        console.log('Signup successful, token:', res);
        navigation.navigate('Login');
      }

    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
    }
  };

  return (
    <LinearGradient
      colors={['#f8fafc', '#e0f7fa']}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, paddingHorizontal: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 0 }}>
          <Image source={require('../assets/SaadLogo.png')} style={{ width: 150, height: 100 }} />
        </View>
    
        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', marginTop: 10, marginBottom: 20, color: '' }}>Create an account to get started</Text>
        
        <TextInput
          placeholder='Enter Your Name'
          placeholderTextColor="#666"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, borderColor: '#ccc', borderWidth: 1 }}
        />
        <TextInput
          placeholder='Enter Your Email Address'
          placeholderTextColor="#666"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, borderColor: '#ccc', borderWidth: 1 }}
        />
        <TextInput
          placeholder='Enter Your Password'
          placeholderTextColor="#666"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, borderColor: '#ccc', borderWidth: 1 }}
        />
        <TextInput
          placeholder='Confirm Your Password'
          placeholderTextColor="#666"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, borderColor: '#ccc', borderWidth: 1 }}
        />
        
        <TextInput
          placeholder='Enter Your Contact Information'
          placeholderTextColor="#666"
          value={formData.contact}
          onChangeText={(text) => handleInputChange('contact', text)}
          style={{ backgroundColor: '#f0f0f0', marginVertical: 10, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15, borderColor: '#ccc', borderWidth: 1 }}
        />
        
        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={pickImage}>
          <View style={{ backgroundColor: 'gray', width: 160, height: 48, borderRadius:15, justifyContent: 'center', alignItems: 'center' }}>
            {formData.profilePic ? (
              <Image source={{ uri: formData?.profilePic?.assets[0]?.uri }} style={{ width: 40, height: 40 }} />
            ) : (
              <Text style={{ color: 'white' }}>Upload Picture</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={formData.userType === 'Client'}
              onValueChange={() => {
                setFormData({ ...formData, userType: 'Client' });
              }}
              color={formData.userType === 'Client' ? '#2196F3' : undefined}
            />
            <Text style={{ marginLeft: 8, color: 'black' }}>I am Client</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={formData.userType === 'Lawyer'}
              onValueChange={() => {
                setFormData({ ...formData, userType: 'Lawyer' });
              }}
              color={formData.userType === 'Lawyer' ? '#2196F3' : undefined}
            />
            <Text style={{ marginLeft: 8, color: 'black' }}>I am Lawyer</Text>
          </View>
        </View>

        <Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={() => handleSignup(formData)}>
          <View style={{
            backgroundColor: '#03a9f4', // Changed to match Login button color
            width: 200, // Changed to match Login button width
            height: 50, // Changed to match Login button height
            borderRadius: 25, // Changed to match Login button borderRadius
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FontAwesome name="sign-in" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sign Up</Text>
          </View>
        </Pressable>

        <Pressable style={{ marginTop: 10 }} onPress={() => navigation.navigate('Login')}>
          <Text style={{ textAlign: 'center', color: '#3498db', fontWeight: 'bold' }}>Already have an account? Log in</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
};

export default Signup;
