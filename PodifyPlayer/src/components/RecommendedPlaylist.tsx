import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFetchRecommendedPlaylist } from 'src/hooks/query'

interface Props { }
const RecommendedPlaylist = (props: Props) => {
    const { data, isLoading } = useFetchRecommendedPlaylist()
    console.log(data)
    // const {} = useFetchRecommendedPlaylist()
    return (
        <View style={styles.container}>
            {/* //map data and show title  */}
            { }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default RecommendedPlaylist 