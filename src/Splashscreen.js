import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Sscreen');
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={['#f8fafc', '#e0f7fa']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Animatable.Text
            style={styles.title}
            animation="fadeInDown"
            duration={1000}
          >
            Pak Lawyers Hub
          </Animatable.Text>
          <Animatable.Image
            source={require('../assets/SaadLogo.png')}
            style={styles.logo}
            animation="zoomIn"
            duration={1000}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 32,
    marginBottom: 16,
  },
  logo: {
    height: 120,
    width: 180,
  },
});

export default Splashscreen;
