import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        alignItems: 'center',
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: '#333232ff',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 15,
        padding: 10
    },
    backText: {
        fontSize: 16,
        color: '#007bff',
        fontWeight: '600',
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    locationText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    timezoneText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    refreshButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    refreshText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#dc3545',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        paddingLeft: 5,
    },
    forecastContainer: {
        paddingBottom: 20,
    },
    weatherCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
    weatherIcon: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 10,
    },
    weatherDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    weatherTemp: {
        fontSize: 32,
        fontWeight: '700',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: 8,
    },
    weatherDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 12,
        textTransform: 'capitalize',
    },
    weatherDetails: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
        marginTop: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
});
