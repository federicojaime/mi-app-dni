import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Platform 
} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const BORDER_WIDTH = 2;
const SCANNER_HEIGHT = 200;
const SCANNER_WIDTH = 300;

const Scanner = ({ onScan, onClose }) => {
  const [flash, setFlash] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: true,
        });
        
        // En una aplicación real, aquí procesarías la imagen para extraer
        // la información del DNI usando OCR u otro método
        onScan({ uri: photo.uri });
      } catch (error) {
        console.error('Error al tomar la foto:', error);
      }
    }
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={
          flash
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
        ratio="16:9"
      >
        <View style={styles.overlay}>
          {/* Área superior oscurecida */}
          <View style={styles.darkArea} />
          
          {/* Área central con el recuadro */}
          <View style={styles.scanArea}>
            <View style={styles.darkSide} />
            <View style={styles.frameBorder}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </View>
            <View style={styles.darkSide} />
          </View>
          
          {/* Área inferior oscurecida */}
          <View style={styles.darkAreaBottom}>
            <Text style={styles.instructions}>
              Centra el DNI dentro del recuadro
            </Text>
          </View>
        </View>
        
        {/* Barra de acciones */}
        <View style={styles.actionsBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onClose}
          >
            <MaterialIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={takePicture}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={toggleFlash}
          >
            <MaterialIcons 
              name={flash ? "flash-on" : "flash-off"} 
              size={30} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  darkArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scanArea: {
    flexDirection: 'row',
    height: SCANNER_HEIGHT,
  },
  darkSide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  frameBorder: {
    width: SCANNER_WIDTH,
    height: SCANNER_HEIGHT,
    borderColor: 'transparent',
    position: 'relative',
  },
  darkAreaBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  instructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: '#ffffff',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderColor: '#ffffff',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: '#ffffff',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderColor: '#ffffff',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});

export default Scanner;