import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props { }
const Home = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Home 