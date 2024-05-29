import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
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
        <Modal onRequestClose={onRequestClose} visible={visible} transparent>
            <Pressable onPress={onRequestClose} style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
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
                    </View>
                </View>
            </Pressable>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {},
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.INACTIVE_CONTRAST,
        zIndex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
        zIndex: -1
    },
    modal: {
        width: "90%",
        maxHeight: "50%",
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.CONTRAST
    },
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