import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BasicModalContainer from '@ui/BasicModalContainer'

interface Props<T> {
    visible: boolean;
    onRequestClose: () => void;
    options: T[],
    renderItem: (item: T) => JSX.Element
}
const OptionsModal = <T extends any>({ onRequestClose, options, visible, renderItem }: Props<T>) => {
    return (
        <BasicModalContainer visible={visible} onRequestClose={onRequestClose} >
            {options.map((item, index) => {
                return (
                    <View key={index}>
                        {renderItem(item)}
                    </View>
                )
            })}
        </BasicModalContainer>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default OptionsModal 