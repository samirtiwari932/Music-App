import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from 'src/utilis/color'

interface Props {
    color?: string
    playing?: boolean
    onPress?: () => void
}
const PlayPauseBtn = ({ color = colors.CONTRAST, playing, onPress }: Props) => {
    return (

        <Pressable onPress={onPress} style={styles.button}>
            {playing ? <AntDesign name='pause' size={24} color={color} /> : <AntDesign name='caretright' size={24} color={color} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

export default PlayPauseBtn 