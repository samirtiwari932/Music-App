import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from 'src/utilis/color'
import { useNavigation } from '@react-navigation/native'

interface Props {
    title: string
}
const AppHeaders = ({ title }: Props) => {
    const { navigate, canGoBack, goBack } = useNavigation()

    if (!canGoBack()) return null // if there is no histroy there is no sense to render anything 

    return (
        <View style={styles.container}>
            <Pressable onPress={goBack}>
                <AntDesign name='arrowleft' size={24} color={colors.CONTRAST} />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.PRIMARY,
        height: 45,

    },
    title: {
        color: colors.CONTRAST,
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default AppHeaders 