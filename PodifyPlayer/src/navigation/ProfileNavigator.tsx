import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '@views/Profile'
import ProfileSettings from '@components/profile/ProfileSettings'


interface Props { }
const ProfileNavigator = (props: Props) => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default ProfileNavigator 