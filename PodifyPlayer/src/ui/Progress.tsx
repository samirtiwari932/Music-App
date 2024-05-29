import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    progress: number
}
const Progress = ({ progress }: Props) => {
    return (
        <>
            <Text style={styles.title}>{`${progress}%`}</Text>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        color: colors.CONTRAST,
        paddingVertical: 2,
        alignSelf: 'flex-end'
    },
    progressBar: {
        height: 10,
        backgroundColor: colors.CONTRAST,
        borderRadius: 5
    }
})
//
export default Progress 