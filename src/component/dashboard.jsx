import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Dashboard = () => {
  const navigation = useNavigation();

  const navigateToCaseScreen = () => {
    navigation.navigate('Case');
  };

  const navigateToAppointmentsScreen = () => {
    navigation.navigate('LawyerAppointment');
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
      
        </View>
        <ScrollView contentContainerStyle={styles.sidebarContent}>
          
          <TouchableOpacity style={styles.sidebarButton} onPress={() => {}}>
            <FontAwesome5 name="user" size={20} color="white" style={styles.icon} />
            <Text style={styles.sidebarButtonText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={navigateToAppointmentsScreen}>
            <FontAwesome5 name="calendar" size={20} color="white" style={styles.icon} />
            <Text style={styles.sidebarButtonText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarButton} onPress={navigateToCaseScreen}>
            <FontAwesome5 name="briefcase" size={20} color="white" style={styles.icon} />
            <Text style={styles.sidebarButtonText}>My Cases</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to the Lawyer Module</Text>
        {/* Additional content can go here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f4f7',
    padding: 10,
  },
  sidebar: {
    width: 150, // Reduced width for sidebar
    backgroundColor: '#000080', // Navy blue color for sidebar
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white', // White text color for logo
  },
  sidebarContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sidebarButton: {
    flexDirection: 'row',
    width: '90%', // Adjusted width for padding
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: 'transparent', // Remove background color
  },
  sidebarButtonText: {
    color: 'white', // White text color for buttons
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});

export default Dashboard;
