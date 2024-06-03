import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props { }
const PlayListTab = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "white" }}>PlayList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default PlayListTab 