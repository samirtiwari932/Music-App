import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string
    onPress?(): void
}
const AppButton = ({ title, onPress }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 45,
        backgroundColor: colors.SECONDARY,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    title: {
        color: colors.CONTRAST,
        fontSize: 18
    }
})

export default AppButton 