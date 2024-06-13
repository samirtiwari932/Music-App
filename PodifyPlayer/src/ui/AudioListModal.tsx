import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import AppModal from './AppModal'

interface Props {
    header?: string
    visible: boolean
    onRequestClose: () => void
}
const AudioListModal = ({ header, onRequestClose, visible }: Props) => {
    return (
        <AppModal visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.container} >
                <Text style={styles.header}>
                    {header}
                </Text>
            </View>
        </AppModal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST
    }
})

export default AudioListModal 