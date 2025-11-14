import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LabLists from "./labs/LabStack";
import ProfileScreen from "./profile/Profile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LabStack from "./labs/LabStack";

const HomeTabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Labs"
            screenOptions={({ route }) => ({
                headerShown: false, // Hide tab-level headers since stack has headers
                tabBarActiveTintColor: '#1e88e5',
                animation: "shift",
                tabBarIcon: ({ color, size }) => {
                // Map route names to icon names
                const iconMap = {
                    Labs: 'clipboard-list-outline',
                    Profile: 'account-outline',
                };
                const iconName = iconMap[route.name] || 'circle-outline';
                return <Icon name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Labs" component={LabStack} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default HomeTabs;