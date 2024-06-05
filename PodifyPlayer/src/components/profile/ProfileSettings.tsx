import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from 'src/utilis/color'

interface Props { }
const ProfileSettings = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.CONTRAST }}>ProfileSettings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default ProfileSettings 