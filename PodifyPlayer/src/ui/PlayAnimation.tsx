import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colors from 'src/utilis/color'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import AnimatedStroke from './AnimatedStroke'

interface Props {
    visible: boolean
}

const PlayAnimation = ({ visible }: Props) => {
    if (!visible) return null
    return (
        <View style={styles.container}>
            <View style={styles.strokeContainer}>
                <AnimatedStroke delay={0} height={15} />
                <AnimatedStroke delay={100} height={20} />
                <AnimatedStroke delay={150} height={15} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.OVERLAY
    },
    strokeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 20
    },

})
export default PlayAnimation 