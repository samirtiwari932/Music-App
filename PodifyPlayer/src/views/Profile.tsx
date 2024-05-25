import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props { }
const Profile = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Profile 