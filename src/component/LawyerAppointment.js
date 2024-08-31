import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon

const APPOINTMENT_API_URL = 'http://192.168.198.139:8000/api/appointments';

const LawyerAppointment = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${APPOINTMENT_API_URL}?lawyerId=${user?._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await axios.patch(`${APPOINTMENT_API_URL}/${appointmentId}`, { status: 'Accepted' });
      Alert.alert('Success', 'Appointment accepted successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error accepting appointment:', error);
      Alert.alert('Error', 'Failed to accept appointment. Please try again later.');
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      await axios.patch(`${APPOINTMENT_API_URL}/${appointmentId}`, { status: 'Rejected' });
      Alert.alert('Success', 'Appointment rejected successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      Alert.alert('Error', 'Failed to reject appointment. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      <ScrollView contentContainerStyle={styles.appointmentsContainer}>
        {appointments.map((appointment) => (
          <View key={appointment._id} style={styles.appointmentCard}>
            <Text style={styles.appointmentText}>Client: {appointment.clientName}</Text>
            <Text style={styles.appointmentText}>Date: {new Date(appointment.date).toLocaleDateString()}</Text>
            <Text style={styles.appointmentText}>Status: {appointment.status}</Text>
            <Text style={styles.appointmentText}>Notes: {appointment.notes}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleAcceptAppointment(appointment._id)} style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRejectAppointment(appointment._id)} style={styles.rejectButton}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  appointmentsContainer: {
    flexGrow: 1,
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LawyerAppointment;
