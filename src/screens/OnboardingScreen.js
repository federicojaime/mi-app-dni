import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ onDone }) => {
  return (
    <Onboarding
      onDone={onDone}
      onSkip={onDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/images/tutorial1.png')}
              style={styles.image}
            />
          ),
          title: 'Bienvenido a Mi App DNI',
          subtitle: 'Una aplicación fácil de usar para escanear documentos de identidad',
        },
        {
          backgroundColor: '#f9fafd',
          image: (
            <Image
              source={require('../../assets/images/tutorial2.png')}
              style={styles.image}
            />
          ),
          title: 'Escaneo Rápido',
          subtitle: 'Solo apunta tu cámara al DNI y automáticamente reconocerá la información',
        },
        {
          backgroundColor: '#e9f0ff',
          image: (
            <Image
              source={require('../../assets/images/tutorial3.png')}
              style={styles.image}
            />
          ),
          title: '¡Todo Listo!',
          subtitle: 'Estás listo para comenzar a usar la aplicación',
        },
      ]}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      bottomBarHighlight={false}
      nextLabel={<Text style={styles.nextButton}>Siguiente</Text>}
      skipLabel={<Text style={styles.skipButton}>Saltar</Text>}
      doneLabel={<Text style={styles.doneButton}>Comenzar</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  imageContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  nextButton: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  skipButton: {
    fontSize: 16,
    color: '#95a5a6',
  },
  doneButton: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default OnboardingScreen;