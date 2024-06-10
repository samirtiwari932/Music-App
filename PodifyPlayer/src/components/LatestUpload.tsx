import AudioCart from '@ui/AudioCart'
import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { AudioData } from 'src/@types/audio'

import { useFetchLatestAudios } from 'src/hooks/query'
import { getPlayerState } from 'src/store/player'
import colors from 'src/utilis/color'

interface Props {
    onAudioPress(item: AudioData, data: AudioData[]): void
    onAudioLongPress(item: AudioData, data: AudioData[]): void
}

const dummyData = new Array(4).fill("")
const Home = ({ onAudioLongPress, onAudioPress }: Props) => {

    const { data, isLoading } = useFetchLatestAudios()
    const { onGoingAudio } = useSelector(getPlayerState)
    // console.log(onGoingAudio)

    if (isLoading) {
        return (
            <PulseAnimationContainer>
                <View style={styles.container}>
                    <View style={styles.dummyTitleView} />
                    <View style={styles.dummyAudioContainer} >
                        {dummyData.map((_, index) => {
                            return <View key={index} style={styles.dummyAudioView} />
                        })}
                    </View>
                </View>
            </PulseAnimationContainer>

        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Latest uploads
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.map((item) => {
                    return (
                        <AudioCart
                            key={item.id}
                            title={item.title}
                            poster={item.poster}
                            onPress={() => {
                                onAudioPress(item, data)

                            }}
                            onLongPress={() => {
                                onAudioLongPress(item, data)
                            }}
                            playing={onGoingAudio?.id === item.id}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,

    },
    title: {
        color: colors.CONTRAST,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
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
        width: 100,
        height: 100,
        backgroundColor: colors.INACTIVE_CONTRAST,
        marginRight: 15,
        borderRadius: 5,

    },
    dummyAudioContainer: {
        flexDirection: 'row'
    }
})

export default Home 