import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import { getWeatherIcon, getWindDirection, formatTime } from '../utils/weatherUtils';

const WeatherCard = ({ forecast, initDate, timezone }) => {
    return (
        <View style={styles.weatherCard}>
            <Text style={styles.weatherIcon}>{getWeatherIcon(forecast.weather)}</Text>
            <Text style={styles.weatherDate}>{formatTime(forecast.timepoint, initDate, timezone)}</Text>
            <Text style={styles.weatherTemp}>
                {forecast.temp2m}°C
            </Text>
            <Text style={styles.weatherDescription}>
                {forecast.weather.charAt(0).toUpperCase() + forecast.weather.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <View style={styles.weatherDetails}>
                <Text style={styles.detailText}>💨 {getWindDirection(forecast.wind10m.direction)}</Text>
                <Text style={styles.detailText}>Speed: {forecast.wind10m.speed} km/h</Text>
            </View>
        </View>
    );
};

export default WeatherCard;
