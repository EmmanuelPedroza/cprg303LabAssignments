import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from '../styles/styles';
import WeatherCard from './WeatherCard';

const WeatherList = ({ weatherData, initDate, timezone }) => {
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Weather Forecast</Text>
            <View style={styles.forecastContainer}>
                {weatherData.dataseries && weatherData.dataseries.slice(0, 8).map((forecast, index) => (
                    <WeatherCard
                        key={index}
                        forecast={forecast}
                        initDate={initDate}
                        timezone={timezone}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default WeatherList;
