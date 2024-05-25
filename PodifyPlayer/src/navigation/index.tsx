import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { getAuthState } from 'src/store/auth'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

interface Props { }
const AppNavigator = (props: Props) => {
    const { loggedIn } = useSelector(getAuthState)
    return (
        <NavigationContainer>
            {loggedIn ? <TabNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default AppNavigator 