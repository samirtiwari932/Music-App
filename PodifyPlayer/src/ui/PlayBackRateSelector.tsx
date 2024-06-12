import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import colors from 'src/utilis/color';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
    containerStyle?: StyleProp<ViewStyle>
    activeRate?: string,
    onPress?: (rate: number) => void
}
const speedRates = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'];
const selectorSize = 40

const PlayBackRateSelector = ({ containerStyle, activeRate, onPress }: Props) => {

    const width = useSharedValue(0);
    const [showButton, setShowButton] = useState(true);

    const handleonPress = () => {
        setShowButton(false);
        width.value = withTiming(selectorSize * speedRates.length, {
            duration: 70
        })
    }

    const widthStyle = useAnimatedStyle(() => {
        return {
            width: width.value
        }
    })

    return (
        <View style={[styles.container, containerStyle]}>
            {showButton ? <Pressable onPress={handleonPress}>
                <FontAwesome name='person-running' color={colors.CONTRAST} size={24} />
            </Pressable> : null}
            <Animated.View style={[styles.button, widthStyle]}>
                {speedRates.map(item => {
                    return (
                        <Selector
                            key={item}
                            value={item}
                            active={activeRate === item}
                            onPress={() => onPress?.(+item)} />
                    )
                })}
            </Animated.View>
        </View>
    )
}


interface selectorProps {
    value: string
    active?: boolean
    onPress?: () => void
}


export const Selector = ({ value, active, onPress }: selectorProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.selector,
            active && {
                backgroundColor: colors.SECONDARY
            }
            ]}>
            <Text style={styles.selectorText}>{value}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    button: {
        flexDirection: 'row',
        backgroundColor: colors.OVERLAY,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    selector: {
        width: selectorSize,
        height: selectorSize,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectorText: {
        color: colors.CONTRAST
    }
})

export default PlayBackRateSelector 