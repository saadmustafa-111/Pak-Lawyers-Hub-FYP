import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const Secondscreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#f8fafc', '#e0f7fa']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animatable.Image
          source={require('../assets/SaadLogo.png')}
          style={styles.logo}
          animation="zoomIn"
          duration={2000}
        />
        <Animatable.Text
          style={styles.title}
          animation="fadeInDown"
          duration={2000}
        >
          Find the Best Lawyer
        </Animatable.Text>
        <Animatable.View
          style={styles.descriptionContainer}
          animation="fadeIn"
          duration={2000}
          delay={500}
        >
          <Text style={styles.description}>
            Welcome to <Text style={styles.boldText}>Pak Lawyer Hub</Text>, your one-stop solution for finding and hiring the right legal professionals with ease. Whether you're a client seeking legal assistance or a lawyer looking to offer your expertise.
          </Text>
        </Animatable.View>
        <Pressable onPress={() => { navigation.navigate("Home") }} style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Next</Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
          </View>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    height: 120,
    width: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
  buttonContent: {
    backgroundColor: '#2a9df4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
});

export default Secondscreen;
