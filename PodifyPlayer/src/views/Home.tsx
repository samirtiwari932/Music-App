import PulseAnimationContainer from '@ui/PulseAnimationContainer'
import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useStateFetchLatestAudios } from 'src/hooks/query'
import colors from 'src/utilis/color'

interface Props { }
const Home = (props: Props) => {

    const { data, isLoading } = useStateFetchLatestAudios()

    if (isLoading) {
        return (
            <PulseAnimationContainer>
                <Text style={{ color: 'white', fontSize: 25 }}>Loading ...</Text>
            </PulseAnimationContainer>

        )
    }

    return (
        <View style={styles.container}>
            <Text style={{
                color: colors.CONTRAST,
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 15
            }}>
                Latest uploads
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.map((item) => {
                    return <Pressable
                        onPress={() => {
                            console.log("on audio press")
                        }}
                        onLongPress={() => {
                            console.log("on audio long press")
                        }}
                        style={{ width: 100, marginRight: 15 }}>
                        <Image source={{ uri: item.poster }} style={{ aspectRatio: 1, height: 100, borderRadius: 7 }} />
                        <Text
                            key={item.id}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={{
                                color: colors.CONTRAST,
                                fontWeight: "500",
                                fontSize: 15,
                                marginTop: 5
                            }}>
                            {item.title}
                        </Text>
                    </Pressable>
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,

    }
})

export default Home 