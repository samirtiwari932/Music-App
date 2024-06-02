import LatestUpload from '@components/LatestUpload'
import OptionsModal from '@components/OptionsModal'
import RecommendedAudios from '@components/RecommendedAudios'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons"
import colors from 'src/utilis/color'


interface Props { }
const Home = (props: Props) => {
    const [showOptions, setShowOptions] = useState(false)
    return (
        <View style={styles.container}>
            <LatestUpload onAudioPress={(item) => {
                console.log(item)
            }}
                onAudioLongPress={() => {
                    setShowOptions(true)
                }} />
            <RecommendedAudios onAudioPress={(item) => {
                console.log('audio press', item)
            }}
                onAudioLongPress={() => {
                    setShowOptions(true)
                }} />
            <OptionsModal
                visible={showOptions}
                onRequestClose={() => {
                    setShowOptions(false)
                }}

                options={
                    [{ title: "Add to playlist", icon: "playlist-music" }, { title: "Add to Fav List", icon: 'cards-heart' }]
                }
                renderItem={item => {
                    return (
                        <Pressable
                            style={styles.optionsContainer}>
                            <MaterialComIcons size={24} name={item.icon} color={colors.PRIMARY} />
                            <Text style={styles.optionLabel} >
                                {item.title}
                            </Text>
                        </Pressable>
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionLabel: {
        marginLeft: 5,
        color: colors.PRIMARY,
        fontSize: 18,
    }

})

export default Home 