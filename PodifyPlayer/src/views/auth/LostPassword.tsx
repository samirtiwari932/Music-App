import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FC, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import * as yup from "yup";


const forgetPasswordSchema = yup.object({
    email: yup.string().trim("Email is missing!").email("Invalid email !").required("Email  is required!"),

})

interface Props { }

const initialValues = {
    email: '',
};

const LostPassword: FC<Props> = props => {

    return (

        <Form
            onSubmit={values => {
                console.log(values);
            }}
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
                        <AppLink title='Sign In ' />
                        <AppLink title='Sign up' />
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
