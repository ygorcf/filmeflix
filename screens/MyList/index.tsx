import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'

import { View } from '../../components/Themed';
import MovieCard from '../../components/MovieCard';
import { MovieResponse } from '../../store/reducers/homeMovies';

export default class MyList extends React.Component<{}, { movies: MovieResponse[] }> {
  navigation:any

  constructor(props: any) {
    super(props)
    this.state = { movies: [] }
    this.navigation = props.navigation
    this.navigation.addListener('focus', () => this.loadMovies())
  }

  async loadMovies() {
      try {
        const movies = JSON.parse((await AsyncStorage.getItem('movies')) ?? '[]') as MovieResponse[]
        this.setState({
          movies
        })
      } catch (e) {
        console.error(e)
      }
  }

  navigateToMovieDetails(movie: MovieResponse) {
    this.navigation.navigate('TabHomeMovieDetailsScreen', { movie })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.movies}
            numColumns={3}
            style={styles.listContainer}
            renderItem={({ item: movie }) => (
              <TouchableOpacity onPress={() => this.navigateToMovieDetails(movie)}>
                <MovieCard movie={movie} key={movie.id.toString()}></MovieCard>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    );
  }
}
