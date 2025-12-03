import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const ErrorView = ({ error, onRetry }) => {
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>❌ Error: {error}</Text>
            <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
                <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ErrorView;
