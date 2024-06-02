import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props<T> {
    data: T[] | undefined
    renderItem: (item: T) => JSX.Element
    col?: number
}
const GridView = <T extends any>({ data, renderItem, col = 2 }: Props<T>) => {
    return (
        <View style={styles.container}>
            {data?.map((item, index) => {
                return <View key={index} style={{ width: `${100 / col}%` }}>
                    <View style={{ padding: 5 }}>
                        {renderItem(item)}
                    </View>
                </View>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default GridView 