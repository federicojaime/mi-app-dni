import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FinalScanner({ onClose }) {
  
  const handleSimulatedScan = () => {
    // Datos de simulación del DNI
    const simulatedData = {
      tipo: 'DNI',
      nombre: 'Juan Pérez Gómez',
      numero: '12345678A',
      fechaNacimiento: '01/01/1990',
      nacionalidad: 'Española',
      fechaExpedicion: '15/06/2022',
      fechaCaducidad: '15/06/2032'
    };
    
    // Simulamos procesamiento
    setTimeout(() => {
      // Mostrar alerta y volver
      alert('Datos escaneados correctamente');
      onClose();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear DNI</Text>
      </View>
      
      <View style={styles.cameraPlaceholder}>
        <MaterialIcons name="camera-alt" size={64} color="#555" />
        <Text style={styles.placeholderText}>
          Versión de demostración
        </Text>
      </View>
      
      <View style={styles.guideFrame}>
        <View style={styles.cornerTL}></View>
        <View style={styles.cornerTR}></View>
        <View style={styles.cornerBL}></View>
        <View style={styles.cornerBR}></View>
      </View>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Coloca el DNI dentro del marco y presiona el botón para escanear
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.scanButton} 
        onPress={handleSimulatedScan}
      >
        <Text style={styles.scanButtonText}>Escanear Ahora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  placeholderText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
  guideFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 280,
    height: 180,
    marginLeft: -140,
    marginTop: -90,
    backgroundColor: 'transparent',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 20,
  },
  instructionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  scanButton: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});