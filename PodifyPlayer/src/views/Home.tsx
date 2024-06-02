import LatestUpload from '@components/LatestUpload'
import RecommendedAudios from '@components/RecommendedAudios'
import React from 'react'
import { StyleSheet, View } from 'react-native'


interface Props { }
const Home = (props: Props) => {
    return (
        <View style={styles.container}>
            <LatestUpload onAudioPress={(item) => {
                console.log(item)
            }}
                onAudioLongPress={() => {
                    console.log('long press')
                }} />
            <RecommendedAudios onAudioPress={(item) => {
                console.log('audio press', item)
            }}
                onAudioLongPress={() => {
                    console.log('long press')
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,

    }
})

export default Home 