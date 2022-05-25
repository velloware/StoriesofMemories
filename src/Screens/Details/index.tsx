import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StoriesRepositories, IStory } from '../../Database/repositories/StoriesRepositories';
import { INavigator } from '../interfaces/Navigator';
import { LocalStorageRepository } from '../../Database/repositories/LocalStorageRepository';

export default function Details(props: any) {

  const { Description, URLImage, Author, Page, id } = props.route.params;
  const navigator: INavigator = props;
  let LastPageId = 1;

  async function lastPageId() {
    const LastPage  = await LocalStorageRepository.OpenStoryById(id);
    LastPageId = LastPage.LastPageId;
  }

  lastPageId();
  // const { Description, URLImage, Author }: IStory = StoriesRepositories.getStoryById(params);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigator.navigation.navigate("Home") }}
      >
        <Text style={styles.button__back}> {"◄"} Voltar</Text>
      </TouchableOpacity>

      <Image source={{ uri: URLImage }}
        style={styles.details__image} />

      <Text style={styles.details__title}>{Author}</Text>
      <Text style={styles.details__text}>{Description}</Text>
      <TouchableOpacity
        onPress={() => { navigator.navigation.push("Pages", { Description, URLImage, Author, Page, id, LastPageId }) }}
      >
        <Text style={styles.button__write}>Ler Agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#977BC5',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40
  },

  button__back: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#eee',
    position: 'relative',
    left: -150,
    color: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 40
  },
  details__image: {
    alignItems: 'center',
    width: 380,
    height: 300,
    borderRadius: 15,
    marginBottom: 30
  },
  details__title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#eee'
  },
  details__text: {
    padding: 25,
    color: '#eee',
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20
  },
  button__write: {
    color: '#530250',
    fontWeight: 'bold',
    borderColor: '#530250',
    borderWidth: 2,
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 15,
    fontSize: 16
  }

});
