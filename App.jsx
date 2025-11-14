// App.js
import React from 'react';
import { Text, View, Button } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import Tabs from './tabs/Tabs';

// Optional: better perf on Android
enableScreens(true);

const Stack = createNativeStackNavigator();


function DetailsScreen({ route }) {
  const { itemId } = route.params ?? {};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}>Details Screen</Text>
      <Text style={{ marginTop: 8 }}>itemId: {itemId ?? '—'}</Text>
    </View>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff', // Set the background color to white
  },
};
export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#bbbbbbff' }}>
      <NavigationContainer >
        <Tabs />
      </NavigationContainer>
    </View>
  );
}

