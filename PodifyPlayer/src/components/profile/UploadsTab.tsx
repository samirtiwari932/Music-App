import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFetchUploadsByProfile } from 'src/hooks/query'
import colors from 'src/utilis/color'
import AudioListItem from '@ui/AudioListItem'
import AudioListLoadingUI from '@ui/AudioListLoadingUI'
import EmptyRecords from '@ui/EmptyRecords'

interface Props { }
const UploadTabs = (props: Props) => {
    const { data, isLoading } = useFetchUploadsByProfile()

    if (isLoading) return <AudioListLoadingUI />

    if (!data?.length) return <EmptyRecords title={'There is no audio!'} />

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
    container: {},

})

export default UploadTabs 