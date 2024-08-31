import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const API_URL = 'http://192.168.1.10:8000/api/appointments'; // Replace with your backend URL

const AppointmentScreen = ({ route, navigation }) => {
  const { lawyerId } = route.params; // Get lawyerId from navigation params
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSubmit = async () => {
    try {
      const appointmentData = {
        lawyerId,
        date: date.toISOString(),
        time: time.toISOString(),
        notes, // Include notes
        status: 'pending',
      };

      const response = await axios.post(API_URL, appointmentData);
      Alert.alert('Success', 'Appointment request sent successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting appointment request:', error);
      Alert.alert('Error', 'Error submitting appointment request');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f5f5f5' }}>
      <TouchableOpacity onPress={() => navigation.navigate('CModule')} style={{ marginBottom: 16 }}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#333' }}>Schedule Appointment</Text>

      <View style={{ width: '100%', marginBottom: 16 }}>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#555' }}>Select Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ textAlign: 'center', color: '#333' }}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={{ width: '100%', marginBottom: 16 }}>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#555' }}>Select Time:</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ textAlign: 'center', color: '#333' }}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <TextInput
        style={{ width: '100%', height: 100, backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Additional notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#28a745', borderRadius: 8, padding: 12 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Submit Appointment Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentScreen;
