import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, Pressable, Linking } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MyProfile from './component/MyProfile';
import { Ionicons, FontAwesome, MaterialIcons, Fontisto } from '@expo/vector-icons';
const API_URL = 'http://192.168.1.10:8000/api/lawyers'; // Replace with your local IP address
const ClientModule = ({ route, navigation }) => {
  const user = useSelector((state) => state.auth?.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(API_URL, {
        params: { search: query }
      });
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const handleCategorySearch = async (category) => {
    try {
      const response = await axios.get(API_URL, {
        params: { category: category }
      });
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers by category:', error);
    }
  };

  const categories = [
    { name: 'Criminal Defense', value: 'Criminal Law', icon: require('../assets/Lawyer1.jpg') },
    { name: 'Civil Attorneys', value: 'Civil Law', icon: require('../assets/Lawyer2.jpg') },
    { name: 'Banking Experts', value: 'Banking Law', icon: require('../assets/Lawyer3.jpg') },
    { name: 'Family Law Specialists', value: 'Family Law', icon: require('../assets/Lawyer4.jpg') },
    { name: 'Corporate Advisors', value: 'Corporate Law', icon: require('../assets/Lawyer6.jpg') },
    { name: 'Labor Law Expert', value: 'Labor Law', icon: require('../assets/Lawyer5.jpg') },
  ];

  const openWhatsAppChat = (phoneNumber) => {
    const url = `https://wa.me/${phoneNumber}`;
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure WhatsApp is installed on your device');
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', paddingHorizontal: 16, paddingVertical: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Welcome, {user?.name}!</Text>
        <Pressable 
          style={{ 
            borderRadius: 50, 
            padding: 8, 
            backgroundColor: '#fff', 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 2 
          }} 
          onPress={toggleProfile}
        >
          <Ionicons name="person-circle-outline" size={40} color="#333" />
        </Pressable>
      </View>
      {showProfile && <MyProfile />}

      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
        borderRadius: 25, 
        paddingHorizontal: 16, 
        paddingVertical: 8, 
        marginBottom: 24, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 2 
      }}>
        <TextInput
          style={{ flex: 1, fontSize: 18, paddingHorizontal: 16 }}
          placeholder="Enter Lawyer's Name or Specialty"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable 
          style={{ 
            borderRadius: 25, 
            paddingHorizontal: 16, 
            paddingVertical: 8, 
            marginLeft: 8, 
            backgroundColor: '#1e40af', 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 4, 
            elevation: 2 
          }} 
          onPress={() => handleSearch(searchQuery)}
        >
          <FontAwesome name="search" size={24} color="#fff" />
        </Pressable>
      </View>

      <Text style={{ fontSize: 20, marginBottom: 16, fontWeight: 'bold', color: '#333' }}>Categories</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: 8, 
              padding: 16, 
              marginBottom: 16, 
              alignItems: 'center', 
              justifyContent: 'center', 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 4, 
              elevation: 2, 
              width: '45%' 
            }}
            onPress={() => handleCategorySearch(category.value)}
          >
            <Image source={category.icon} style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }} resizeMode="cover" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{category.name}</Text>
          </Pressable>
        ))}
      </View>

      {lawyers.map((lawyer, index) => {
        console.log("Lawyerrrrrrrrrr:", lawyer);
        return (
        <View key={index} style={{ 
          backgroundColor: '#fff', 
          borderRadius: 8, 
          padding: 16, 
          marginBottom: 16, 
          borderWidth: 1, 
          borderColor: '#ddd', 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 4, 
          elevation: 2 
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Image source={{ uri: user.profilePic || 'https://via.placeholder.com/64' }} style={{ width: 64, height: 64, borderRadius: 32, marginRight: 12 }} />
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{lawyer.name}</Text>
              <Text>{lawyer.email}</Text>
              <Text>{lawyer.contact}</Text>
            </View>
          </View>
          <Text style={{ marginBottom: 8, color: '#555' }}><Text style={{ fontWeight: 'bold' }}>Address:</Text> {lawyer.address}</Text>
          <Text style={{ marginBottom: 8, color: '#555' }}><Text style={{ fontWeight: 'bold' }}>Experience:</Text> {lawyer.experience} years</Text>
          <Text style={{ marginBottom: 8, color: '#555' }}><Text style={{ fontWeight: 'bold' }}>CNIC:</Text> {lawyer.cnic}</Text>
          <Text style={{ marginBottom: 8, color: '#555' }}><Text style={{ fontWeight: 'bold' }}>Bar Association:</Text> {lawyer.barAssociation}</Text>
          <Text style={{ marginBottom: 8, color: '#555' }}><Text style={{ fontWeight: 'bold' }}>Expertise:</Text> {lawyer.areaOfExpertise?.join(', ')}</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <Pressable
              style={{ 
                backgroundColor: '#1e40af', 
                borderRadius: 6, 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                flex: 1, 
                marginRight: 8, 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4, 
                elevation: 2 
              }} 
              onPress={() => navigation.navigate('Appointment', { lawyerId: lawyer._id })}
            >
              <MaterialIcons name="access-time-filled" size={24} color="#fff" /> 
              <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', marginLeft: 8 }}>Appointment</Text>
            </Pressable>

            <Pressable
              style={{ 
                backgroundColor: 'green', 
                borderRadius: 6, 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                flex: 1, 
                marginLeft: 8, 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center', 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4, 
                elevation: 2 
              }} 
              onPress={() => openWhatsAppChat(lawyer.contact)}
            >
              <Fontisto name="whatsapp" size={24} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center', marginLeft: 8 }}>Consult</Text>
            </Pressable>
          </View>
        </View>
      )})}
    </ScrollView>
  );
};

export default ClientModule;
