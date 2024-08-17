import React from 'react';
import { View, Text, Image } from 'react-native';

import { useSelector } from 'react-redux';

const MyProfile = () => {
    const user = useSelector((state) => state.auth?.user);

    return (
        <View style={{ backgroundColor: '#f0f0f0', borderRadius: 8, padding: 16, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            {user?.profilePic ? (
                <Image source={{ uri: user?.profilePic }} style={{ width: 70, height: 70, borderRadius: 32, alignSelf: 'center', marginBottom: 16 }} />
            ) : (
                <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginBottom: 16 }}>No profile picture uploaded</Text>
            )}
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>My Profile</Text>
            <Text style={{ fontSize: 16, marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {user?.name}</Text>
            <Text style={{ fontSize: 16, marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Email:</Text> {user?.email}</Text>
            <Text style={{ fontSize: 16, marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Contact:</Text> {user?.contact}</Text>
        </View>
    );
}

export default MyProfile;
