
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string;
    poster?: string;
}
const AudioCart = ({ title, poster }: Props) => {
    const source = poster ? { uri: poster } : require('../assets/music.jpg')
    return (
        <Pressable
            onPress={() => {
                console.log("on audio press")
            }}
            onLongPress={() => {
                console.log("on audio long press")
            }}
            style={styles.container}>
            <Image source={source} style={styles.poster} />
            <Text

                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.title}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100, marginRight: 15,

    },
    poster: {
        aspectRatio: 1,
        height: 100,
        borderRadius: 7
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: "500",
        fontSize: 15,
        marginTop: 5
    }
})

export default AudioCart 