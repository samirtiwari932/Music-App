import { View, Text, StyleSheet, FlexStyle } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props {
    size: number,
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}
const CircleUi = ({ size, position }: Props) => {
    let viewPosition: FlexStyle = {}

    switch (position) {
        case 'top-left':
            viewPosition = { top: -size / 2, left: -size / 2 }
            break;
        case 'top-right':
            viewPosition = { top: -size / 2, right: -size / 2 }
            break;
        case 'bottom-right':
            viewPosition = { bottom: -size / 2, right: -size / 2 }
            break;
        case 'bottom-left':
            viewPosition = { bottom: -size / 2, left: -size / 2 }
            break;
    }
    return (
        <View style={{
            width: size,
            height: size,
            position: "absolute",
            ...viewPosition
        }}>
            <View style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: colors.SECONDARY,
                opacity: 0.3,
                position: "absolute",

            }}>
                <View style={{
                    width: size / 1.5,
                    height: size / 1.5,
                    borderRadius: size / 2,
                    backgroundColor: colors.SUCCESS,
                    opacity: 1,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -size / 3 }, {
                        translateY: -size / 3
                    }]
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default CircleUi 