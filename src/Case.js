import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createCase, fetchCases, updateCase, deleteCase } from './Api/Auth'; // Ensure the path is correct
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Case = () => {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [cases, setCases] = useState([]);
  const [editingCaseId, setEditingCaseId] = useState(null);
  const [formData, setFormData] = useState({
    caseTitle: '',
    client: '',
    caseDescription: '',
    hearingDate: '',
    caseType: '',
    courtJurisdiction: '',
    caseStatus: '',
    paymentStatus: '',
  });

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Paid', value: 'paid' },
    { label: 'Unpaid', value: 'unpaid' },
  ]);

  const [showForm, setShowForm] = useState(false); // Initially hide the form

  useEffect(() => {
    fetchAllCases();
  }, []);

  const fetchAllCases = async () => {
    try {
      const fetchedCases = await fetchCases();
      setCases(fetchedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      Alert.alert('Error', 'An error occurred while fetching the cases.');
    }
  };

  const saveCase = async () => {
    try {
      const newCase = await createCase(formData);
      setCases([...cases, newCase]);
      setFormData({
        caseTitle: '',
        client: '',
        caseDescription: '',
        hearingDate: '',
        caseType: '',
        courtJurisdiction: '',
        caseStatus: '',
        paymentStatus: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving case:', error);
      Alert.alert('Error', 'An error occurred while saving the case.');
    }
  };

  const handleEdit = (caseItem) => {
    setEditingCaseId(caseItem._id);
    setFormData({
      caseTitle: caseItem.caseTitle,
      client: caseItem.client,
      caseDescription: caseItem.caseDescription,
      hearingDate: caseItem.hearingDate,
      caseType: caseItem.caseType,
      courtJurisdiction: caseItem.courtJurisdiction,
      caseStatus: caseItem.caseStatus,
      paymentStatus: caseItem.paymentStatus,
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingCaseId(null);
    setFormData({
      caseTitle: '',
      client: '',
      caseDescription: '',
      hearingDate: '',
      caseType: '',
      courtJurisdiction: '',
      caseStatus: '',
      paymentStatus: '',
    });
    setShowForm(false);
  };

  const saveEditedCase = async (editedCase) => {
    try {
      await updateCase(editedCase);
      setCases(cases.map(c => (c._id === editedCase._id ? editedCase : c)));
      setEditingCaseId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating case:', error);
      Alert.alert('Error', 'An error occurred while updating the case.');
    }
  };

  const handleDeleteCase = async (caseId) => {
    try {
      await deleteCase(caseId);
      setCases(cases.filter(c => c._id !== caseId));
    } catch (error) {
      Alert.alert('Error', error.response ? error.response.data.error : 'An error occurred while deleting the case.');
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormData({
        caseTitle: '',
        client: '',
        caseDescription: '',
        hearingDate: '',
        caseType: '',
        courtJurisdiction: '',
        caseStatus: '',
        paymentStatus: '',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#F3F4F6' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ marginBottom: 10 }}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {showForm && (
        <View style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 15, marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1E3A8A' }}>Add Your Case information</Text>
          <TextInput
            placeholder="Case Title"
            value={formData.caseTitle}
            onChangeText={(value) => setFormData({ ...formData, caseTitle: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Client Name"
            value={formData.client}
            onChangeText={(value) => setFormData({ ...formData, client: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Case Description"
            value={formData.caseDescription}
            onChangeText={(value) => setFormData({ ...formData, caseDescription: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Hearing Date (YYYY-MM-DD)"
            value={formData.hearingDate}
            onChangeText={(value) => setFormData({ ...formData, hearingDate: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Case Type"
            value={formData.caseType}
            onChangeText={(value) => setFormData({ ...formData, caseType: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Court/Jurisdiction"
            value={formData.courtJurisdiction}
            onChangeText={(value) => setFormData({ ...formData, courtJurisdiction: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <TextInput
            placeholder="Case Status"
            value={formData.caseStatus}
            onChangeText={(value) => setFormData({ ...formData, caseStatus: value })}
            style={{ backgroundColor: '#E5E7EB', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 10, borderRadius: 5 }}
          />
          <DropDownPicker
            open={open}
            value={formData.paymentStatus}
            items={items}
            setOpen={setOpen}
            setValue={(value) => setFormData({ ...formData, paymentStatus: value })}
            setItems={setItems}
            placeholder="Select Payment Status"
            containerStyle={{ width: '100%', marginBottom: 10 }}
            style={{ backgroundColor: '#D1D5DB', borderRadius: 5 }}
            dropDownStyle={{ backgroundColor: '#D1D5DB' }}
          />

          <Pressable onPress={saveCase} style={{ backgroundColor: '#1E40AF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 }}>
            <AntDesign name="save" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Case</Text>
          </Pressable>
        </View>
      )}

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center', color: '#1E3A8A' }}>My Cases</Text>
      <ScrollView style={{ flex: 1 }}>
        {cases.map((caseItem, index) => (
          <View key={index} style={{ backgroundColor: 'white', padding: 20, marginBottom: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E40AF', marginBottom: 5 }}>{caseItem.caseTitle}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Client: {caseItem.client}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Description: {caseItem.caseDescription}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Hearing Date: {caseItem.hearingDate}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Type: {caseItem.caseType}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Court/Jurisdiction: {caseItem.courtJurisdiction}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Status: {caseItem.caseStatus}</Text>
            <Text style={{ fontSize: 14, color: '#374151', marginBottom: 5 }}>Payment Status: {caseItem.paymentStatus}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={() => handleEdit(caseItem)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="edit" size={24} color="blue" />
                <Text style={{ color: 'blue', fontWeight: 'bold', marginLeft: 5 }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCase(caseItem._id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="trash" size={24} color="red" />
                <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 5 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable onPress={toggleFormVisibility} style={{ backgroundColor: '#10B981', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{showForm ? 'Cancel' : 'Add New Case'}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Case;
