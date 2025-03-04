import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../src/screens/OnboardingScreen';
import HomeScreen from '../src/screens/HomeScreen';

export default function AppRoot() {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

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

    // Si es la primera vez que se inicia la app, mostrar el onboarding
    if (isFirstLaunch) {
        return <OnboardingScreen onDone={() => router.replace('/home')} />;
    }

    // Si no es la primera vez, mostrar la pantalla principal
    return <HomeScreen />;
}