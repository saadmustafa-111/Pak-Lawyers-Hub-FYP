// ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';

const SIGNALING_SERVER_URL = 'http://192.168.79.139:8000'; // Replace with your signaling server address

const ChatScreen = ({ route }) => {
  const { lawyerId, lawyerName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io(SIGNALING_SERVER_URL);

  useEffect(() => {
    // Join the consultation room
    socket.emit('joinRoom', `consultation_${lawyerId}`);

    // Listen for incoming messages
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', { room: `consultation_${lawyerId}`, message });
      setMessages((prevMessages) => [...prevMessages, { user: 'client', text: message }]);
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: item.user === 'client' ? '#DCF8C6' : '#FFFFFF', alignSelf: item.user === 'client' ? 'flex-end' : 'flex-start', borderRadius: 10, margin: 5 }}>
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
          </View>
        )}
        style={{ padding: 10 }}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginRight: 10, paddingHorizontal: 10 }}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
