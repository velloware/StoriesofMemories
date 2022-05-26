import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { StoriesRepositories, IStory } from '../../Database/repositories/StoriesRepositories'
import { useState, useEffect } from 'react';
import { INavigator } from '../interfaces/Navigator';

export default function Home(props: any) {
  const navigator: INavigator = props;
  const [stories, setStories] = useState<IStory[]>([] as IStory[]);

  useEffect(() => {
    (async () => {
      setStories(await StoriesRepositories.getAllStories());
    })()
  }, []);

  const getStoryById = async (id: number) => {
    const story = await StoriesRepositories.getStoryById(id);
    Alert.alert(story.Description);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title__projeto}>PROJETO</Text>
        <Text style={styles.title__relatos}>RELATOS DE </Text>
        <Text style={styles.title__memorias}>MEMÓRIAS</Text>
      </View>
      {
        stories.map(function (Story: IStory) {

          return (<View key={Story.id}>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigator.navigation.push("Details", Story)}
            >
              <Image source={{ uri: Story.URLImage }}
                style={styles.button__image} />
              <Text style={styles.button__text}>
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
    backgroundColor: '#977BC5',
    alignItems: 'center',
    paddingTop: 100,
    justifyContent: 'flex-start',
  },
  title: {
    alignItems: 'center',
    marginBottom: 50
  },
  title__projeto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eee'
  },
  title__relatos: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#530250',
    marginTop: -10
  },
  title__memorias: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: -10,
    color: '#eee'
  },
  button: {
    width: 350,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    fontSize: 10,
    backgroundColor: '#B49FD5',
    borderRadius: 15
  },
  button__image: {
    width: 55,
    height: 55,
    borderRadius: 15,
    marginRight: 10
  },
  button__text: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#eee',
    fontSize: 14
  }
});
