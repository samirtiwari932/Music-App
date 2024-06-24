import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string
    poster?: string
    onPress?(): void
}
const RecentlyPlayedCard = ({ poster, title, onPress }: Props) => {
    const source = poster ? { uri: poster } : require('../assets/music.jpg');
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={source} style={styles.poster} />
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                    {title}
                </Text>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.OVERLAY,
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: "row"
    },
    titleContainer: {
        flex: 1,
        padding: 10,
    },
    poster: {
        //width and height 50 
        width: 50,
        height: 50,
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '600',
    }
})

export default RecentlyPlayedCard 