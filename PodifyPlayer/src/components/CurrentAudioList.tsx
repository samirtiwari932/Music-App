import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AudioListModal from '@ui/AudioListModal'
import { useSelector } from 'react-redux'
import { getPlayerState } from 'src/store/player'

interface Props {
    visible: boolean
    onRequestClose: () => void
}
const CurrentAudioList = ({ onRequestClose, visible }: Props) => {
    const { onGoingList } = useSelector(getPlayerState)
    return (
        <AudioListModal
            visible={visible}
            onRequestClose={onRequestClose}
            header='Audios on the way'
            data={onGoingList}
        />
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default CurrentAudioList 