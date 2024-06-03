import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { useFetchUploadsBrProfile } from 'src/hooks/query'
import colors from 'src/utilis/color'

interface Props { }
const UploadTabs = (props: Props) => {
    const { data, isLoading } = useFetchUploadsBrProfile()

    const getSource = (poster?: string) => {
        return poster ? { uri: poster } : require('../../assets/music.jpg')
    }
    return (
        <ScrollView style={styles.container}>
            {data?.map((item) => {
                return (
                    <Pressable key={item.id} style={styles.listItem}>
                        <Image source={getSource(item.poster)} style={styles.poster} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                            <Text style={styles.owner} numberOfLines={1}>{item.owner.name}</Text>
                        </View>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    listItem: {
        flexDirection: "row",
        backgroundColor: colors.OVERLAY,
        marginBottom: 15,
        borderRadius: 5
    },
    poster: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 7,
    },
    titleContainer: {
        flex: 1,
        padding: 10
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '700'
    },
    owner: {
        color: colors.SECONDARY,
        fontWeight: '500'
    }
})

export default UploadTabs 