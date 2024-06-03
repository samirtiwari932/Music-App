import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    title: string
}
const EmptyRecords = ({ title }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        color: colors.INACTIVE_CONTRAST,
        fontWeight: 'bold'
    }
})

export default EmptyRecords 