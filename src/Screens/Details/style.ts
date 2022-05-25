import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

export function Styles(width: number, height: number) {

  return StyleSheet.create({
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
      marginBottom: 40,
      marginTop: 10
    },
    details__image: {
      alignItems: 'center',
      width: 380,
      height: 270,
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
      marginBottom: 20,
      height: 244
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
    },
  
  })
}