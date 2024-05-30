import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import Notification from 'src/store/notification'
import AppNotification from './AppNotification'

interface Props {
    children: ReactNode
}
const AppContainer = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <AppNotification />
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AppContainer 