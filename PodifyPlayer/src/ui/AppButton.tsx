import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import Loader from './Loader'

interface Props {
    title: string
    onPress?(): void
    busy: boolean
}
const AppButton = ({ title, busy, onPress }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            {!busy ? <Text style={styles.title}>
                {title}
            </Text> :

                <Loader />
            }
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