import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LabOne from './screens/lab1/LabOne';
import LabTwo from './screens/lab2/LabTwo';
import LabHome from './LabHome';

const LabStack = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom',
            }}
        >
            <Stack.Screen
                name="LabHome"
                component={LabHome}
                options={{ title: 'Labs' }}
            />
            <Stack.Screen
                name="Lab-One"
                component={LabOne}
                options={{ title: 'Lab One' }}
            />
            <Stack.Screen
                name="Lab-Two"
                component={LabTwo}
                options={{ title: 'Lab Two' }}
            />
        </Stack.Navigator>
    );
}

export default LabStack;