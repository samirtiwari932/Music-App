import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useFetchFavorite } from 'src/hooks/query'
import AudioListLoadingUI from '@ui/AudioListLoadingUI'
import EmptyRecords from '@ui/EmptyRecords'
import AudioListItem from '@ui/AudioListItem'

interface Props { }
const FavoriteTab = (props: Props) => {
    const { data, isLoading } = useFetchFavorite()

    if (isLoading) return <AudioListLoadingUI />

    if (!data?.length) return <EmptyRecords title={'There is no  favourite audio!'} />

    return (
        <ScrollView style={styles.container}>
            {data?.map((item) => {
                return (
                    <View key={item.id}>
                        <AudioListItem audio={item} />
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default FavoriteTab 