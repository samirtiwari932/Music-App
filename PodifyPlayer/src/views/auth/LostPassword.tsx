import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FormikHelpers } from 'formik';
import { FC, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { AuthStackParamList } from 'src/@types/navigation';
import client from 'src/api/client';
import * as yup from "yup";


const forgetPasswordSchema = yup.object({
    email: yup.string().trim("Email is missing!").email("Invalid email !").required("Email  is required!"),

})

interface Props { }

interface InitialValue {
    email: string
}

const initialValues = {
    email: '',
};

const handleSubmit = async (values: InitialValue, actions: FormikHelpers<InitialValue>) => {
    //we want to send these information to our api 
    actions.setSubmitting(true)
    try {
        const { data } = await client.post('/auth/forget-password', { ...values })


    } catch (error) {
        console.log('Lost Password error :', error)
    }
    actions.setSubmitting(false)

}

const LostPassword: FC<Props> = props => {

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
    return (

        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={forgetPasswordSchema}
        >
            <AuthFormContainer heading='Forget Password!' subHeading='Oops,did you forget your password? ' >

                <View style={styles.formContainer}>

                    <AuthInputField
                        name='email'
                        placeholder="john@email.com"
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={styles.marginBottom}

                    />

                    <SubmitBtn title='Send Link' />
                    <View style={styles.linkContainer}>
                        <AppLink title='Sign In ' onPress={() => {
                            navigation.navigate("SignIn")
                        }} />
                        <AppLink title='Sign up' onPress={() => {
                            navigation.navigate("SignUp")
                        }} />
                    </View>
                </View>

            </AuthFormContainer>
        </Form>
    );
};

const styles = StyleSheet.create({

    formContainer: {
        width: "100%",
    },
    marginBottom: {
        marginBottom: 20,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20
    }
});

export default LostPassword;
