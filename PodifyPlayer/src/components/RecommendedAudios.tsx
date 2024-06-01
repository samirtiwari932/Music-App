import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useFetchRecommendedtAudios } from 'src/hooks/query'
import colors from 'src/utilis/color'
import GridView from '@ui/GridView'

interface Props { }
const RecommendedAudios = (props: Props) => {

    const { data, isLoading } = useFetchRecommendedtAudios()



    const getPoster = (poster?: string) => {
        return poster ? { uri: poster } : require('../assets/music.jpg')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Latest uploads
            </Text>
            <GridView
                col={3}
                data={data || []} renderItem={(item) => {
                    return (
                        <Pressable>
                            <Image source={getPoster(item.poster)} style={styles.poster} />
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={{
                                    color: colors.CONTRAST,
                                    fontWeight: "500",
                                    fontSize: 15,
                                    marginTop: 5
                                }}>
                                {item.title}p
                            </Text>
                        </Pressable>

                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }, title: {
        color: colors.CONTRAST,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    poster: { width: '100%', aspectRatio: 1, borderRadius: 7 }
})

export default RecommendedAudios 