import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    size?: number
    children?: React.ReactNode
    ignoreContainer?: boolean
    onPress?: () => void
}
const PlayerController = ({ size = 45, children, ignoreContainer, onPress }: Props) => {
    const styles = StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: ignoreContainer ? 'transparent' : colors.CONTRAST
        }
    })
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {children}
        </Pressable>
    )
}



export default PlayerController 