import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Componentes y utilidades
import Scanner from '../components/Scanner';
import Button from '../components/Button';
import { requestCameraPermission } from '../utils/permissions';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Verificar permisos de cámara al cargar la pantalla
    const checkPermissions = async () => {
      const granted = await requestCameraPermission();
      setHasPermission(granted);
    };

    checkPermissions();
  }, []);

  const handleScan = (data) => {
    setScannedData(data);
    setScanning(false);
    setProcessing(true);

    // Simular procesamiento del DNI
    setTimeout(() => {
      setProcessing(false);
      setShowResultModal(true);
    }, 2000);
  };

  const handleRetry = () => {
    setScannedData(null);
    setScanning(true);
    setShowResultModal(false);
  };

  const handleDone = () => {
    // En una app real, aquí guardarías los datos o realizarías 
    // alguna acción con la información del DNI
    Alert.alert('Éxito', 'Datos del DNI guardados correctamente');
    navigation.navigate('Home');
  };

  const handleClose = () => {
    navigation.goBack();
  };

  // Renderizar resultado del escaneo
  const renderScanResult = () => {
    // En una app real, aquí mostrarías los datos extraídos del DNI
    // Por ejemplo: nombre, número, fecha de nacimiento, etc.
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultHeader}>
          <MaterialIcons name="verified" size={40} color="#2ecc71" />
          <Text style={styles.resultTitle}>DNI Escaneado</Text>
        </View>

        <ScrollView style={styles.resultContent}>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Tipo:</Text>
            <Text style={styles.resultValue}>DNI</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Nombre:</Text>
            <Text style={styles.resultValue}>Juan Pérez Gómez</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Número:</Text>
            <Text style={styles.resultValue}>12345678A</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Fecha de nacimiento:</Text>
            <Text style={styles.resultValue}>01/01/1990</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Nacionalidad:</Text>
            <Text style={styles.resultValue}>Española</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Fecha de expedición:</Text>
            <Text style={styles.resultValue}>15/06/2022</Text>
          </View>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Fecha de caducidad:</Text>
            <Text style={styles.resultValue}>15/06/2032</Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.statusText}>Verificando permisos de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centeredContainer}>
        <MaterialIcons name="no-photography" size={60} color="#e74c3c" />
        <Text style={styles.statusText}>
          No se ha concedido acceso a la cámara
        </Text>
        <Button
          title="Volver"
          onPress={handleClose}
          style={styles.backButton}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {scanning ? (
        <Scanner onScan={handleScan} onClose={handleClose} />
      ) : (
        <View style={styles.processingContainer}>
          {processing ? (
            <>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.processingText}>
                Procesando documento...
              </Text>
            </>
          ) : (
            <>
              <MaterialIcons name="check-circle" size={80} color="#2ecc71" />
              <Text style={styles.successText}>
                ¡DNI escaneado correctamente!
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Ver resultados"
                  onPress={() => setShowResultModal(true)}
                  style={styles.actionButton}
                />
                <Button
                  title="Escanear de nuevo"
                  onPress={handleRetry}
                  style={[styles.actionButton, styles.retryButton]}
                  textStyle={styles.retryButtonText}
                />
              </View>
            </>
          )}
        </View>
      )}

      {/* Modal de resultados */}
      <Modal
        visible={showResultModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowResultModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Resultado del escaneo</Text>
              <TouchableOpacity
                onPress={() => setShowResultModal(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            {renderScanResult()}

            <View style={styles.modalFooter}>
              <Button
                title="Confirmar"
                onPress={handleDone}
                style={styles.confirmButton}
              />
              <Button
                title="Escanear de nuevo"
                onPress={handleRetry}
                style={styles.retryButton}
                textStyle={styles.retryButtonText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    width: 200,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  processingText: {
    fontSize: 18,
    color: '#34495e',
    marginTop: 20,
    textAlign: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    marginVertical: 10,
  },
  retryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  retryButtonText: {
    color: '#3498db',
  },
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    padding: 20,
  },
  confirmButton: {
    marginBottom: 10,
  },
  // Estilos para el resultado
  resultContainer: {
    padding: 20,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  resultContent: {
    maxHeight: 300,
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  resultLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#7f8c8d',
    fontSize: 14,
  },
  resultValue: {
    flex: 2,
    color: '#2c3e50',
    fontSize: 16,
  },
});

export default ScannerScreen;