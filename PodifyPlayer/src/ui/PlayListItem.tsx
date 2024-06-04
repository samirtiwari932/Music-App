import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Playlist } from 'src/@types/audio'
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'src/utilis/color'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

interface Props {
    playlist: Playlist
    onPress?(): void
}
const PlayListItem = ({ playlist, onPress }: Props) => {
    const { id, itemsCount, title, visibility } = playlist
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.posterContainer}>
                <MaterialComIcon
                    name='playlist-music'
                    size={30}
                    color={colors.CONTRAST} />
            </View>
            <View style={styles.contentContainer}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon name={visibility === "public" ? "globe" : 'lock'} color={colors.SECONDARY} size={15} />
                    <Text style={styles.count} >{itemsCount} {itemsCount > 1 ? "audios" : "audio"}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: colors.OVERLAY,
        overflow: "hidden",
        marginBottom: 15
    },
    posterContainer: {
        backgroundColor: colors.OVERLAY,
        justifyContent: "center",
        height: 50,
        aspectRatio: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        color: colors.CONTRAST,
        fontWeight: "bold"
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    iconContainer: {
        flexDirection: "row",
        paddingTop: 4
    },
    count: {
        color: colors.SECONDARY,
        fontWeight: "bold",
        fontSize: 12,
        marginLeft: 5
    }
})

export default PlayListItem 