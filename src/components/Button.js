import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';

const Button = ({
    title,
    onPress,
    style,
    textStyle,
    isLoading = false,
    disabled = false,
    icon = null
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                style,
                disabled && styles.buttonDisabled
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
        >
            <View style={styles.contentContainer}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <>
                        {icon && <View style={styles.iconContainer}>{icon}</View>}
                        <Text style={[styles.text, textStyle]}>{title}</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
        elevation: 0,
        shadowOpacity: 0,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        marginRight: 10,
    }
});

export default Button;