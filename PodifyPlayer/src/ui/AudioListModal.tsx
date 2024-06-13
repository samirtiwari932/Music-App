import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import AppModal from './AppModal'
import { AudioData } from 'src/@types/audio'
import AudioListItem from './AudioListItem'

interface Props {
    data: AudioData[]
    header?: string
    visible: boolean
    onRequestClose: () => void
}
const AudioListModal = ({ header, data, onRequestClose, visible }: Props) => {
    return (
        <AppModal visible={visible} onRequestClose={onRequestClose}>
            <View style={styles.container} >
                <Text style={styles.header}>
                    {header}
                </Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <AudioListItem audio={item} />
                    }
                />
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
        color: colors.CONTRAST,
        paddingVertical: 10
    }
})

export default AudioListModal 