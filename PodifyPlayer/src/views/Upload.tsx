import CategorySelector from '@components/CategorySelector'
import FileSelector from '@components/FileSelector'
import AppButton from '@ui/AppButton'
import Progress from '@ui/Progress'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { DocumentPickerOptions, DocumentPickerResponse, types } from 'react-native-document-picker'
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons"
import client from 'src/api/client'
import { Keys, getFromAsyncStorage } from 'src/utilis/asyncStorage'
import { categories } from 'src/utilis/categories'
import colors from 'src/utilis/color'
import * as yup from 'yup'
interface FormFileds {
    title: string
    category: string;
    about: string;
    file?: DocumentPickerResponse,
    poster?: DocumentPickerResponse
}

const defaultForm: FormFileds = {
    title: "",
    category: "",
    about: "",
}

const audioInfoSchema = yup.object().shape({
    title: yup.string().trim().required('Title is missing'),
    category: yup.string().oneOf(categories, "Category is missing"),
    about: yup.string().trim().required('About  is missing'),
    file: yup.object().shape({
        uri: yup.string().required('Audio File is missing'),
        name: yup.string().required('Audio File is missing'),
        type: yup.string().required('Audio File is missing'),
        size: yup.number().required('Audio File is missing'),
    }),
    poster: yup.object().shape({
        uri: yup.string(),
        name: yup.string(),
        type: yup.string(),
        size: yup.number(),
    }),

})
interface Props { }
const Upload = (props: Props) => {
    const [showCategoryModal, setshowCategoryModal] = useState(false)
    const [audioInfo, setAudioInfo] = useState({ ...defaultForm })

    const handleUpload = async () => {
        try {

            const formData = new FormData()

            const finalData = await audioInfoSchema.validate(audioInfo)

            formData.append('title', finalData.title)
            formData.append('about', finalData.about)
            formData.append('category', finalData.category)
            formData.append('file', {
                name: finalData.file.name,
                type: finalData.file.type,
                uri: finalData.file.uri
            })

            if (finalData.poster.uri) {
                formData.append('poster', {
                    name: finalData.poster.name,
                    type: finalData.poster.type,
                    uri: finalData.poster.uri
                })
            }
            const token = await getFromAsyncStorage(Keys.Auth_Token)

            const { data } = await client.post('/audio/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(data);

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                console.log("Validation error:", error.message)
            }
            else {
                console.log(error)
            }
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.fileSelectorContainer}>
                <FileSelector icon={<MaterialComIcon
                    name='image-outline'
                    size={35}
                    color={colors.SECONDARY}
                />}
                    btnTitle='Select Poster'
                    options={{ type: [types.images] }}
                    onSelect={(poster) => {
                        setAudioInfo({ ...audioInfo, poster })
                    }}
                />
                <FileSelector icon={<MaterialComIcon
                    name='file-music-outline'
                    size={35}
                    color={colors.SECONDARY}
                />}
                    btnTitle='Select Audio'
                    style={{ marginLeft: 20 }}
                    options={{ type: [types.audio] }}
                    onSelect={(file) => {
                        setAudioInfo({ ...audioInfo, file })
                    }}
                />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    placeholderTextColor={colors.INACTIVE_CONTRAST} placeholder='Title'
                    style={styles.input}
                    onChangeText={(text) => {
                        setAudioInfo({ ...audioInfo, title: text })
                    }}
                />

                <Pressable
                    onPress={() => {
                        setshowCategoryModal(true)
                    }}
                    style={styles.CategorySelector}>
                    <Text style={styles.CategorySelectorTitle}>Category</Text>
                    <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
                </Pressable>
                <TextInput
                    placeholderTextColor={colors.INACTIVE_CONTRAST} placeholder='About'
                    style={styles.input}
                    multiline
                    numberOfLines={10}
                    onChangeText={(text) => {
                        setAudioInfo({ ...audioInfo, about: text })
                    }}
                />
                <CategorySelector
                    visible={showCategoryModal}
                    onRequestClose={() => {
                        setshowCategoryModal(false)
                    }}
                    data={categories}
                    title='Category'
                    renderItem={(item) => {
                        return <Text style={styles.category}>{item}</Text>
                    }}
                    onSelect={(item) => {
                        setAudioInfo({ ...audioInfo, category: item })
                    }}
                />

                <View style={{ marginVertical: 20 }} >
                    <Progress progress={50} />
                </View>

                <AppButton borderRadius={7} title='Submit' onPress={handleUpload} />
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

        textAlignVertical: "top"
    },
    category: {
        padding: 10,
        color: colors.PRIMARY
    },
    CategorySelector: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },
    CategorySelectorTitle: {
        color: colors.CONTRAST
    },
    selectedCategory: {
        color: colors.SECONDARY,
        marginLeft: 5,
        fontStyle: 'italic'
    }
})

export default Upload 