import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useFetchRecommendedtAudios } from 'src/hooks/query'
import colors from 'src/utilis/color'
import GridView from '@ui/GridView'
import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import { AudioData } from 'src/@types/audio'

interface Props {
    onAudioPress(item: AudioData, data: AudioData[]): void
    onAudioLongPress(item: AudioData, data: AudioData[]): void
}
const RecommendedAudios = ({ onAudioPress, onAudioLongPress }: Props) => {

    const { data = [], isLoading } = useFetchRecommendedtAudios()


    const getPoster = (poster?: string) => {
        return poster ? { uri: poster } : require('../assets/music.jpg')
    }

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
                        <Pressable onPress={() => {
                            onAudioPress(item, data)
                        }} onLongPress={() => {
                            onAudioLongPress(item, data)
                        }}>
                            <Image source={getPoster(item.poster)} style={styles.poster} />
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={{
                                    color: colors.CONTRAST,
                                    fontWeight: "500",
                                    fontSize: 15,
                                    marginTop: 5
                                }}>
                                {item.title}p
                            </Text>
                        </Pressable>

                    )
                }} />

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