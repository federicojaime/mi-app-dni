import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  StatusBar, 
  SafeAreaView,
  ImageBackground,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const handleScanPress = () => {
    router.push('/scanner');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background-pattern.png')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(240,248,255,0.85)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          
          <View style={styles.header}>
            <Text style={styles.title}>Mi App DNI</Text>
            <View style={styles.headerUnderline} />
          </View>
          
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/tutorial3.png')}
                style={styles.image}
              />
              <View style={styles.imageShadow} />
            </View>
            
            <Text style={styles.description}>
              Bienvenido a Mi App DNI. Esta aplicación te permite escanear 
              documentos de identidad de forma rápida y sencilla.
            </Text>
            
            <View style={styles.featureContainer}>
              <View style={styles.feature}>
                <LinearGradient
                  colors={['#3498db', '#2980b9']}
                  style={styles.iconBackground}
                >
                  <MaterialIcons name="speed" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Rápido</Text>
                <Text style={styles.featureDescription}>
                  Escaneo de documentos en segundos
                </Text>
              </View>
              
              <View style={styles.feature}>
                <LinearGradient
                  colors={['#3498db', '#2980b9']}
                  style={styles.iconBackground}
                >
                  <MaterialIcons name="security" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Seguro</Text>
                <Text style={styles.featureDescription}>
                  Tus datos están protegidos
                </Text>
              </View>
              
              <View style={styles.feature}>
                <LinearGradient
                  colors={['#3498db', '#2980b9']}
                  style={styles.iconBackground}
                >
                  <MaterialIcons name="check-circle" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Fácil</Text>
                <Text style={styles.featureDescription}>
                  Interfaz sencilla e intuitiva
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.footer}>
            <LinearGradient
              colors={['#3498db', '#2980b9']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Button
                title="Escanear DNI"
                onPress={handleScanPress}
                icon={<MaterialIcons name="document-scanner" size={24} color="#fff" />}
                style={styles.scanButton}
              />
            </LinearGradient>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#3498db',
    marginTop: 5,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  imageShadow: {
    position: 'absolute',
    bottom: -10,
    width: 160,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 100,
    transform: [{ scaleX: 0.8 }],
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  buttonGradient: {
    width: '80%',
    borderRadius: 30,
  },
  scanButton: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
});

export default HomeScreen;