import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string
    onPress?(): void
    active?: boolean
}
const AppLink = ({ title, onPress, active = true }: Props) => {
    return (
        <Pressable onPress={active ? onPress : null} style={{ opacity: active ? 1 : 0.4 }}>
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        color: colors.SECONDARY
    }
})

export default AppLink 