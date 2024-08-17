// MyProfile.js

import React from 'react';
import { View, Text, Image } from 'react-native';

const LawyerProfile = ({ route }) => {
  const { profileData } = route.params; // Get profileData from route params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {profileData.profilePic && <Image source={{ uri: profileData.profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
      <Text>Name: {profileData.name}</Text>
      <Text>Email: {profileData.email}</Text>
      <Text>Contact: {profileData.contact}</Text>
      <Text>Address: {profileData.address}</Text>
      <Text>Years of Experience: {profileData.experience}</Text>
      <Text>CNIC Number: {profileData.cnic}</Text>
      <Text>Bar Council/Association: {profileData.barAssociation}</Text>
      <Text>Area of Expertise: {profileData.areaOfExpertise.join(', ')}</Text>
    </View>
  );
};

export default LawyerProfile;
