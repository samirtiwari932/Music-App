import { View, Text, StyleSheet, Image } from 'react-native'
import React, { ReactNode } from 'react'
import CircleUi from '@ui/CircleUi'
import colors from 'src/utilis/color'

interface Props {
    heading?: string,
    subHeading?: string
    children: ReactNode
}
const AuthFormContainer = ({ children, heading, subHeading }: Props) => {
    return (
        <View style={styles.container}>
            <CircleUi size={200} position='top-left' />
            <CircleUi size={100} position='top-right' />
            <CircleUi size={100} position='bottom-left' />
            <CircleUi size={200} position='bottom-right' />
            <View style={styles.headerContainer}>
                <Image source={require('../assets/one.png')} />
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.subHeading}>{subHeading}</Text>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    heading: {
        color: colors.SECONDARY,
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 5

    },
    subHeading: {
        color: colors.CONTRAST,
        fontSize: 16
    },
    headerContainer: {
        width: "100%",
        marginBottom: 20,
    }
})

export default AuthFormContainer 