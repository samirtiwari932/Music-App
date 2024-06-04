import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useFetchPlayList } from 'src/hooks/query'
import PlayListItem from '@ui/PlayListItem'

interface Props { }
const PlayListTab = (props: Props) => {
    const { data, isLoading } = useFetchPlayList()
    return (
        <ScrollView style={styles.container}>
            {data?.map((playlist) => {
                return <PlayListItem key={playlist.id} playlist={playlist} />
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default PlayListTab 