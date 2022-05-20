import { View, Text,StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Home from './Screens/Home/index';
import DetailsScreen from './Screens/Details/index';
import Pages from './Screens/Pages/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Index() {
  const Stack = createNativeStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="Details" component={ DetailsScreen } />
        <Stack.Screen name="Pages" component={ Pages } />
        </Stack.Navigator>
      </NavigationContainer>
    )
  
}