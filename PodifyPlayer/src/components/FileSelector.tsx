import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import React, { ReactNode } from 'react'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from 'src/utilis/color'

interface Props {
    icon?: ReactNode;
    btnTitle?: string
    style?: StyleProp<ViewStyle>
}
const FileSelector = ({ btnTitle, icon, style }: Props) => {
    return (
        <Pressable style={[styles.btnContainer, style]}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.btnTitle}>
                {btnTitle}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    btnContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        height: 70,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center"
    },
    btnTitle: {
        color: colors.CONTRAST,
        marginTop: 5
    }
})

export default FileSelector 