import * as React from 'react'
import { Image, View } from 'react-native'

import styles from './styles'

export default function MovieCard({ movie }: { movie: {title: string, poster_path: string} }) {
    const imagePosterUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
    return (
        <View style={styles.cardContainer}>
            <Image source={{
                uri: imagePosterUrl
            }} style={styles.image}></Image>
        </View>
    )
}
