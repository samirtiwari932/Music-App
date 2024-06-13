import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import { AudioData } from 'src/@types/audio'
import AudioListLoadingUI from './AudioListLoadingUI'
import PlayAnimation from './PlayAnimation'

interface Props {
    audio: AudioData
    onPress?: () => void
    isPlaying?: boolean
}
const AudioListItem = ({ audio, isPlaying = false, onPress }: Props) => {
    const getSource = (poster?: string) => {
        return poster ? { uri: poster } : require('../assets/music.jpg')
    }
    return (
        <Pressable style={styles.listItem}>
            <View>
                <Image source={getSource(audio.poster)} style={styles.poster} />
                <PlayAnimation visible={isPlaying} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{audio.title}</Text>
                <Text style={styles.owner} numberOfLines={1}>{audio.owner.name}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    listItem: {
        flexDirection: "row",
        backgroundColor: colors.OVERLAY,
        marginBottom: 15,
        borderRadius: 5,
        overflow: 'hidden'
    },
    poster: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 7,
    },
    titleContainer: {
        flex: 1,
        padding: 10
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '700'
    },
    owner: {
        color: colors.SECONDARY,
        fontWeight: '500'
    }
})

export default AudioListItem 