import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'
import AppHeaders from '@components/AppHeaders'

interface Props { }
const ProfileSettings = (props: Props) => {
    return (
        <View style={styles.container}>
            <AppHeaders title='Settings' />
            <Text style={{ color: colors.CONTRAST }}>ProfileSettings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default ProfileSettings 