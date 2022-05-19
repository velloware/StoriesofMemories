import { View, Text,StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Home from './Screens/Home/index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Index() {

  function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
  const Stack = createNativeStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  
}