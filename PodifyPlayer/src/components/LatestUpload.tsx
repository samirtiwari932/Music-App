import AudioCart from '@ui/AudioCart'
import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { useStateFetchLatestAudios } from 'src/hooks/query'
import colors from 'src/utilis/color'

interface Props { }
const Home = (props: Props) => {

    const { data, isLoading } = useStateFetchLatestAudios()

    if (isLoading) {
        return (
            <PulseAnimationContainer>
                <Text style={{ color: 'white', fontSize: 25 }}>Loading ...</Text>
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
                        <AudioCart key={item.id} title={item.title} poster={item.poster} />
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
    }
})

export default Home 