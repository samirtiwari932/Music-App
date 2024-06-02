import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import colors from 'src/utilis/color'

interface Props {
    visible?: boolean
    onRequestClose?(): void
    children: ReactNode
}
const BasicModalContainer = ({ onRequestClose, visible, children }: Props) => {
    return (
        <Modal onRequestClose={onRequestClose} visible={visible} transparent>
            <Pressable onPress={onRequestClose} style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        {children}
                    </View>

                </View>
            </Pressable>
        </Modal>
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
})

export default BasicModalContainer 