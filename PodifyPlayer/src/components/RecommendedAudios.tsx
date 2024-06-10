import AudioCart from '@ui/AudioCart'
import GridView from '@ui/GridView'
import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { AudioData } from 'src/@types/audio'
import { useFetchRecommendedtAudios } from 'src/hooks/query'
import { getPlayerState } from 'src/store/player'
import colors from 'src/utilis/color'

interface Props {
    onAudioPress(item: AudioData, data: AudioData[]): void
    onAudioLongPress(item: AudioData, data: AudioData[]): void
}
const RecommendedAudios = ({ onAudioPress, onAudioLongPress }: Props) => {

    const { data = [], isLoading } = useFetchRecommendedtAudios()

    const { onGoingAudio } = useSelector(getPlayerState)



    const dummyData = new Array(6).fill('')

    if (isLoading) {
        return (
            <PulseAnimationContainer>
                <View style={styles.container}>
                    <View style={styles.dummyTitleView} />
                    <GridView
                        col={3}
                        data={dummyData} renderItem={(item) => {
                            return (
                                <View style={styles.dummyAudioView} />
                            )
                        }} />
                </View>
            </PulseAnimationContainer>

        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Latest uploads
            </Text>
            <GridView
                col={3}
                data={data} renderItem={(item) => {
                    return (
                        <AudioCart title={item.title} poster={item.poster} onPress={() => {
                            onAudioPress(item, data)
                        }}
                            onLongPress={() => { onAudioLongPress(item, data) }}
                            containerStyle={{ width: '100%' }}
                            playing={onGoingAudio?.id === item.id}
                        />
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }, title: {
        color: colors.CONTRAST,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    poster: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 7,
    },
    dummyTitleView: {
        width: 200,
        height: 20,
        backgroundColor: colors.INACTIVE_CONTRAST,
        marginBottom: 15,
        borderRadius: 5,
        flexDirection: 'row'
    },
    dummyAudioView: {
        width: '100%', aspectRatio: 1,
        backgroundColor: colors.INACTIVE_CONTRAST,
        borderRadius: 7,
    }

})

export default RecommendedAudios 