import { Alert, Linking, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

/**
 * Solicita permisos para usar la cámara
 * @returns {Promise<boolean>} - True si los permisos fueron concedidos
 */
export const requestCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert(
      'Permiso requerido',
      'Necesitamos permisos para usar la cámara. Por favor, habilita el acceso a la cámara en la configuración de tu dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ir a Configuración', 
          onPress: () => Linking.openSettings() 
        }
      ]
    );
    return false;
  }
  
  return true;
};

/**
 * Solicita permisos para acceder a la galería
 * @returns {Promise<boolean>} - True si los permisos fueron concedidos
 */
export const requestMediaLibraryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert(
      'Permiso requerido',
      'Necesitamos permisos para acceder a tus fotos. Por favor, habilita el acceso a la galería en la configuración de tu dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ir a Configuración', 
          onPress: () => Linking.openSettings() 
        }
      ]
    );
    return false;
  }
  
  return true;
};

/**
 * Verifica si se tienen los permisos de cámara
 * @returns {Promise<boolean>} - True si ya se tienen los permisos
 */
export const checkCameraPermission = async () => {
  const { status } = await Camera.getCameraPermissionsAsync();
  return status === 'granted';
};

/**
 * Verifica si se tienen los permisos de la galería
 * @returns {Promise<boolean>} - True si ya se tienen los permisos
 */
export const checkMediaLibraryPermission = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  return status === 'granted';
};