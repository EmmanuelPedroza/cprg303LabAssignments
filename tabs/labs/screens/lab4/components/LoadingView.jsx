import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/styles';

const LoadingView = () => {
    return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
    );
};

export default LoadingView;
