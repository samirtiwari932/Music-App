
import { View, Text, StyleSheet, Pressable, Image, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import PlayAnimation from './PlayAnimation';

interface Props {
    title: string;
    poster?: string;
    playing?: boolean;
    containerStyle?: StyleProp<ViewStyle>
    onPress?: () => void
    onLongPress?: () => void
}
const AudioCart = ({ title, poster, containerStyle, playing = false, onLongPress, onPress }: Props) => {
    const source = poster ? { uri: poster } : require('../assets/music.jpg')
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.container, containerStyle]}>
            <View>

                <Image source={source} style={styles.poster} />
                <PlayAnimation visible={playing} />
            </View>
            <Text

                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.title}>
                {title}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100, marginRight: 15,

    },
    poster: {
        aspectRatio: 1,
        width: "100%",
        borderRadius: 7
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: "500",
        fontSize: 15,
        marginTop: 5
    }
})

export default AudioCart 