import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import AppModal from '@ui/AppModal'
import useAudioController from 'src/hooks/useAudioController'
import { useSelector } from 'react-redux'
import { getPlayerState } from 'src/store/player'
import colors from 'src/utilis/color'
import AppLink from '@ui/AppLink'
import { useProgress } from 'react-native-track-player'
import formatDuration from 'format-duration'
import Slider from '@react-native-community/slider'
import { seekTo } from 'react-native-track-player/lib/src/trackPlayer'

interface Props {
    visible: boolean,
    onRequestClose: () => void
}

const formattedDuration = (duration = 0) => {
    return formatDuration(duration, {
        leading: true,
    })
}
const AudioPlayer = ({ visible, onRequestClose }: Props) => {
    const { onGoingAudio } = useSelector(getPlayerState)

    const { seekTo } = useAudioController()

    const poster = onGoingAudio?.poster

    const source = poster ? { uri: poster } : require('../assets/music.jpg')

    const { duration, position } = useProgress()

    const updateSeek = async (value: number) => {
        await seekTo(value)
    }

    return (
        <AppModal animation visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.container}>
                <Image source={source} style={styles.poster} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{onGoingAudio?.title}</Text>
                    <AppLink title={onGoingAudio?.owner.name || ""} onPress={() => { }} />

                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>{formattedDuration(position * 1000)}</Text>
                        <Text style={styles.duration}>{formattedDuration(duration * 1000)}</Text>
                    </View>
                    <Slider
                        minimumValue={0}
                        maximumValue={duration}
                        minimumTrackTintColor={colors.CONTRAST}
                        maximumTrackTintColor={colors.INACTIVE_CONTRAST}
                        value={position}
                        onSlidingComplete={updateSeek}
                    />
                    <View>

                    </View>
                </View>
            </View>
        </AppModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        // justifyContent: 'center'
    },
    poster: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.CONTRAST
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    duration: {
        color: colors.CONTRAST
    }
})

export default AudioPlayer 