import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFetchUploadsBrProfile } from 'src/hooks/query'
import colors from 'src/utilis/color'
import AudioListItem from '@ui/AudioListItem'
import AudioListLoadingUI from '@ui/AudioListLoadingUI'

interface Props { }
const UploadTabs = (props: Props) => {
    const { data, isLoading } = useFetchUploadsBrProfile()

    if (isLoading) return <AudioListLoadingUI />
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