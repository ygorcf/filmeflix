import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles'

import { Text, View } from '../../components/Themed';
import MovieCard from '../../components/MovieCard';
import { RootStoreState } from '../../store/reducers';
import { useEffect } from 'react';
import { loadMovies as actionLoadMovies, MovieResponse } from '../../store/reducers/homeMovies';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const moviesByGenre = useSelector((state: RootStoreState) => state.homeMovies.results)
  const loadingMovies = useSelector((state: RootStoreState) => state.homeMovies.loading)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  function loadMovies() {
    dispatch(actionLoadMovies())
  }

  function navigateToMovieDetails(movie: MovieResponse) {
    navigation.navigate('TabHomeMovieDetailsScreen', { movie })
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <View style={styles.container}>
      {loadingMovies ? <Text>Carregando...</Text> :
        <FlatList
          contentContainerStyle={styles.list}
          data={moviesByGenre}
          onEndReached={loadMovies}
          onEndReachedThreshold={0.8}
          style={styles.listContainer}
          renderItem={({ item: genre }) => (
            <View>
              <Text style={styles.genreTitle}>{ genre.name }</Text>
              <FlatList
                contentContainerStyle={styles.list}
                data={genre.movies}
                horizontal={true}
                onEndReached={loadMovies}
                onEndReachedThreshold={0.8}
                style={styles.listContainer}
                renderItem={({ item: movie }) => (
                  <TouchableOpacity onPress={() => navigateToMovieDetails(movie)}>
                    <MovieCard movie={movie} key={`${movie.id}-${genre.id}`}></MovieCard>
                  </TouchableOpacity>
                )}
              ></FlatList>
            </View>
          )}
        ></FlatList>
      }
    </View>
  );
}
