import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, ScrollView, ImageBackground, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MyProfile from './component/MyProfile';
const API_URL = 'http://192.168.1.10:8000/api/lawyers'; // Replace with your backend API URL
const APPOINTMENT_API_URL = 'http://192.168.1.10:8000/api/appointments'; // Appointment API URL
const LawyerModule = ({ route }) => {
  const user = useSelector((state) => state.auth?.user);
  const [currentTab, setCurrentTab] = useState('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [profilePic, setProfilePic] = useState(null); // Store profile picture as local state
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [cnic, setCnic] = useState('');
  const [barAssociation, setBarAssociation] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState([]);
  const [profileSaved, setProfileSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State variable to control MyProfile visibility
  const [appointments, setAppointments] = useState([]); // State variable to store appointments
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const { name, email, contact, profilePic } = user;
      setName(name);
      setEmail(email);
      setContact(contact);
      setProfilePic(profilePic);
    }
  }, [user]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const saveProfile = async () => {
    try {
      const profileData = {
        name,
        email,
        contact,
        profilePic,
        address,
        experience,
        cnic,
        barAssociation,
        areaOfExpertise,
      };

      const response = await axios.post(`${API_URL}`, profileData);
      setProfileSaved(true);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Dashboard', { profileData: response.data }); // Navigate to Dashboard with profile data
      }, 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when component mounts
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${APPOINTMENT_API_URL}?lawyerId=${user?._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const viewProfile = () => {
    setShowProfile(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Conditional rendering of MyProfile component */}
      {showProfile && <MyProfile />}

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }} style={{ backgroundColor: '#f0f0f0' }}>
        <View style={{ width: '100%' }}>
          {/* Display welcome message or profile completion form based on currentTab */}
          {currentTab === 'welcome' && (
            <ImageBackground
              source={require('../assets/law.jpg')}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}
            >
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: 20, borderRadius: 10, marginTop: 100 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>Welcome, {name}!</Text>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>Complete your profile to showcase your expertise.</Text>
                <Pressable onPress={() => handleTabChange('profile')} style={{ backgroundColor: '#1E90FF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginTop: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Complete Profile</Text>
                </Pressable>
              </View>
            </ImageBackground>
          )}

          {currentTab === 'profile' && (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }} style={{ backgroundColor: '#f0f0f0' }}>
              <View style={{ width: '100%', backgroundColor: '#ffffff', borderRadius: 8, padding: 20, borderColor: '#e0e0e0', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                {/* Display basic info */}
                {profilePic && <Image source={{ uri: profilePic }} style={{ width: 100, height: 100, borderColor: '#1E90FF', borderRadius: 30, alignSelf: 'center', marginBottom: 20 }} />}
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: {name}</Text>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: {email}</Text>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Contact: {contact}</Text>

                {/* Profile completion form */}
                <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                  style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 15 }}
                />
                <TextInput
                  placeholder="Years of Experience"
                  value={experience}
                  onChangeText={setExperience}
                  style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 15 }}
                />
                <TextInput
                  placeholder="CNIC Number"
                  value={cnic}
                  onChangeText={setCnic}
                  style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 15 }}
                />
                <TextInput
                  placeholder="Bar Council/Association"
                  value={barAssociation}
                  onChangeText={setBarAssociation}
                  style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 15 }}
                />
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Area of Expertise</Text>
                <MultiSelect
                  items={[
                    { id: 'criminal', name: 'Criminal Law' },
                    { id: 'family', name: 'Family Law' },
                    { id: 'corporate', name: 'Corporate Law' },
                    { id: 'civil', name: 'Civil Law' },
                  ]}
                  uniqueKey="id"
                  onSelectedItemsChange={setAreaOfExpertise}
                  selectedItems={areaOfExpertise}
                  selectText="Pick Areas"
                  searchInputPlaceholderText="Search Areas..."
                  tagRemoveIconColor="#1E90FF"
                  tagBorderColor="#1E90FF"
                  tagTextColor="#1E90FF"
                  selectedItemTextColor="#1E90FF"
                  selectedItemIconColor="#1E90FF"
                  itemTextColor="#1E90FF"
                  displayKey="name"
                  searchInputStyle={{ color: '#1E90FF' }}
                  submitButtonColor="#1E90FF"
                  submitButtonText="Submit"
                />
                <Pressable onPress={saveProfile} style={{ backgroundColor: '#1E90FF', paddingVertical: 12, borderRadius: 8, marginTop: 20 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Save Profile</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Modal for profile saved confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Profile Saved!</Text>
            <Pressable onPress={() => setShowProfile(true)} style={{ backgroundColor: '#1E90FF', padding: 10, borderRadius: 8, marginTop: 20 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>View Profile</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LawyerModule;
