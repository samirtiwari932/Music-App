import FileSelector from '@components/FileSelector'
import AppButton from '@ui/AppButton'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from 'src/utilis/color'

interface Props { }
const Upload = (props: Props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.fileSelectorContainer}>
                <FileSelector icon={<MaterialComIcon
                    name='image-outline'
                    size={35}
                    color={colors.SECONDARY}
                />}
                    btnTitle='Select Poster'
                />
                <FileSelector icon={<MaterialComIcon
                    name='file-music-outline'
                    size={35}
                    color={colors.SECONDARY}
                />}
                    btnTitle='Select Audio'
                    style={{ marginLeft: 20 }}
                />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    placeholderTextColor={colors.INACTIVE_CONTRAST} placeholder='Title'
                    style={styles.input} />
                <TextInput
                    placeholderTextColor={colors.INACTIVE_CONTRAST} placeholder='About'
                    style={styles.input}
                    multiline
                    numberOfLines={10} />

                <AppButton borderRadius={7} title='Submit' />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    fileSelectorContainer: {
        flexDirection: 'row'
    },
    formContainer: {
        marginTop: 20
    },
    input: {
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        borderRadius: 7,
        padding: 10,
        fontSize: 18,
        color: colors.CONTRAST,
        marginBottom: 20,
        textAlignVertical: "top"


    }
})

export default Upload 