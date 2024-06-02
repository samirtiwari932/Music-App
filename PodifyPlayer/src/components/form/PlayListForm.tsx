import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import BasicModalContainer from '@ui/BasicModalContainer'
import colors from 'src/utilis/color'
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'


interface PlayListInfo {
    title: string
    private: boolean
}

interface Props {
    visible: boolean
    onRequestClose(): void
    onSubmit(value: PlayListInfo): void
}
const PlayListForm = ({ visible, onSubmit, onRequestClose }: Props) => {
    const [playListInfo, setPlayListInfo] = useState({
        title: "",
        private: false
    })

    const handleSubmit = () => {
        onSubmit(playListInfo)
        handleClose()
    }

    const handleClose = () => {
        setPlayListInfo({
            title: "",
            private: false
        })
        onRequestClose()
    }

    return (
        <BasicModalContainer visible={visible} onRequestClose={handleClose} >
            <View>
                <Text style={styles.title}>Create New PlayList</Text>
                <TextInput onChangeText={(text) => setPlayListInfo({ ...playListInfo, title: text })} placeholder='Title' style={styles.input}
                    value={playListInfo.title}
                />

                <Pressable onPress={() => {
                    setPlayListInfo({ ...playListInfo, private: !playListInfo.private })
                }} style={styles.privateSelector}>
                    {playListInfo.private ?
                        <MaterialComIcon name='radiobox-marked' color={colors.PRIMARY} />
                        : <MaterialComIcon name='radiobox-blank' color={colors.PRIMARY} />
                    }
                    <Text style={styles.privateLabel}>Private</Text>
                </Pressable>
                <Pressable onPress={handleSubmit} style={styles.submitBtn}>
                    <Text>Create</Text>
                </Pressable>
            </View>
        </BasicModalContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: colors.PRIMARY,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        color: colors.PRIMARY
    },
    privateSelector: {
        height: 45,
        flexDirection: "row",
        alignItems: "center"
    },
    privateLabel: {
        marginLeft: 5,
        color: colors.PRIMARY
    },
    submitBtn: {
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 10
    }
})

export default PlayListForm 