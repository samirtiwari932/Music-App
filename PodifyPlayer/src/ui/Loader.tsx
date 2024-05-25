import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from 'src/utilis/color'

interface Props {
    color?: string
}
const Loader = ({ color = colors.CONTRAST }: Props) => {

    const initialRotation = useSharedValue(0)

    const transform = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${initialRotation.value}deg` }]
        }
    })

    useEffect(() => {
        initialRotation.value = withRepeat(withTiming(360), -1)
    })
    return (
        <Animated.View style={transform}>
            <AntDesign name='loading1' color={color} size={24} />
        </Animated.View>
    )
}



export default Loader 