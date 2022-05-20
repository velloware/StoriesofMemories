import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StoriesRepositories, IStory } from '../../Database/repositories/StoriesRepositories';
import { INavigator } from '../interfaces/Navigator';

export default function Pages(props: any) {
  const { params } = props.route;
  
  // const [page, setPage] = React.useState(params.lastPage);
  const navigator: INavigator = props;
  const  { Pages }: IStory =  StoriesRepositories.getStoryById(params.Id)[0];
  
  return (
    <View style={styles.container}>
        <TouchableOpacity 
        onPress={() => { navigator.navigation.navigate("Details", params.Id)}}
      >
        <Text>{}</Text>
      </TouchableOpacity>
     <Text>AA</Text>
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
