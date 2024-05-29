import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FC, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AuthStackParamList } from 'src/@types/navigation';
import colors from 'src/utilis/color';
import * as yup from "yup";
import { FormikHelpers } from 'formik';
import axios from 'axios';
import client from 'src/api/client';


const signupSchema = yup.object({
    name: yup.string().trim("Name is missing!").min(3, "Name is too short!").required("Name is required!"),
    email: yup.string().trim("Email is missing!").email("Invalid email !").required("Email  is required!"),
    password: yup.string()
        .trim("password  is missing!")
        .min(8, "password is too short!")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password is too simple!")
        .required("Password is required!")
})

interface Props { }

interface NewUser {
    name: string,
    email: string,
    password: string
}

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const SignUp: FC<Props> = props => {

    const [secureEntry, setSecureEntry] = useState(true)


    const navigation = useNavigation<NavigationProp<AuthStackParamList>>()


    const togglePasswordView = () => {
        setSecureEntry(!secureEntry)
    }
    const handleSubmit = async (values: NewUser, actions: FormikHelpers<NewUser>) => {
        //we want to send these information to our api 
        actions.setSubmitting(true)

        try {
            const { data } = await client.post('/auth/create', { ...values })
            navigation.navigate('Verification', { userInfo: data?.user })
        } catch (error) {
            console.log('Sign up error:', error)
        }
        actions.setSubmitting(false)

    }

    return (

        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={signupSchema}
        >
            <AuthFormContainer heading='Welcome' subHeading="Let's get started by creating your accountS">

                <View style={styles.formContainer}>
                    <AuthInputField
                        name='name'
                        placeholder="John Doe"
                        label="Name"
                        containerStyle={styles.marginBottom}
                    />
                    <AuthInputField
                        name='email'
                        placeholder="john@email.com"
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={styles.marginBottom}

                    />
                    <AuthInputField
                        name='password'
                        placeholder="********"
                        label="Password"
                        autoCapitalize="none"
                        secureTextEntry={secureEntry}
                        containerStyle={styles.marginBottom}
                        rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
                        onRightIconPress={togglePasswordView}
                    />
                    <SubmitBtn title='Sign up' />
                    <View style={styles.linkContainer}>
                        <AppLink title='Forget Password ?'
                            onPress={() => {
                                navigation.navigate("LostPassword")
                            }}
                        />
                        <AppLink title='Sign In' onPress={() => {
                            navigation.navigate("SignIn")
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

export default SignUp;
