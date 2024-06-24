import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFetchRecentlyPlayed } from 'src/hooks/query'
import colors from 'src/utilis/color'
import RecentlyPlayedCard from './RecentlyPlayedCard'
import GridView from '@ui/GridView'

interface Props { }
const RecentlyPlayed = (props: Props) => {
    const { data, isLoading } = useFetchRecentlyPlayed()


    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Recently Played
            </Text>
            <GridView data={data || []} renderItem={(item) => (
                <View key={item.id} style={styles.listStyle}>
                    <RecentlyPlayedCard title={item.title}
                        poster={item.poster}
                        onPress={() => { }} />
                </View>
            )} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        color: colors.CONTRAST,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    listStyle: {
        marginBottom: 10
    }
})

export default RecentlyPlayed 