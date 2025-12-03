import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { styles } from './styles/styles';
import { parseInitDate } from './utils/weatherUtils';
import LocationHeader from './components/LocationHeader';
import LocationToggle from './components/LocationToggle';
import LoadingView from './components/LoadingView';
import ErrorView from './components/ErrorView';
import WeatherList from './components/WeatherList';

const LabFour = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timezone, setTimezone] = useState('America/Edmonton');
    const [initDate, setInitDate] = useState(null);
    const [useGPS, setUseGPS] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({
        lat: 51.0447,
        lon: -114.0719,
        name: 'Calgary, Alberta'
    });

    // Calgary coordinates (default)
    const CALGARY_LAT = 51.0447;
    const CALGARY_LON = -114.0719;

    useEffect(() => {
        if (useGPS) {
            requestLocationPermission();
        } else {
            // Use Calgary default
            setCurrentLocation({
                lat: CALGARY_LAT,
                lon: CALGARY_LON,
                name: 'Calgary, Alberta'
            });
            fetchTimezone(CALGARY_LAT, CALGARY_LON);
            fetchWeatherData(CALGARY_LAT, CALGARY_LON);
        }
    }, [useGPS]);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'This app needs access to your location to show weather for your area.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                } else {
                    Alert.alert(
                        'Permission Denied',
                        'Location permission is required to use GPS. Switching to Calgary default.',
                        [{ text: 'OK', onPress: () => setUseGPS(false) }]
                    );
                }
            } catch (err) {
                console.warn(err);
                setUseGPS(false);
            }
        } else {
            // iOS - permissions are handled in Info.plist
            getCurrentLocation();
        }
    };

    const getCurrentLocation = () => {
        setLoading(true);

        // First try with low accuracy (faster)
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('GPS Location:', latitude, longitude);

                setCurrentLocation({
                    lat: latitude,
                    lon: longitude,
                    name: `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`
                });

                fetchTimezone(latitude, longitude);
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                console.error('GPS Error:', error.message, 'Code:', error.code);

                // If low accuracy fails, try one more time with even more relaxed settings
                if (error.code === 3) { // TIMEOUT
                    console.log('Retrying with maximum timeout...');
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log('GPS Location (retry):', latitude, longitude);

                            setCurrentLocation({
                                lat: latitude,
                                lon: longitude,
                                name: `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`
                            });

                            fetchTimezone(latitude, longitude);
                            fetchWeatherData(latitude, longitude);
                        },
                        (retryError) => {
                            console.error('GPS Retry Error:', retryError.message);
                            setLoading(false);
                            Alert.alert(
                                'GPS Unavailable',
                                'Could not get your location. Make sure GPS is enabled on your device. Switching to Calgary default.',
                                [{ text: 'OK', onPress: () => setUseGPS(false) }]
                            );
                        },
                        {
                            enableHighAccuracy: false,
                            timeout: 30000,
                            maximumAge: 60000
                        }
                    );
                } else {
                    setLoading(false);
                    Alert.alert(
                        'GPS Error',
                        `Could not get your location (Error: ${error.message}). Switching to Calgary default.`,
                        [{ text: 'OK', onPress: () => setUseGPS(false) }]
                    );
                }
            },
            {
                enableHighAccuracy: false, // Use network/wifi location (faster)
                timeout: 10000,
                maximumAge: 30000
            }
        );
    };

    const handleToggleLocation = (gpsEnabled) => {
        setUseGPS(gpsEnabled);
    };

    const fetchTimezone = async (lat, lon) => {
        try {
            const url = `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`;
            console.log('Fetching timezone from:', url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.timeZone) {
                setTimezone(data.timeZone);
                console.log('Timezone set to:', data.timeZone);
            }
        } catch (err) {
            console.log('Failed to fetch timezone, using default:', err);
            setTimezone('America/Edmonton');
        }
    };

    const fetchWeatherData = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);

            // 7timer.info API endpoint for civil weather forecast
            const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            setWeatherData(data);

            // Store the init date from the API response (format: YYYYMMDDHH)
            if (data.init) {
                const initDateTime = parseInitDate(data.init.toString());
                setInitDate(initDateTime);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        if (useGPS) {
            getCurrentLocation();
        } else {
            fetchWeatherData(CALGARY_LAT, CALGARY_LON);
        }
    };

    return (
        <View style={styles.safe}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>&lt; Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Lab Four</Text>
                </View>

                <LocationToggle
                    useGPS={useGPS}
                    onToggle={handleToggleLocation}
                    locationName={currentLocation.name}
                />

                <LocationHeader timezone={timezone} onRefresh={handleRefresh} />

                {loading && <LoadingView />}

                {error && <ErrorView error={error} onRetry={handleRefresh} />}

                {!loading && !error && weatherData && (
                    <WeatherList weatherData={weatherData} initDate={initDate} timezone={timezone} />
                )}
            </View>
        </View>
    );
};

export default LabFour;
