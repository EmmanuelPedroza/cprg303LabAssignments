export const getWeatherIcon = (weather) => {
    const weatherIcons = {
        clear: '☀️',
        pcloudy: '⛅',
        mcloudy: '☁️',
        cloudy: '☁️',
        humid: '💧',
        lightrain: '🌦️',
        rain: '🌧️',
        snow: '❄️',
        rainsnow: '🌨️',
        ts: '⛈️',
        tsrain: '⛈️',
    };
    return weatherIcons[weather] || '🌤️';
};

export const getWindDirection = (direction) => {
    const directions = {
        N: 'North',
        NE: 'Northeast',
        E: 'East',
        SE: 'Southeast',
        S: 'South',
        SW: 'Southwest',
        W: 'West',
        NW: 'Northwest',
    };
    return directions[direction] || direction;
};

export const formatTime = (timepoint, initDate, timezone) => {
    if (!initDate) {
        // Fallback if initDate is not available yet
        const hours = timepoint * 3;
        const date = new Date();
        date.setHours(date.getHours() + hours);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    // Calculate the forecast time based on init date and timepoint
    const forecastDate = new Date(initDate);
    forecastDate.setHours(forecastDate.getHours() + (timepoint * 3));

    // Format the date and time using the location's timezone
    try {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: timezone,
        };
        return forecastDate.toLocaleString('en-US', options);
    } catch (err) {
        // Fallback if timezone is invalid
        return forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
};

export const parseInitDate = (initStr) => {
    const year = parseInt(initStr.substring(0, 4));
    const month = parseInt(initStr.substring(4, 6)) - 1; // Month is 0-indexed
    const day = parseInt(initStr.substring(6, 8));
    const hour = parseInt(initStr.substring(8, 10));

    return new Date(year, month, day, hour, 0, 0);
};
