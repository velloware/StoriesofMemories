import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StoriesRepositories, IStoryPage } from '../../Database/repositories/StoriesRepositories';
import { LocalStorageRepository } from '../../Database/repositories/LocalStorageRepository';
import { INavigator } from '../interfaces/Navigator';

export default function Pages(props: any) {
  const { Description, URLImage, Author, Page, id, LastPageId } = props.route.params;

  const navigator: INavigator = props;
  const [page, setPage] = useState(LastPageId);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {  
      setPage(LastPageId);

      const story = await StoriesRepositories.getStoryById(id);

      story.Pages.forEach((Page: IStoryPage) => {
        
        if (Page.PageId === page) {
          setText(Page.Text);
        }
      });
    })()
  }, []);

  const avancar = async () => {
    setPage(page + 1);

    const story = await StoriesRepositories.getStoryById(id);
    story.Pages.forEach((Page: IStoryPage) => {
      
      if (Page.PageId === page) {
        setText(Page.Text);
      }
    });

    await LocalStorageRepository.ChangePageStoryId({
      LastPageId: page,
      StoryId: id
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigator.navigation.navigate("Details", { Description, URLImage, Author, Page, id }) }}
        style={styles.button}
      >
        <Text>Voltar</Text>
      </TouchableOpacity>
      <Text>{text}</Text>
      <TouchableOpacity
        onPress={() => avancar()}
        style={styles.button}
      >
        <Text>Avançar Pagina</Text>
      </TouchableOpacity>
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
    marginBottom: 50,
    marginTop: 50
  }
});
