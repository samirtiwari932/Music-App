import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import { useSelector } from 'react-redux'
import { getPlayerState } from 'src/store/player'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PlayPauseBtn from '@ui/PlayPauseBtn'
import useAudioController from 'src/hooks/useAudioController'
import Loader from '@ui/Loader'
import { load } from 'react-native-track-player/lib/src/trackPlayer'

interface Props { }
const MiniAudioPlayer = (props: Props) => {
    const { onGoingAudio } = useSelector(getPlayerState)
    const { isPlaying, togglePlayPause, isBuffering } = useAudioController()

    const poster = onGoingAudio?.poster
    const source = poster ? { uri: poster } : require('../assets/music.jpg')
    return (

        <View style={styles.container} >
            <Image source={source} style={styles.poster} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{onGoingAudio?.title}</Text>
                <Text style={styles.name}>{onGoingAudio?.owner.name}</Text>
            </View>
            <Pressable style={{ paddingHorizontal: 10 }}>
                <AntDesign name='hearto' size={24} color={colors.CONTRAST} />
            </Pressable>
            {isBuffering ? <Loader /> : <PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} />}

        </View >
    )
}

export const MiniPlayerHeight = 60

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: MiniPlayerHeight,
        backgroundColor: colors.OVERLAY,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    poster: {
        height: MiniPlayerHeight - 10,
        width: MiniPlayerHeight - 10,
        borderRadius: 7
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '700',
        paddingHorizontal: 5
    },
    contentContainer: {
        flex: 1,
        height: '100%',
        padding: 5
    },
    name: {
        color: colors.SECONDARY,
        fontWeight: '700',
        paddingHorizontal: 5
    }
})

export default MiniAudioPlayer 