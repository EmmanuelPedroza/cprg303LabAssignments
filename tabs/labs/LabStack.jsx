import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LabOne from './screens/lab1/LabOne';
import LabTwo from './screens/lab2/LabTwo';
import LabThree from './screens/lab3/LabThree';
import LabFour from './screens/lab4/LabFour';
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
            <Stack.Screen
                name="Lab-Three"
                component={LabThree}
                options={{ title: 'Lab Three' }}
            />
            <Stack.Screen
                name="Lab-Four"
                component={LabFour}
                options={{ title: 'Lab Four' }}
            />
        </Stack.Navigator>
    );
}

export default LabStack;