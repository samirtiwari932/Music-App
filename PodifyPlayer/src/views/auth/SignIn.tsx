import AuthFormContainer from '@components/AuthFormContainer';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import { FC, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { AuthStackParamList } from 'src/@types/navigation';
import * as yup from "yup";


const signupSchema = yup.object({
    email: yup.string().trim("Email is missing!").email("Invalid email !").required("Email  is required!"),
    password: yup.string()
        .trim("password  is missing!")
        .min(8, "password is too short!")
        .required('Password is required!')
})

interface Props { }

const initialValues = {

    email: '',
    password: '',
};

const SignIn: FC<Props> = props => {

    const [secureEntry, setSecureEntry] = useState(true)

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

    const togglePasswordView = () => {
        setSecureEntry(!secureEntry)
    }

    return (

        <Form
            onSubmit={values => {
                console.log(values);
            }}
            initialValues={initialValues}
            validationSchema={signupSchema}
        >
            <AuthFormContainer heading='Welcome Back' >

                <View style={styles.formContainer}>

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
                    <SubmitBtn title='Sign In' />
                    <View style={styles.linkContainer}>
                        <AppLink title='Forget Password ?'
                            onPress={() => {
                                navigation.navigate("LostPassword")
                            }}
                        />
                        <AppLink title='Sign up'
                            onPress={() => {
                                navigation.navigate("SignUp")
                            }}
                        />
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

export default SignIn;
