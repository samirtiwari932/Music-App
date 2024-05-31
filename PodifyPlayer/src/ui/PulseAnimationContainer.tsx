import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

interface Props {
    children: React.ReactNode;
}
const PulseAnimationContainer = ({ children }: Props) => {
    const oppacitySharedValue = useSharedValue(1);

    const oppacity = useAnimatedStyle(() => {
        return {
            opacity: oppacitySharedValue.value
        }
    })

    useEffect(() => {
        oppacitySharedValue.value = withRepeat(withTiming(0.3, { duration: 1000 }), -1, true)
    }, [])
    return (
        <Animated.View style={oppacity}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default PulseAnimationContainer 