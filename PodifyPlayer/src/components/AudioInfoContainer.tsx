import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from 'src/utilis/color'
import AppLink from '@ui/AppLink'
import { useSelector } from 'react-redux'
import { getPlayerState } from 'src/store/player'

interface Props {
    visible: boolean
    closeHandler(state: boolean): void
}
const AudioInfoContainer = ({ closeHandler, visible }: Props) => {
    const { onGoingAudio } = useSelector(getPlayerState)
    if (!visible) return null;

    const handleClose = () => {
        closeHandler(!visible)
    }

    // JSX
    return (
        <View style={styles.container}>
            <Pressable style={styles.closeBtn} onPress={handleClose}>
                <AntDesign name='close' size={24} color={colors.CONTRAST} />
            </Pressable>
            <ScrollView>
                <View>
                    <Text style={styles.title}>{onGoingAudio?.title}</Text>
                    <View style={styles.ownerInfo}>
                        <Text style={styles.title}>Creator:</Text>
                        <AppLink title={onGoingAudio?.owner.name || ""} />
                    </View>
                    <Text style={styles.about}>{onGoingAudio?.about}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST,
        paddingVertical: 5
    },
    about: {
        fontSize: 16,
        color: colors.CONTRAST,
        paddingVertical: 5
    },
    closeBtn: {
        alignSelf: 'flex-end',
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },

    ownerInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default AudioInfoContainer 