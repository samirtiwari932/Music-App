import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFetchHistories } from 'src/hooks/query'
import { string } from 'yup'
import EmptyRecords from '@ui/EmptyRecords'

interface Props { }
const HistoryTab = (props: Props) => {
    const { data, isLoading } = useFetchHistories()
    if (!data || !data[0]?.audios.length)
        return <EmptyRecords title='There is no history  ' />

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "white" }}>
                History
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default HistoryTab 