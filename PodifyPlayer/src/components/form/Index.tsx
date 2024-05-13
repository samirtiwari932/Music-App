import { View, Text, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { Formik, FormikHelpers } from 'formik';

interface Props<T> {
    initialValues: any,
    validationSchema: any,
    onSubmit(values: T, formikHelpers: FormikHelpers<T>): void
    children: ReactNode
}
const Form = <T extends object>({ initialValues, onSubmit, children, validationSchema }: Props<T>) => {
    return (

        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >{children}</Formik>
    )
}



export default Form 