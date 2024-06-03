import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PulseAnimationContainer from './PulseAnimationContainer'
import colors from 'src/utilis/color'

interface Props {
    items?: number
}
const AudioListLoadingUI = ({ items = 8 }: Props) => {
    const dummyData = new Array(items).fill(0)
    return (
        <PulseAnimationContainer>
            <View>
                {dummyData?.map((_, index) => {
                    return <View key={index} style={styles.dummyListItem} />
                })}
            </View>
        </PulseAnimationContainer>
    )
}

const styles = StyleSheet.create({
    container: {},
    dummyListItem: {
        height: 50,
        width: '100%',
        backgroundColor: colors.INACTIVE_CONTRAST,
        borderRadius: 10,
        marginBottom: 10
    }
})

export default AudioListLoadingUI 