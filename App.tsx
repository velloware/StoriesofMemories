import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Index from './src/Index'

export default function App() {

  return (
    <View style={styles.container}>
      <Index/>
      <StatusBar style="auto"  />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
  