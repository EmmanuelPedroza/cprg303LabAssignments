import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LocationToggle = ({ useGPS, onToggle, locationName }) => {
    return (
        <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Location Source:</Text>
            <View style={styles.toggleButtons}>
                <TouchableOpacity
                    style={[styles.toggleButton, !useGPS && styles.toggleButtonActive]}
                    onPress={() => onToggle(false)}
                >
                    <Text style={[styles.toggleText, !useGPS && styles.toggleTextActive]}>
                        📍 Calgary
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, useGPS && styles.toggleButtonActive]}
                    onPress={() => onToggle(true)}
                >
                    <Text style={[styles.toggleText, useGPS && styles.toggleTextActive]}>
                        🛰️ GPS
                    </Text>
                </TouchableOpacity>
            </View>
            {locationName && (
                <Text style={styles.currentLocation}>Current: {locationName}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    toggleButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    toggleButtonActive: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    toggleTextActive: {
        color: '#fff',
    },
    currentLocation: {
        fontSize: 12,
        color: '#666',
        marginTop: 10,
        fontStyle: 'italic',
    },
});

export default LocationToggle;
