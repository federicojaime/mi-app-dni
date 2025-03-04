import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../components/Button';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Mi App DNI</Text>
      </View>
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/tutorial3.png')}
          style={styles.image}
        />
        
        <Text style={styles.description}>
          Bienvenido a Mi App DNI. Esta aplicación te permite escanear 
          documentos de identidad de forma rápida y sencilla.
        </Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.feature}>
            <MaterialIcons name="speed" size={30} color="#3498db" />
            <Text style={styles.featureTitle}>Rápido</Text>
            <Text style={styles.featureDescription}>
              Escaneo de documentos en segundos
            </Text>
          </View>
          
          <View style={styles.feature}>
            <MaterialIcons name="security" size={30} color="#3498db" />
            <Text style={styles.featureTitle}>Seguro</Text>
            <Text style={styles.featureDescription}>
              Tus datos están protegidos
            </Text>
          </View>
          
          <View style={styles.feature}>
            <MaterialIcons name="check-circle" size={30} color="#3498db" />
            <Text style={styles.featureTitle}>Fácil</Text>
            <Text style={styles.featureDescription}>
              Interfaz sencilla e intuitiva
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Escanear DNI"
          onPress={handleScanPress}
          icon={<MaterialIcons name="document-scanner" size={24} color="#fff" />}
          style={styles.scanButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9fafd',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  scanButton: {
    width: '80%',
  },
});

export default HomeScreen;