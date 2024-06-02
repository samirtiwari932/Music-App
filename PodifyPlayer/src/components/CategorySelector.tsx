import BasicModalContainer from '@ui/BasicModalContainer'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from 'src/utilis/color'


interface Props<T> {
    data: T[]
    title?: string
    visible?: boolean
    renderItem(item: T): JSX.Element
    onSelect(item: T, index: number): void
    onRequestClose?(): void
}
const CategorySelector = <T extends Object>({ visible = false, data, title, renderItem, onSelect, onRequestClose }: Props<T>) => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)


    const handleSelect = (item: T, index: number) => {
        setSelectedIndex(index)
        onSelect(item, index)
        onRequestClose && onRequestClose()
    }

    return (
        <BasicModalContainer visible={visible} onRequestClose={onRequestClose} >
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
                {data?.map((item, index) => {
                    return <Pressable
                        onPress={() => handleSelect(item, index)}
                        key={index} style={styles.selectorContainer}>
                        {selectedIndex === index ? <MaterialComIcon name='radiobox-marked' color={colors.SECONDARY} /> : <MaterialComIcon name='radiobox-blank' color={colors.SECONDARY} />
                        }
                        {renderItem(item)}
                    </Pressable>
                })}

            </ScrollView>
        </BasicModalContainer>
    )
}

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.PRIMARY,
        paddingVertical: 10,
    },
    selectorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})

export default CategorySelector 