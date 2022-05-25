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

  async function switchingPages(pageEvent: any) {
    let auxPage = page;

    if (pageEvent.event === 'next') {
      auxPage = page + 1;
    } else if (pageEvent.event === 'previous') {
      auxPage = page - 1;
    }

    change(auxPage);
  }

  const change = async (auxPage: number) => {
    let PAGE_NOT_EXIST = true;
    const story = await StoriesRepositories.getStoryById(id);

    story.Pages.forEach((Page: IStoryPage) => {
      if (Page.PageId === auxPage) {
        setText(Page.Text);
        PAGE_NOT_EXIST = false;
      }
    });

    if (PAGE_NOT_EXIST) {
      setText(story.Pages[0].Text);
      auxPage = 1;
    }
    setPage(auxPage);

    await LocalStorageRepository.ChangePageStoryId({
      LastPageId: auxPage,
      StoryId: id
    });
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { 
          navigator.navigation.navigate("Details", { Description, URLImage, Author, Page, id }) 
        }}
      >
        <Text style={ styles.page__buttonBack }> &lsaquo; Voltar</Text>
      </TouchableOpacity>

      <Text style={ styles.Page__text }>{text}</Text>

      <View style={ styles.page__viewButton}>
        <TouchableOpacity
          onPress={() => switchingPages({event: 'previous'})}
        >
          {page > 1 &&
            <Text style={ styles.page__button }> &#8592; Voltar Página</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => switchingPages({event: 'next'})}
        >
          <Text style={ styles.page__button }>Avançar Página  &#8594; </Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  page__viewButton:  {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    justifyContent: 'space-between'

  },

  page__buttonBack: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 20
    
  },

  Page__text: {
    padding: 20,
    textAlign: 'justify',
    width: '100%',
    height: 600,
  },

  page__button: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 20
  },
});
