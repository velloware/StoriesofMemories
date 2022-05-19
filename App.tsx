import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StoriesRepositories } from './src/Database/StoriesRepositories'
import { useState } from 'react';

console.log(StoriesRepositories.getAllStories());
console.log(StoriesRepositories.getStoryById(1));

export default function App() {

  const [stories, setStories] = useState(StoriesRepositories.getAllStories());

  const getStoryById = async (id: any) => {
    const story = await StoriesRepositories.getStoryById(id);
    console.log(story);

    Alert.alert(story[0].Description);
  }

  return (
    <View style={styles.container}>
      <Text>Hello to stories</Text>
      {
        stories.map(function (Story) {
          return (<View style={styles.container}>

            <Text style={{ fontWeight: 'normal', backgroundColor: 'black', color: 'white', fontSize: 16 }}>{Story.Author}</Text>


            <TouchableOpacity onPress={() => getStoryById(Story.id)} >
              <Text style={{ fontWeight: '800', textAlign: 'center', color: 'white', fontSize: 18 }}>Abrir Historia</Text>
            </TouchableOpacity>


          </View>
          );
        })
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
