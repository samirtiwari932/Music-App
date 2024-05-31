import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStateFetchLatestAudios } from 'src/hooks/query'

interface Props { }
const Home = (props: Props) => {

    const { data, isLoading } = useStateFetchLatestAudios()

    // if (isLoading) {
    return (
        <PulseAnimationContainer>
            <Text style={{ color: 'white', fontSize: 25 }}>Loading ...</Text>
        </PulseAnimationContainer>

    )
    // }

    return (
        <View style={styles.container}>
            {data?.map((item) => {
                return <Text style={{ color: 'white', paddingVertical: 10 }}>{item.title}</Text>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Home 