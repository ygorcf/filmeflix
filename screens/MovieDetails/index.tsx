import * as React from 'react';
import { Image, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles'

import { Text, View } from '../../components/Themed';
import { MovieResponse } from '../../store/reducers/homeMovies';

export default function MovieDetails() {
  const route = useRoute()
  const navigation = useNavigation()
  const { movie } = route.params as { movie: MovieResponse }
  const imagePosterUrl = 'https://image.tmdb.org/t/p/w342' + movie.poster_path

  async function saveMovieLocally() {
    try {
      const movies = JSON.parse((await AsyncStorage.getItem('movies')) ?? '[]') as MovieResponse[]

      if (!movies.find(m => m.id === movie.id)) {
        movies.push(movie)
      }

      await AsyncStorage.setItem('movies', JSON.stringify(movies))

      navigation.goBack()
      navigation.navigate('TabMyList')
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{
          uri: imagePosterUrl
      }} style={styles.image}></Image>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.originalTitle}>{movie.original_title}</Text>
      <Text style={styles.description}>{movie.overview}</Text>
      <Button title="Adicioanr à Minha lista" onPress={() => saveMovieLocally()}></Button>
    </View>
  );
}
