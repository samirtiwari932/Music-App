import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import AppButton from '@ui/AppButton'

interface Props {
    title: string
}
const SubmitBtn = (props: Props) => {

    const { handleSubmit } = useFormikContext()

    const handleOnPress = () => {
        handleSubmit();
    }

    return (
        <AppButton onPress={handleOnPress} title={props.title} />
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default SubmitBtn 