import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import React, { ReactNode } from 'react'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import colors from 'src/utilis/color'
import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from "react-native-document-picker"
import { SupportedPlatforms } from 'react-native-document-picker/lib/typescript/fileTypes'

interface Props {
    icon?: ReactNode;
    btnTitle?: string
    style?: StyleProp<ViewStyle>
    onSelect(file: DocumentPickerResponse): void
    options: DocumentPickerOptions<SupportedPlatforms>
}
const FileSelector = ({ btnTitle, onSelect, icon, options, style }: Props) => {
    const handleDocumentSelect = async () => {
        try {
            const document = await DocumentPicker.pick(options)
            const file = document[0]
            onSelect(file)
            // [{ "fileCopyUri": null, "name": "", "size":, "type": "", "uri": "" }]
        } catch (error) {
            if (!DocumentPicker.isCancel(error)) {
                console.log(error)
            }
        }
    }
    return (
        <Pressable onPress={handleDocumentSelect} style={[styles.btnContainer, style]}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.btnTitle}>
                {btnTitle}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {},
    btnContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainer: {
        height: 70,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center"
    },
    btnTitle: {
        color: colors.CONTRAST,
        marginTop: 5
    }
})

export default FileSelector 