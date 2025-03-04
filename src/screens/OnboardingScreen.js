import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Componente personalizado para el botón Siguiente
const NextButton = ({ ...props }) => {
  return (
    <LinearGradient
      colors={['#3498db', '#2980b9']}
      style={styles.nextButtonContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View {...props} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
        <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
      </View>
    </LinearGradient>
  );
};

// Componente personalizado para el botón Comenzar
const DoneButton = ({ ...props }) => {
  return (
    <LinearGradient
      colors={['#3498db', '#2980b9']}
      style={styles.doneButtonContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View {...props} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Comenzar</Text>
        <MaterialIcons name="check" size={18} color="#ffffff" />
      </View>
    </LinearGradient>
  );
};

// Componente personalizado para el botón Saltar
const SkipButton = ({ ...props }) => {
  return (
    <View {...props}>
      <Text style={styles.skipButtonText}>Saltar</Text>
    </View>
  );
};

// Componente personalizado para los puntos de paginación
const DotComponent = ({ selected }) => {
  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: selected ? '#3498db' : '#ccc' }
      ]}
    />
  );
};

// Componente para envolver la imagen con efectos visuales
const ImageContainer = ({ children }) => {
  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageShadow} />
      {children}
    </View>
  );
};

const OnboardingScreen = ({ onDone }) => {
  return (
    <LinearGradient
      colors={['#f9fafd', '#e6f2ff', '#d4e6ff']}
      style={styles.gradient}
    >
      <Onboarding
        onDone={onDone}
        onSkip={onDone}
        bottomBarHighlight={false}
        showPagination={true}
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={DoneButton}
        DotComponent={DotComponent}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: 'transparent',
            image: (
              <ImageContainer>
                <Image
                  source={require('../../assets/images/tutorial1.png')}
                  style={styles.image}
                />
              </ImageContainer>
            ),
            title: 'Bienvenido a Mi App DNI',
            subtitle: 'Una aplicación fácil de usar para escanear documentos de identidad',
          },
          {
            backgroundColor: 'transparent',
            image: (
              <ImageContainer>
                <Image
                  source={require('../../assets/images/tutorial2.png')}
                  style={styles.image}
                />
              </ImageContainer>
            ),
            title: 'Escaneo Rápido',
            subtitle: 'Solo apunta tu cámara al DNI y automáticamente reconocerá la información',
          },
          {
            backgroundColor: 'transparent',
            image: (
              <ImageContainer>
                <Image
                  source={require('../../assets/images/tutorial3.png')}
                  style={styles.image}
                />
                <View style={styles.decorationCircle} />
              </ImageContainer>
            ),
            title: '¡Todo Listo!',
            subtitle: 'Estás listo para comenzar a usar la aplicación',
          },
        ]}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  imageShadow: {
    position: 'absolute',
    width: width * 0.5,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    bottom: -10,
    borderRadius: 100,
    transform: [{ scaleX: 0.8 }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  // Botón Siguiente
  nextButtonContainer: {
    borderRadius: 25,
    marginRight: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 5,
  },
  // Botón Saltar
  skipButtonText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 20,
    fontWeight: '500',
  },
  // Botón Comenzar
  doneButtonContainer: {
    borderRadius: 25,
    marginRight: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  // Puntos de paginación
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  // Elemento decorativo
  decorationCircle: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#3498db',
    top: 30,
    right: 30,
  },
});

export default OnboardingScreen;