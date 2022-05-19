import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StoriesRepositories, IStory } from '../../Database/repositories/StoriesRepositories'
import { useState, useEffect } from 'react';
import { INavigator } from '../interfaces/Navigator'

export default function Home(props: any) {
  const navigator: INavigator = props;

  // navigator.navigation.push("Details")
  // Para mudar de Screen, utilize esta função abaixo, usando como base o index.tsx
  const [stories, setStories] = useState<IStory[]>([] as IStory[]);

  useEffect(() => {
    (async () => {
      setStories(await StoriesRepositories.getAllStories());
    })()
  }, []);

  const getStoryById = async (id: number) => {
    const story = await StoriesRepositories.getStoryById(id);

    Alert.alert(story[0].Description);
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10}}>Hello to stories</Text>
      {
        stories.map(function (Story: IStory) {
          return (<View  key={Story.id}>
       
            <TouchableOpacity style={styles.button} onPress={() => getStoryById(Story.id)} >
              <Text style={{ fontWeight: '800', textAlign: 'center', color: '#333', fontSize: 18,  }}>
                {Story.Author} 
              </Text>
            </TouchableOpacity>
          </View>
          );
        })
      }
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

  button: {
    marginBottom: 5
  }
});
