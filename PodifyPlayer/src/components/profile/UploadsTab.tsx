import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFetchUploadsBrProfile } from 'src/hooks/query'

interface Props { }
const UploadTabs = (props: Props) => {
    const { data, isLoading } = useFetchUploadsBrProfile()

    console.log(data, isLoading)
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "white" }}>Uploads</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default UploadTabs 