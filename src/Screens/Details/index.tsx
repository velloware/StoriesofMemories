import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StoriesRepositories, IStory } from '../../Database/repositories/StoriesRepositories';
import { INavigator } from '../interfaces/Navigator';
import { LocalStorageRepository } from '../../Database/repositories/LocalStorageRepository'; 

export default function Details(props: any) {
  
  const { params } = props.route;
  const navigator: INavigator = props;

  const  { Description, URLImage, Author }: IStory =  StoriesRepositories.getStoryById(params)[0];
  return (
    <View style={ styles.container }>
      <TouchableOpacity
        onPress={() => { navigator.navigation.navigate("Home")}}
      >
        <Text style={ styles.button__back }> {"◄"} Voltar</Text>
      </TouchableOpacity>

      <Image source={{uri: URLImage}}
       style={styles.details__image} />

      <Text style={ styles.details__title}>{ Author }</Text>
      <Text style={ styles.details__text }>{ Description }</Text>
      <TouchableOpacity 
        onPress={() => {navigator.navigation.push("Pages", {Id: params,})}}
      >
        <Text style={ styles.button__write }>Ler Agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#977BC5',
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingTop: 60
  },

  button__back: {
    position:  'relative',
    left: -170,
    color: 'white',
    paddingLeft: 10,
    marginBottom: 40
  },
  details__image: {
    alignItems: 'center',
    width: 360, 
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
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 15,
    fontSize: 16

  }

});
