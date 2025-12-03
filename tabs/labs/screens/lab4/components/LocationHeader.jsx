import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const LocationHeader = ({ timezone, onRefresh }) => {
    return (
        <View style={styles.locationContainer}>
            <View>
                <Text style={styles.locationText}>📍 Calgary, Alberta</Text>
                <Text style={styles.timezoneText}>🕐 {timezone}</Text>
            </View>
            <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
                <Text style={styles.refreshText}>🔄 Refresh</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LocationHeader;
