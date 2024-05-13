import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string
    onPress?(): void
}
const AppLink = ({ title, onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
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