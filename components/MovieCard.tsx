import * as React from 'react'
import { Image, Text, View } from 'react-native'

export default function MovieCard({ movie }: { movie: {title: string, poster_path: string} }) {
    const imagePosterUrl = 'https://image.tmdb.org/t/p/w154' + movie.poster_path
    console.log(imagePosterUrl)
    return (
        <View>
            <Image source={{
                uri: imagePosterUrl
            }} style={{width: 154, height: 200}}></Image>
            <Text>{ movie.title }</Text>
            <Text>{imagePosterUrl}</Text>
        </View>
    )
}
