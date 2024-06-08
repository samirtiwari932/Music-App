import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colors from 'src/utilis/color'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

interface Props {
    delay: number
    height: number
}
const AnimatedStroke = ({ delay, height }: Props) => {
    const sharedValue = useSharedValue(5)
    const heightStyle = useAnimatedStyle(() => {
        return {
            height: sharedValue.value
        }
    })

    useEffect(() => {
        sharedValue.value = withDelay(delay, withRepeat(withTiming(height), -1, true))
    }, [])
    return (
        <Animated.View style={[styles.stroke, heightStyle]} />
    )
}

const styles = StyleSheet.create({
    stroke: {
        width: 5,
        backgroundColor: colors.CONTRAST,
        marginRight: 5
    }
})


export default AnimatedStroke 