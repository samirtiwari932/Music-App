import AuthInputField from '@components/form/AuthInputField';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import colors from 'src/utilis/color';
import * as yup from "yup"
import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import Form from '@components/form/Index';
import SubmitBtn from '@components/form/SubmitBtn';
import Icon from 'react-native-vector-icons/Entypo';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';


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

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const SignUp: FC<Props> = props => {

    const [secureEntry, setSecureEntry] = useState(true)

    const togglePasswordView = () => {
        setSecureEntry(!secureEntry)
    }

    return (
        <View style={styles.container}>
            <CircleUi size={200} position='top-left' />
            <CircleUi size={100} position='top-right' />
            <CircleUi size={100} position='bottom-left' />
            <CircleUi size={200} position='bottom-right' />

            <Form
                onSubmit={values => {
                    console.log(values);
                }}
                initialValues={initialValues}
                validationSchema={signupSchema}
            >
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
                        <AppLink title='Forget Password ?' />
                        <AppLink title='Sign In' />
                    </View>
                </View>

            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: "100%",
        paddingHorizontal: 15, // padding in the x direction (left and the right)
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
