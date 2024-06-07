import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '@views/Profile'
import ProfileSettings from '@components/profile/ProfileSettings'
import Verification from '@views/auth/Verification'
import { ProfileNavigatorStackParamList } from 'src/@types/navigation'


interface Props { }
const ProfileNavigator = (props: Props) => {
    const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
            <Stack.Screen name='Verification' component={Verification} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default ProfileNavigator 