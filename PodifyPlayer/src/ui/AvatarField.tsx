import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import EnrpyoIcon from 'react-native-vector-icons/Entypo'
import colors from 'src/utilis/color'

interface Props {
    source?: string
}

const avatarSize = 70
const AvatarField = ({ source }: Props) => {
    return (
        <View style={styles.container}>
            {source ? <Image source={{ uri: source }} style={styles.avatarImage} /> : <View style={styles.avatarImage}>
                <EnrpyoIcon name='mic' size={30} color={colors.PRIMARY} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    avatarImage: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        backgroundColor: colors.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: colors.CONTRAST
    }
})

export default AvatarField 