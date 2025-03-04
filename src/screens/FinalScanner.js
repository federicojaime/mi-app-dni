import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Scanner from '../components/Scanner';
import { MaterialIcons } from '@expo/vector-icons';

export default function FinalScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Solicitar permisos de cámara directamente
  useEffect(() => {
    (async () => {
      // Solicitar permisos directamente sin usar funciones personalizadas
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      // Si después de 3 segundos seguimos sin permisos, mostrar mensaje
      if (status !== 'granted') {
        setTimeout(() => {
          Alert.alert(
            'Se necesitan permisos',
            'Esta aplicación necesita acceso a la cámara para escanear DNIs',
            [
              { text: 'Cancelar', style: 'cancel', onPress: () => navigation.goBack() },
              { text: 'Solicitar de nuevo', onPress: requestPermissionAgain }
            ]
          );
        }, 1000);
      }
    })();
  }, []);

  const requestPermissionAgain = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleClose = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else if (navigation && navigation.navigate) {
      navigation.navigate('Home');
    }
  };

  const handleScan = async (data) => {
    setIsLoading(true);
    
    // Simular procesamiento del DNI (aquí iría el OCR real)
    setTimeout(() => {
      setIsLoading(false);
      
      // Mostrar datos escaneados en un Alert
      Alert.alert(
        'DNI Escaneado',
        'Se ha escaneado el DNI correctamente.\n\nNombre: Juan Pérez García\nNúmero: 12345678A',
        [{ text: 'Aceptar', onPress: handleClose }]
      );
    }, 1500);
  };

  // Mostrar pantalla de carga mientras verifica permisos (con botón para volver)
  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.text}>Verificando permisos de cámara...</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleClose}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar mensaje si no hay permisos y botón para solicitarlos nuevamente
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <MaterialIcons name="no-photography" size={60} color="#ff6b6b" />
        <Text style={styles.text}>No se pudo acceder a la cámara</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermissionAgain}
        >
          <Text style={styles.permissionButtonText}>Solicitar permiso</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.backButton, {marginTop: 20}]} 
          onPress={handleClose}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar indicador de carga mientras procesa el escaneo
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.text}>Procesando DNI...</Text>
      </View>
    );
  }

  // Mostrar el scanner
  return <Scanner onScan={handleScan} onClose={handleClose} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 30,
  },
  backButtonText: {
    color: 'white',
    marginLeft: 5,
  }
});