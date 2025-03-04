import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importar pantallas
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        // Comprobar si es la primera vez que se inicia la app
        const checkIfFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (hasLaunched === null) {
                    // Primera vez que se inicia la app
                    await AsyncStorage.setItem('hasLaunched', 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            } catch (error) {
                console.log(error);
                setIsFirstLaunch(false);
            }
        };

        checkIfFirstLaunch();
    }, []);

    // Mostrar una pantalla de carga mientras se comprueba
    if (isFirstLaunch === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isFirstLaunch ? (
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                ) : null}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Scanner" component={ScannerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;