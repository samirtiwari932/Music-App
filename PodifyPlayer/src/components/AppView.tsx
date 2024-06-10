import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MiniAudioPlayer from './MiniAudioPlayer'

interface Props {
    children: React.ReactNode
}
const AppView = ({ children }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.children}>
                {children}
            </View>
            <MiniAudioPlayer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    children: {
        flex: 1
    }
})

export default AppView 