import { Image, Text, View, TouchableOpacity } from 'react-native';
import { INavigator } from '../interfaces/Navigator';
import { LocalStorageRepository } from '../../Database/repositories/LocalStorageRepository';
import { Styles } from './style'
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

export default function Details(props: any) {

  const styles = Styles(0,0)

  const { Description, URLImage, Author, Page, id } = props.route.params;
  const navigator: INavigator = props;
  let LastPageId = 1;

  async function lastPageId() {
    const LastPage  = await LocalStorageRepository.OpenStoryById(id);
    LastPageId = LastPage.LastPageId;
  }

  lastPageId();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigator.navigation.navigate("Home") }}
      >
        <Text style={styles.button__back}> &lsaquo;  Voltar</Text>
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

