import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AudioListModal from '@ui/AudioListModal'

interface Props {
    visible: boolean
    onRequestClose: () => void
}
const CurrentAudioList = ({ onRequestClose, visible }: Props) => {
    return (
        <AudioListModal visible={visible} onRequestClose={onRequestClose} header='Audios on the way' />
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default CurrentAudioList 